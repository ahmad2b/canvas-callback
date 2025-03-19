import { cn } from "@/lib/utils";
import {
	BranchPickerPrimitive,
	ComposerPrimitive,
	MessagePrimitive,
	ThreadPrimitive,
} from "@assistant-ui/react";
import {
	ArrowDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	SendHorizontalIcon,
} from "lucide-react";
import type { FC } from "react";

import { MarkdownText } from "@/components/markdown-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TooltipIconButton } from "@/components/ui/tooltip-icon-button";
import Link from "next/link";

export const Thread = () => {
	return (
		<ThreadPrimitive.Root
			className="bg-background box-border h-full relative"
			style={{
				["--thread-max-width" as string]: "46rem",
			}}
		>
			{/* Subtle gradient background */}
			<div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-30"></div>

			<ThreadPrimitive.Viewport className="flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-transparent px-4 pt-8 relative z-10">
				<ThreadWelcome />

				<ThreadPrimitive.Messages
					components={{
						UserMessage: UserMessage,
						EditComposer: EditComposer,
						AssistantMessage: AssistantMessage,
					}}
				/>

				<ThreadPrimitive.If empty={false}>
					<div className="min-h-8 flex-grow" />
				</ThreadPrimitive.If>

				<div className="sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg bg-transparent pb-4">
					<ThreadScrollToBottom />
					<Composer />
				</div>
			</ThreadPrimitive.Viewport>
		</ThreadPrimitive.Root>
	);
};

const ThreadScrollToBottom: FC = () => {
	return (
		<ThreadPrimitive.ScrollToBottom asChild>
			<TooltipIconButton
				tooltip="Scroll to bottom"
				variant="outline"
				className="absolute -top-8 rounded-lg shadow-sm disabled:invisible border-primary/40 hover:bg-primary/5 hover:border-primary transition-all duration-300 hover:scale-105"
			>
				<ArrowDownIcon className="text-primary" />
			</TooltipIconButton>
		</ThreadPrimitive.ScrollToBottom>
	);
};

const ThreadWelcome: FC = () => {
	return (
		<ThreadPrimitive.Empty>
			<div className="flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col">
				<div className="flex w-full flex-grow flex-col items-center justify-center space-y-6 p-8 rounded-xl backdrop-blur-sm relative overflow-hidden">
					{/* Subtle background gradients */}
					<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-30 rounded-xl"></div>
					<div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full filter blur-xl"></div>
					<div className="absolute -left-8 -bottom-8 w-32 h-32 bg-black/5 rounded-full filter blur-xl"></div>

					{/* Title with glow effect */}
					<div className="relative text-center mb-4 w-full">
						<div className="absolute -inset-1 bg-primary/10 filter blur-md rounded-xl"></div>
						<h2 className="font-retro text-3xl tracking-tight text-black relative z-10 drop-shadow-sm p-4 bg-clip-text text-transparent bg-gradient-to-b from-black to-black/80">
							Canvas Callback
						</h2>
					</div>

					{/* Content card with subtle glass effect */}
					<div className="w-full glass-panel border border-black/10 rounded-xl p-6 backdrop-blur-sm shadow-sm relative z-10">
						<p className="text-lg text-black/80">
							Build interactive AI experiences with dedicated workspaces
							alongside your chat interface.
						</p>
						<ul className="ml-8 my-4 list-disc [&>li]:mt-2">
							<li className=" text-black/80">
								Rich visualization & structured data display
							</li>
							<li className=" text-black/80">
								Real-time collaborative workflows
							</li>
							<li className=" text-black/80">
								Human-in-the-loop via{" "}
								<span className="italic text-primary">
									LangGraph interrupts
								</span>
							</li>
						</ul>
					</div>

					{/* CTA Button with gradient hover effect */}
					<Button
						variant="default"
						size={"lg"}
						className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-retro transition-all duration-300 z-20 rounded-lg shadow-sm hover:shadow-md"
						asChild
					>
						<Link href="/guide">Explore the Guide</Link>
					</Button>
				</div>
			</div>
		</ThreadPrimitive.Empty>
	);
};

const Composer: FC = () => {
	return (
		<div className="relative w-full">
			<ComposerPrimitive.Root className="relative focus-within:border-primary/30 focus-within:shadow-md flex w-full flex-wrap items-end rounded-xl border border-border bg-white/20 backdrop-blur-sm px-3 shadow-sm transition-all duration-300">
				<ComposerPrimitive.Input
					rows={1}
					autoFocus
					placeholder="Type your message..."
					className="placeholder:text-foreground/50 max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed font-medium"
				/>
				<ComposerAction />
			</ComposerPrimitive.Root>
		</div>
	);
};

