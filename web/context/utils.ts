import {
	AIMessage,
	BaseMessage,
	BaseMessageChunk,
} from "@langchain/core/messages";

export const replaceOrInsertMessageChunk = (
	prevMessages: BaseMessage[],
	newMessageChunk: BaseMessageChunk
): BaseMessage[] => {
	const existingMessageIndex = prevMessages.findIndex(
		(msg) => msg.id === newMessageChunk.id
	);

	if (existingMessageIndex !== -1) {
		// Create a new array with the updated message
		return [
			...prevMessages.slice(0, existingMessageIndex),
			new AIMessage({
				...prevMessages[existingMessageIndex],
				content: mergeContent(
					prevMessages[existingMessageIndex].content,
					newMessageChunk.content
				),
			}),
			...prevMessages.slice(existingMessageIndex + 1),
		];
	} else {
		const newMessage = new AIMessage({
			...newMessageChunk,
		});
		return [...prevMessages, newMessage];
	}
};

function mergeContent(existingContent: any, newContent: any): any {
	if (typeof existingContent === "string" && typeof newContent === "string") {
		return existingContent + newContent;
	}
	if (Array.isArray(existingContent) && Array.isArray(newContent)) {
		return [...existingContent, ...newContent];
	}
	// If types don't match or are not handled, return the new content
	return newContent;
}

export const replaceOrInsertMessage = (
	prevMessages: BaseMessage[],
	newMessage: BaseMessage
): BaseMessage[] => {
	const existingMessageIndex = prevMessages.findIndex(
		(msg) => msg.id === newMessage.id
	);

	if (existingMessageIndex !== -1) {
		return [
			...prevMessages.slice(0, existingMessageIndex),
			newMessage,
			...prevMessages.slice(existingMessageIndex + 1),
		];
	} else {
		return [...prevMessages, newMessage];
	}
};

type StreamChunkFields = {
	runId: string | undefined;
	event: string;
	langgraphNode: string;
	nodeInput: any | undefined;
	nodeChunk: any | undefined;
	nodeOutput: any | undefined;
	taskName: string | undefined;
};

export function extractChunkFields(
	chunk: Record<string, any> | undefined
): StreamChunkFields {
	if (!chunk || !chunk.data) {
		return {
			runId: undefined,
			event: "",
			langgraphNode: "",
			nodeInput: undefined,
			nodeChunk: undefined,
			nodeOutput: undefined,
			taskName: undefined,
		};
	}

	return {
		runId: chunk.data?.metadata?.run_id,
		event: chunk.data?.event || "",
		langgraphNode: chunk.data?.metadata?.langgraph_node || "",
		nodeInput: chunk.data?.data?.input,
		nodeChunk: chunk.data?.data?.chunk,
		nodeOutput: chunk.data?.data?.output,
		taskName: chunk.data?.name,
	};
}
