import { createClient } from "@/lib/langgraph-client";
import { redirect } from "next/navigation";

export default async function ChatPage() {
	const client = createClient();
	const thread = await client.threads.create({
		metadata: {
			userId: "test_user",
		},
	});

	redirect(`/${thread.thread_id}`);
}