const ComposerAction: FC = () => {
	return (
		<>
			<ThreadPrimitive.If running={false}>
				<ComposerPrimitive.Send asChild>
					<TooltipIconButton
						tooltip="Send"
						variant="default"
						className="my-2.5 size-8 p-1.5 transition-all duration-300 bg-primary/90 hover:bg-primary text-primary-foreground font-medium rounded-lg hover:scale-105 shadow-sm"
					>
						<SendHorizontalIcon />
					</TooltipIconButton>
				</ComposerPrimitive.Send>
			</ThreadPrimitive.If>
			<ThreadPrimitive.If running>
				<ComposerPrimitive.Cancel asChild>
					<TooltipIconButton
						tooltip="Cancel"
						variant="default"
						className="my-2.5 size-8 p-2 transition-all duration-300 bg-destructive/90 hover:bg-destructive text-destructive-foreground rounded-lg hover:scale-105 shadow-sm"
					>
						<CircleStopIcon />
					</TooltipIconButton>
				</ComposerPrimitive.Cancel>
			</ThreadPrimitive.If>
		</>
	);
};

const TypingIndicator = () => (
	<div className="typing-indicator">
		<span></span>
		<span></span>
		<span></span>
	</div>
);

const UserMessage: FC = () => {
	return (
		<MessagePrimitive.Root className="grid auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 [&:where(>*)]:col-start-2 w-full max-w-[var(--thread-max-width)] py-4">
			{/* <UserActionBar /> */}

			<div className="bg-white/40 text-foreground max-w-[calc(var(--thread-max-width)*0.8)] break-words glass-panel px-4 py-3 col-start-2 row-start-2 border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 message-animation message-hover-effect">
				<MessagePrimitive.Content />
			</div>

			<BranchPicker className="col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
		</MessagePrimitive.Root>
	);
};

// const UserActionBar: FC = () => {
// 	return (
// 		<ActionBarPrimitive.Root
// 			hideWhenRunning
// 			autohide="not-last"
// 			className="flex flex-col items-end col-start-1 row-start-2 mr-3 mt-2.5"
// 		>
// 			<ActionBarPrimitive.Edit asChild>
// 				<TooltipIconButton tooltip="Edit">
// 					<PencilIcon />
// 				</TooltipIconButton>
// 			</ActionBarPrimitive.Edit>
// 		</ActionBarPrimitive.Root>
// 	);
// };

const EditComposer: FC = () => {
	return (
		<ComposerPrimitive.Root className="border border-primary/30 my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl glass-panel shadow-sm">
			<ComposerPrimitive.Input className="text-foreground flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none font-medium" />

			<div className="mx-3 mb-3 flex items-center justify-center gap-2 self-end">
				<ComposerPrimitive.Cancel asChild>
					<Button
						variant="ghost"
						className="rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
					>
						Cancel
					</Button>
				</ComposerPrimitive.Cancel>
				<ComposerPrimitive.Send asChild>
					<Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105">
						Send
					</Button>
				</ComposerPrimitive.Send>
			</div>
		</ComposerPrimitive.Root>
	);
};

const AssistantMessage: FC = () => {
	return (
		<MessagePrimitive.Root className="grid grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] relative w-full max-w-[var(--thread-max-width)] py-4">
			<Avatar className="col-start-1 row-span-full row-start-1 mr-4 border border-border rounded-full overflow-hidden shadow-sm bg-white/30 p-0.5">
				<AvatarImage src="/music-record.png" />
				<AvatarFallback className="font-retro bg-primary/10 text-primary">
					A
				</AvatarFallback>
			</Avatar>

			<div className="text-foreground max-w-[calc(var(--thread-max-width)*0.8)] break-words leading-7 col-span-2 col-start-2 row-start-1 my-1.5 rounded-xl glass-panel border border-primary/20 bg-white/40 backdrop-blur-sm px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-300 assistant-message message-animation message-hover-effect">
				<MessagePrimitive.Content components={{ Text: MarkdownText }} />
				<ThreadPrimitive.If running>
					<MessagePrimitive.If lastOrHover>
						<div className="mt-2 pl-2">
							<TypingIndicator />
						</div>
					</MessagePrimitive.If>
				</ThreadPrimitive.If>
			</div>

			{/* <AssistantActionBar /> */}

			{/* <BranchPicker className="col-start-2 row-start-2 -ml-2 mr-2" /> */}
		</MessagePrimitive.Root>
	);
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
	className,
	...rest
}) => {
	return (
		<BranchPickerPrimitive.Root
			hideWhenSingleBranch
			className={cn(
				"text-primary/70 inline-flex items-center text-xs",
				className
			)}
			{...rest}
		>
			<BranchPickerPrimitive.Previous asChild>
				<TooltipIconButton
					tooltip="Previous"
					className="hover:bg-primary/5 hover:text-primary rounded-lg border border-primary/20 transition-all duration-300"
				>
					<ChevronLeftIcon />
				</TooltipIconButton>
			</BranchPickerPrimitive.Previous>
			<span className="font-medium mx-1">
				<BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
			</span>
			<BranchPickerPrimitive.Next asChild>
				<TooltipIconButton
					tooltip="Next"
					className="hover:bg-primary/5 hover:text-primary rounded-lg border border-primary/20 transition-all duration-300"
				>
					<ChevronRightIcon />
				</TooltipIconButton>
			</BranchPickerPrimitive.Next>
		</BranchPickerPrimitive.Root>
	);
};

const CircleStopIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			width="16"
			height="16"
		>
			<rect
				width="10"
				height="10"
				x="3"
				y="3"
				rx="2"
			/>
		</svg>
	);
};
