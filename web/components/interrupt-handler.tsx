"use client";

import { Command, Interrupt } from "@langchain/langgraph-sdk";

import { ActivitySelector } from "./interrupts/activity-selector";
import { DateSelector } from "./interrupts/date-selector";
import { DestinationSelector } from "./interrupts/destination-selector";

export interface InterruptHandlerProps {
	interrupt: Interrupt;
	onSubmit?: (command: Command) => void;
}

export function InterruptHandler({
	interrupt,
	onSubmit,
}: InterruptHandlerProps) {
	// Extract the type from interrupt data
	const type = (interrupt?.value as any)?.type || "unknown";
	// console.log("InterruptHandler type:", type);

	// Route to the appropriate interrupt handler based on type
	switch (type) {
		case "destination":
			return (
				<DestinationSelector
					interrupt={interrupt}
					onSubmit={onSubmit}
				/>
			);
		case "dates":
			return (
				<DateSelector
					interrupt={interrupt}
					onSubmit={onSubmit}
				/>
			);
		case "activities":
			return (
				<ActivitySelector
					interrupt={interrupt}
					onSubmit={onSubmit}
				/>
			);

		default:
			return null;
	}
}
