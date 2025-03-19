import {
	ImageContentPart,
	TextContentPart,
	ThreadMessageLike,
	ToolCallContentPart,
	useExternalMessageConverter,
} from "@assistant-ui/react";
import { AIMessage, BaseMessage, ToolMessage } from "@langchain/core/messages";

// Not exposed by `@assistant-ui/react` package, but is
// the required return type for this callback function.
type Message =
	| ThreadMessageLike
	| {
			role: "tool";
			toolCallId: string;
			toolName?: string | undefined;
			result: any;
	  };

export const getMessageType = (message: Record<string, any>): string => {
	if ("getType" in message && typeof message.getType === "function") {
		return message.getType();
	} else if ("_getType" in message && typeof message._getType === "function") {
		return message._getType();
	} else if ("type" in message) {
		return message.type as string;
	} else {
		throw new Error("Unsupported message type");
	}
};

export const convertLangchainMessages: useExternalMessageConverter.Callback<
	BaseMessage
> = (message): Message | Message[] => {
	// Filter out empty AI messages with only tool calls
	// if (isEmptyAIMessageWithToolCalls(message)) {
	// 	console.log("Filtering out empty AI message with tool calls:", message.id);
	// 	return []; // Return empty array to filter out this message
	// }

	// Handle array content (multimodal messages)
	if (Array.isArray(message?.content)) {
		const contentParts: (TextContentPart | ImageContentPart)[] =
			message.content.map((part) => {
				if (typeof part === "string") {
					return {
						type: "text" as const,
						text: part,
					};
				}

				if (part.type === "text") {
					return {
						type: "text" as const,
						text: part.text,
					};
				}

				// Handle image_url type from LLM responses
				if (part.type === "image_url") {
					// Format specifically for Assistant UI's expected structure
					return {
						type: "image_url" as const, // Use image_url instead of image
						image_url: {
							url: part.image_url.url,
						},
					} as unknown as ImageContentPart; // Cast to satisfy TypeScript
				}

				// Default fallback
				console.warn("Unsupported content part type:", part.type);
				return {
					type: "text" as const,
					text: JSON.stringify(part),
				};
			});

		switch (getMessageType(message)) {
			case "system":
				return {
					role: "system",
					id: message.id,
					content: contentParts,
				};
			case "human":
				return {
					role: "user",
					id: message.id,
					content: contentParts,
				};
			case "ai":
				const aiMsg = message as AIMessage;
				const toolCallsContent: ToolCallContentPart[] = aiMsg.tool_calls?.length
					? aiMsg.tool_calls.map((tc) => ({
							type: "tool-call" as const,
							toolCallId: tc.id ?? "",
							toolName: tc.name,
							args: tc.args,
							argsText: JSON.stringify(tc.args),
					  }))
					: [];
				return {
					role: "assistant",
					id: message.id,
					content: [...toolCallsContent, ...contentParts],
				};
			case "tool":
				return {
					role: "tool",
					toolName: message.name,
					toolCallId: (message as ToolMessage).tool_call_id,
					result: message.content,
				};
			default:
				throw new Error(`Unsupported message type: ${getMessageType(message)}`);
		}
	}

	// Handle string content (legacy format)
	if (typeof message?.content === "string") {
		switch (getMessageType(message)) {
			case "system":
				return {
					role: "system",
					id: message.id,
					content: [{ type: "text" as const, text: message.content }],
				};
			case "human":
				return {
					role: "user",
					id: message.id,
					content: [{ type: "text" as const, text: message.content }],
				};
			case "ai":
				const aiMsg = message as AIMessage;
				const toolCallsContent: ToolCallContentPart[] = aiMsg.tool_calls?.length
					? aiMsg.tool_calls.map((tc) => ({
							type: "tool-call" as const,
							toolCallId: tc.id ?? "",
							toolName: tc.name,
							args: tc.args,
							argsText: JSON.stringify(tc.args),
					  }))
					: [];
				return {
					role: "assistant",
					id: message.id,
					content: [
						...toolCallsContent,
						{
							type: "text" as const,
							text: message.content,
						},
					],
				};
			case "tool":
				return {
					role: "tool",
					toolName: message.name,
					toolCallId: (message as ToolMessage).tool_call_id,
					result: message.content,
				};
			default:
				throw new Error(`Unsupported message type: ${getMessageType(message)}`);
		}
	}

	// If we reach here, the content format is not supported
	throw new Error(
		`Unsupported message content format: ${typeof message?.content}`
	);
};

export function convertToOpenAIFormat(message: BaseMessage) {
	// Handle array content (multimodal messages)
	if (Array.isArray(message.content)) {
		const content = message.content.map((item) => {
			if (typeof item === "string") {
				return { type: "text", text: item };
			}

			if (item.type === "text") {
				return { type: "text", text: item.text };
			}

			if (item.type === "image_url") {
				// Ensure we're using the exact format expected by OpenAI
				return {
					type: "image_url",
					image_url: {
						url: item.image_url.url,
					},
				};
			}

			console.warn(
				`Unsupported content item type in convertToOpenAIFormat: ${item.type}`
			);
			return { type: "text", text: JSON.stringify(item) };
		});

		switch (getMessageType(message)) {
			case "system":
				return {
					role: "system",
					content,
				};
			case "human":
				return {
					role: "user",
					content,
				};
			case "ai":
				return {
					role: "assistant",
					content,
					metadata: (message as AIMessage).additional_kwargs?.metadata || {},
				};
			case "tool":
				return {
					role: "tool",
					toolName: message.name,
					result: content,
				};
			default:
				throw new Error(`Unsupported message type: ${getMessageType(message)}`);
		}
	}

	// Handle string content (legacy format)
	if (typeof message.content === "string") {
		switch (getMessageType(message)) {
			case "system":
				return {
					role: "system",
					content: message.content,
				};
			case "human":
				return {
					role: "user",
					content: message.content,
				};
			case "ai":
				return {
					role: "assistant",
					content: message.content,
					metadata: (message as AIMessage).additional_kwargs?.metadata || {},
				};
			case "tool":
				return {
					role: "tool",
					toolName: message.name,
					result: message.content,
				};
			default:
				throw new Error(`Unsupported message type: ${getMessageType(message)}`);
		}
	}

	// If we reach here, the content format is not supported
	throw new Error(
		`Unsupported message content format: ${typeof message.content}`
	);
}
