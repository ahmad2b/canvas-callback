"use client";

import { BaseMessage } from "@langchain/core/messages";
import { Interrupt } from "@langchain/langgraph-sdk";
import { PanelRightClose } from "lucide-react";
import { useEffect, useState } from "react";

import { Chat } from "@/components/chat";
import { InterruptHandler } from "@/components/interrupt-handler";
import { TripData } from "@/components/trip-card";
import { TripDialog } from "@/components/trip-dialog";
import { Button } from "@/components/ui/button";
import { Canvas } from "@/components/ui/canvas";
import { useSidebar } from "@/components/ui/sidebar";
import { sendInterruptResponse } from "@/context/action";
import { useCanvasContext } from "@/context/canvas-context";
import { createTripData } from "@/lib/utils";
import { AgentState } from "@/types";

interface CanvasComponentProps {
	chatId: string;
	intialMessages: BaseMessage[];
	intialInterruptData?: Interrupt;
	initialAgentState?: AgentState;
}

export function CanvasComponent({
	chatId,
	intialMessages,
	intialInterruptData,
	initialAgentState,
}: CanvasComponentProps) {
	const [messages, setMessages] = useState<BaseMessage[]>(intialMessages);
	const [isStreaming, setIsStreaming] = useState<boolean>(false);
	const [interrupt, setInterrupt] = useState<Interrupt | undefined>(
		intialInterruptData
	);
	const [agentState, setAgentState] = useState<AgentState | undefined>(
		initialAgentState
	);
	const { toggleSidebar, state } = useSidebar();
	const { isOpen, toggleCanvas, closeCanvas, isLoading, setLoading } =
		useCanvasContext();

	// Trip dialog state
	const [tripDialogOpen, setTripDialogOpen] = useState(false);
	const [tripData, setTripData] = useState<TripData | null>(null);

	// Auto-open canvas if interrupt data is present
	useEffect(() => {
		if (interrupt && !isOpen) {
			toggleCanvas();
			if (state === "expanded") toggleSidebar();
		}
	}, [interrupt]);

	// Show trip dialog when trip data is available
	useEffect(() => {
		if (agentState?.trips) {
			const formattedTripData = createTripData(agentState.trips) as TripData;
			setTripData(formattedTripData);
			setTripDialogOpen(true);
		}
	}, [agentState?.trips]);

	return (
		<div className="h-screen w-full bg-background flex">
			{/* Sidebar Toggle Button */}
			{state === "collapsed" && (
				<Button
					onClick={toggleSidebar}
					className="absolute top-4 left-4 z-30 "
					size={"icon"}
					variant={"ghost"}
				>
					<PanelRightClose className="h-4 w-4" />
				</Button>
			)}

			{/* Chat Area */}
			<div className={`flex-1 ${isOpen ? "border-r" : ""} relative`}>
				{/* Canvas Toggle Button - only visible when canvas is closed */}
				{!isOpen && (
					<Canvas.ToggleButton
						interrupt={!!interrupt}
						className="absolute top-4 right-4 z-30"
					/>
				)}

				{/* Chat Component */}
				<Chat
					chatId={chatId}
					messages={messages}
					isStreaming={isStreaming}
					setMessages={setMessages}
					setInterrupt={setInterrupt}
					setIsStreaming={setIsStreaming}
				/>
			</div>

			{/* Canvas Area */}
			{isOpen && (
				<Canvas.Root
					isOpen={isOpen}
					isLoading={isLoading}
					onToggle={toggleCanvas}
					onClose={closeCanvas}
					className="w-3/5 max-w-5xl"
				>
					<Canvas.Header
						title={"Travel Agent"}
						description={"Please assist the agent with the following"}
					/>

					<Canvas.Content className="p-0">
						{interrupt ? (
							<InterruptHandler
								interrupt={interrupt}
								onSubmit={async (command) => {
									console.log(
										"Received command from interrupt handler:",
										command
									);

									setLoading(true);

									// Use dedicated interrupt response function
									await sendInterruptResponse({
										chatId: chatId ?? "",
										interrupt,
										setMessages,
										setInterrupt,
										command,
										agentState,
										setAgentState,
									});

									setLoading(false);
								}}
							/>
						) : (
							<div className="flex h-full items-center justify-center">
								<p className="text-muted-foreground">No content to display</p>
							</div>
						)}
					</Canvas.Content>
				</Canvas.Root>
			)}

			{/* Trip Dialog */}
			<TripDialog
				trip={tripData}
				open={tripDialogOpen}
				onOpenChange={setTripDialogOpen}
			/>
		</div>
	);
}
