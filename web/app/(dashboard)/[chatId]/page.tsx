import { BaseMessage } from "@langchain/core/messages";

import { CanvasComponent } from "@/components/canvas-component";
import { createClient } from "@/lib/langgraph-client";
import { extractInterruptData } from "@/lib/utils";

interface ChatPageProps {
	params: Promise<{
		chatId: string;
	}>;
}

export default async function ChatPage({ params }: ChatPageProps) {
	const { chatId } = await params;

	const client = createClient();
	const thread = await client.threads.get(chatId);

	const interruptData = extractInterruptData(thread);

	const agentState = thread.values as Record<string, unknown>;
	const messages = Array.isArray(agentState?.messages)
		? (agentState.messages as BaseMessage[])
		: [];

	return (
		<CanvasComponent
			chatId={chatId}
			intialMessages={messages}
			intialInterruptData={interruptData}
			initialAgentState={agentState}
		/>
	);
}
