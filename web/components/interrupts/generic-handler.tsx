"use client";

import { Command, Interrupt } from "@langchain/langgraph-sdk";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface GenericHandlerProps {
	interrupt: Interrupt;
	onSubmit?: (command: Command) => void;
}

export function GenericHandler({ interrupt, onSubmit }: GenericHandlerProps) {
	const [response, setResponse] = useState("");

	// Extract data from interrupt
	const data = (interrupt?.value as any)?.data || "No data available";
	const type = (interrupt?.value as any)?.type || "Unknown";

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (response.trim() && onSubmit) {
			const payload: Command = {
				goto: undefined,
				resume: {
					[type]: response,
				},
				update: {},
			};
			onSubmit(payload);
		}
	};

	return (
		<div className="w-full p-6">
			<div className="max-w-md mx-auto">
				<h3 className="text-lg font-medium mb-2">{data}</h3>
				<p className="text-xs text-muted-foreground mb-6">
					Interrupt type: {type}
				</p>

				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div className="space-y-2">
						<label className="block text-sm font-medium">Your response:</label>
						<Textarea
							value={response}
							onChange={(e) => setResponse(e.target.value)}
							placeholder="Type your response here..."
							className="w-full min-h-[100px]"
						/>
					</div>

					<Button
						type="submit"
						disabled={!response.trim()}
						className="w-full"
					>
						Submit Response
					</Button>
				</form>
			</div>
		</div>
	);
}
