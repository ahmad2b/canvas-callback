import { Client } from "@langchain/langgraph-sdk";

export const createClient = (): Client => {
	return new Client({
		apiUrl: process.env.NEXT_PUBLIC_LANGGRAPH_API_URL,
		defaultHeaders: {
			"x-api-key": process.env.NEXT_PUBLIC_LANGGRAPH_API_KEY,
		},
	});
};
