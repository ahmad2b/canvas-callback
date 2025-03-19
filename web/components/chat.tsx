"use client";

import { ImageAttachment } from "@/types";
import {
	AppendMessage,
	AssistantRuntimeProvider,
	CompositeAttachmentAdapter,
	SimpleImageAttachmentAdapter,
	TextContentPart,
	useExternalMessageConverter,
	useExternalStoreRuntime,
} from "@assistant-ui/react";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Thread } from "@/components/thread";
import {
	convertLangchainMessages,
	convertToOpenAIFormat,
} from "@/lib/convert_messages";
import { cn, converToBase64 } from "@/lib/utils";

import { sendMessage } from "@/context/action";
import { Interrupt } from "@langchain/langgraph-sdk";

export interface ContentComposerChatInterfaceProps {
	chatId: string;
	messages: BaseMessage[];
	isStreaming: boolean;
	setMessages: Dispatch<SetStateAction<BaseMessage[]>>;
	setInterrupt: Dispatch<SetStateAction<Interrupt | undefined>>;
	setIsStreaming: Dispatch<SetStateAction<boolean>>;
}

export function ContentComposerChatInterfaceComponent({
	chatId,
	messages,
	isStreaming,
	setMessages,
	setInterrupt,
	setIsStreaming,
}: ContentComposerChatInterfaceProps): React.ReactElement {
	async function onNew(message: AppendMessage): Promise<void> {
		setIsStreaming(true);

		const textContent =
			(
				message.content.find((c) => c.type === "text") as
					| TextContentPart
					| undefined
			)?.text || "";

		const imageData = await Promise.all(
			message?.attachments?.map(async (attachment) => {
				const imageFiles = attachment.content
					.filter(
						(item): item is { type: "image"; file: File; image: string } =>
							item.type === "image" && !!attachment.file && !!item.image
					)
					.map(() => attachment.file);

				return Promise.all(
					imageFiles.map(async (file): Promise<ImageAttachment> => {
						if (!file) {
							throw new Error("File is undefined");
						}
						const base64Data = await converToBase64(file);
						return {
							base64: base64Data,
							name: file.name,
							type: file.type,
							displayUrl: URL.createObjectURL(file),
						};
					})
				);
			}) ?? []
		);

		const flattenedImages: ImageAttachment[] = imageData.flat();

		try {
			const humanMessage = new HumanMessage({
				content:
					flattenedImages.length > 0
						? [
								{
									type: "text",
									text: textContent,
								},
								...flattenedImages.map((image) => ({
									type: "image_url",
									image_url: {
										url: `${image.base64}`,
									},
								})),
						  ].filter(Boolean)
						: textContent,
				id: uuidv4(),
			});

			setMessages((prevMessages) => [...prevMessages, humanMessage]);

			await sendMessage({
				messages: [convertToOpenAIFormat(humanMessage)],
				chatId: chatId,
				setMessages,
				setInterrupt,
			});
		} finally {
			setIsStreaming(false);
		}
	}

	const threadMessages = useExternalMessageConverter<BaseMessage>({
		callback: convertLangchainMessages,
		messages: messages,
		isRunning: isStreaming,
	});

	const runtime = useExternalStoreRuntime({
		messages: threadMessages,
		isRunning: isStreaming,
		onNew,
		adapters: {
			attachments: new CompositeAttachmentAdapter([
				new SimpleImageAttachmentAdapter(),
			]),
		},
	});

	// Add subtle background animation effect
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const x = e.clientX / window.innerWidth;
			const y = e.clientY / window.innerHeight;

			document.documentElement.style.setProperty("--mouse-x", x.toString());
			document.documentElement.style.setProperty("--mouse-y", y.toString());
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<motion.div
			className="flex flex-col h-full relative"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{/* Subtle gradient background that follows mouse position */}
			<div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>

			<div
				className={cn(
					"flex-1 overflow-hidden relative",
					isStreaming &&
						"after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary/5 after:to-transparent after:animate-pulse after:pointer-events-none"
				)}
			>
				<AssistantRuntimeProvider runtime={runtime}>
					<Thread />
				</AssistantRuntimeProvider>
			</div>
		</motion.div>
	);
}

export const Chat = React.memo(ContentComposerChatInterfaceComponent);
