import { createClient } from "@/lib/langgraph-client";
import { BaseMessage } from "@langchain/core/messages";
import { extractChunkFields, replaceOrInsertMessageChunk } from "./utils";

import { SetStateAction } from "react";

import { AgentState } from "@/types";
import { Command, Interrupt } from "@langchain/langgraph-sdk";
import { Dispatch } from "react";

// Shim for recent LangGraph bugfix
function extractStreamDataChunk(chunk: any) {
	if (Array.isArray(chunk)) {
		return chunk[1];
	}
	return chunk;
}

function extractInterruptData(chunk: any) {
	if (chunk.data && chunk.data.__interrupt__) {
		return chunk.data.__interrupt__[0];
	}
	return null;
}

interface AgentInput {
	chatId: string;
	messages?: Record<string, any>[];
	interrupt?: Interrupt;
	setMessages: Dispatch<SetStateAction<BaseMessage[]>>;
	setInterrupt: Dispatch<SetStateAction<Interrupt | undefined>>;
	command: Command;
}

const client = createClient();

/**
 * Sends an interrupt response back to the agent
 * This handles the specialized case of responding to interrupts
 */
export const sendInterruptResponse = async ({
	chatId,
	interrupt,
	setMessages,
	setInterrupt,
	command,
	agentState,
	setAgentState,
}: Omit<AgentInput, "messages"> & {
	interrupt: Interrupt; // Make interrupt required for this function
	agentState?: AgentState;
	setAgentState: Dispatch<SetStateAction<AgentState | undefined>>;
}) => {
	let followupMessageId = "";

	if (!chatId) {
		throw new Error("No chatId provided");
	}

	try {
		// Stream with resume command for interrupt
		const stream = client.runs.stream(chatId, "agent", {
			input: {},
			streamMode: ["events", "updates"],
			streamSubgraphs: true,
			command: command,
			config: {
				configurable: {},
			},
		});

		// Process stream responses
		for await (const chunk of stream) {
			if (chunk.event === "error") {
				const errorMessage =
					chunk?.data?.message || "Unknown error. Please try again.";
				throw new Error(errorMessage);
			}

			try {
				const { event, nodeChunk } = extractChunkFields(chunk);

				if (chunk.event === "updates") {
					setAgentState((prevState) => ({
						...prevState,
						...chunk.data.supervisor,
					}));

					// Check if we have interrupt data
					if (chunk.data && chunk.data.__interrupt__) {
						const data = extractInterruptData(chunk);
						if (data) {
							setInterrupt(data);
						}
					}
				}

				if (event === "on_chat_model_stream") {
					const message = extractStreamDataChunk(nodeChunk);
					if (!followupMessageId) {
						followupMessageId = message.id;
						console.log("📝 First message ID:", followupMessageId);
					}

					setMessages((prevMessages) =>
						replaceOrInsertMessageChunk(prevMessages, message)
					);
				}
			} catch (e) {
				console.error("Failed to parse stream chunk", chunk, "\n\nError:\n", e);
			}
		}
	} catch (e) {
		console.error("Failed to stream interrupt response", e);
	}
};

export const sendMessage = async ({
	chatId,
	messages,
	interrupt,
	setMessages,
	setInterrupt,
}: Omit<AgentInput, "command">) => {
	if (!chatId) {
		throw new Error("No chatId provided");
	}

	// Only reset interrupt data if we're not responding to an interrupt
	if (!interrupt) {
		setInterrupt(undefined);
	}

	try {
		// Handle normal message case
		let followupMessageId = "";

		// Normal message stream (existing code)
		const stream = client.runs.stream(chatId, "agent", {
			input: {
				messages: messages || [],
			},
			streamMode: ["events", "updates"],
			streamSubgraphs: true,
			config: {
				configurable: {},
			},
		});

		for await (const chunk of stream) {
			if (chunk.event === "error") {
				const errorMessage =
					chunk?.data?.message || "Unknown error. Please try again.";
				throw new Error(errorMessage);
			}

			try {
				const { event, langgraphNode, nodeChunk } = extractChunkFields(chunk);

				console.log("🔄 langgraphNode:", langgraphNode);

				if (chunk.event === "updates") {
					// Check if we have interrupt data
					if (chunk.data && chunk.data.__interrupt__) {
						const data = extractInterruptData(chunk);
						if (data) {
							setInterrupt(data);
						}
					}
				}

				if (event === "on_chat_model_stream") {
					if (["supervisor", "agent"].includes(langgraphNode)) {
						const message = extractStreamDataChunk(nodeChunk);
						if (!followupMessageId) {
							followupMessageId = message.id;
							console.log("📝 First message ID:", followupMessageId);
						}

						setMessages((prevMessages) =>
							replaceOrInsertMessageChunk(prevMessages, message)
						);
					}
				}
			} catch (e) {
				console.error("Failed to parse stream chunk", chunk, "\n\nError:\n", e);
			}
		}
	} catch (e) {
		console.error("Failed to stream message", e);
	}
};
