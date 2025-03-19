"use client";

import { AlertCircle, Minimize2, PanelLeftClose, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCanvasContext } from "@/context/canvas-context";
import { cn } from "@/lib/utils";

interface CanvasRootProps extends React.HTMLAttributes<HTMLDivElement> {
	isOpen?: boolean;
	isLoading?: boolean;
	onToggle?: () => void;
	onClose?: () => void;
	children: React.ReactNode;
}

interface CanvasHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	description?: string;
	showToggleButton?: boolean;
	showCloseButton?: boolean;
	onToggle?: () => void;
	onClose?: () => void;
}

interface CanvasToggleButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	interrupt?: boolean;
}

const CanvasContext = React.createContext<{
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
}>({
	isOpen: false,
	onToggle: () => {},
	onClose: () => {},
});

// Loading animation component
const LoadingOverlay = () => {
	return (
		<div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden">
			{/* Animated background particles */}
			<div className="absolute inset-0 overflow-hidden">
				{Array.from({ length: 20 }).map((_, i) => (
					<div
						key={i}
						className={`
							absolute rounded-full bg-primary/20
							animate-float-random opacity-70
						`}
						style={{
							width: `${Math.random() * 30 + 10}px`,
							height: `${Math.random() * 30 + 10}px`,
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDuration: `${Math.random() * 10 + 10}s`,
							animationDelay: `${Math.random() * 5}s`,
						}}
					/>
				))}
			</div>

			{/* Loading content */}
			<div className="bg-background/90 backdrop-blur-md rounded-lg p-6 shadow-xl flex flex-col items-center gap-4 max-w-sm mx-auto border z-10">
				<div className="relative">
					<div className="animate-spin h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary"></div>
					<div className="animate-pulse absolute inset-0 flex items-center justify-center">
						<div className="h-8 w-8 rounded-full bg-primary/20"></div>
					</div>
				</div>
				<h3 className="text-lg font-medium">Processing your request</h3>
				<p className="text-sm text-center text-muted-foreground">
					We&apos;re working on your request. This might take a moment...
				</p>
				<div className="flex gap-1.5 mt-2">
					<div
						className="w-2 h-2 rounded-full bg-primary animate-bounce"
						style={{ animationDelay: "0ms" }}
					></div>
					<div
						className="w-2 h-2 rounded-full bg-primary animate-bounce"
						style={{ animationDelay: "150ms" }}
					></div>
					<div
						className="w-2 h-2 rounded-full bg-primary animate-bounce"
						style={{ animationDelay: "300ms" }}
					></div>
				</div>
			</div>
		</div>
	);
};

const CanvasRoot = React.forwardRef<HTMLDivElement, CanvasRootProps>(
	(
		{
			className,
			children,
			isOpen = false,
			isLoading = false,
			onToggle,
			onClose,
			...props
		},
		ref
	) => {
		const [open, setOpen] = React.useState(isOpen);

		React.useEffect(() => {
			setOpen(isOpen);
		}, [isOpen]);

		const handleToggle = React.useCallback(() => {
			const newOpenState = !open;
			setOpen(newOpenState);
			if (onToggle) onToggle();
		}, [onToggle, open]);

		const handleClose = React.useCallback(() => {
			setOpen(false);
			if (onClose) onClose();
		}, [onClose]);

		if (!open) return null;

		return (
			<CanvasContext.Provider
				value={{
					isOpen: open,
					onToggle: handleToggle,
					onClose: handleClose,
				}}
			>
				<div
					ref={ref}
					className={cn(
						"flex h-full w-full flex-col overflow-hidden border-l relative",
						className || "bg-gradient-to-br from-background to-primary/5"
					)}
					{...props}
				>
					{children}

					{isLoading && <LoadingOverlay />}
				</div>
			</CanvasContext.Provider>
		);
	}
);
CanvasRoot.displayName = "Canvas.Root";

const CanvasHeader = React.forwardRef<HTMLDivElement, CanvasHeaderProps>(
	(
		{
			className,
			children,
			title,
			description,
			showToggleButton = false,
			showCloseButton = true,
			onToggle: propOnToggle,
			onClose: propOnClose,
			...props
		},
		ref
	) => {
		const { toggleCanvas, closeCanvas } = useCanvasContext();

		const handleToggle = React.useCallback(() => {
			if (propOnToggle) {
				propOnToggle();
			} else {
				toggleCanvas();
			}
		}, [propOnToggle, toggleCanvas]);

		const handleClose = React.useCallback(() => {
			if (propOnClose) {
				propOnClose();
			} else {
				closeCanvas();
			}
		}, [propOnClose, closeCanvas]);

		return (
			<div
				ref={ref}
				className={cn(
					"flex items-center justify-between border-b border-primary/10 bg-gradient-to-r from-background to-primary/5 px-4 py-3",
					className
				)}
				{...props}
			>
				<div className="flex flex-col space-y-1">
					{title && (
						<h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
							{title}
						</h3>
					)}
					{description && (
						<p className="text-sm text-muted-foreground">{description}</p>
					)}
					{children}
				</div>
				<div className="flex items-center space-x-2">
					{showToggleButton && (
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									onClick={handleToggle}
									className="h-8 w-8"
								>
									<Minimize2 className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Toggle</TooltipContent>
						</Tooltip>
					)}
					{showCloseButton && (
						<Button
							variant="ghost"
							size="icon"
							onClick={handleClose}
							className="h-8 w-8"
							title="Close"
						>
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>
			</div>
		);
	}
);
CanvasHeader.displayName = "Canvas.Header";

const CanvasTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn("font-medium", className)}
		{...props}
	/>
));
CanvasTitle.displayName = "Canvas.Title";

const CanvasDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
CanvasDescription.displayName = "Canvas.Description";

const CanvasContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn("flex-1 overflow-auto p-5 bg-background/70", className)}
			{...props}
		>
			{children}
		</div>
	);
});
CanvasContent.displayName = "Canvas.Content";

const CanvasFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"border-t border-primary/10 bg-gradient-to-r from-primary/5 to-background px-4 py-3",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
});
CanvasFooter.displayName = "Canvas.Footer";

const CanvasToggleButton = React.forwardRef<
	HTMLButtonElement,
	CanvasToggleButtonProps
>(({ className, interrupt = false, ...props }, ref) => {
	const { toggleCanvas } = useCanvasContext();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						ref={ref}
						onClick={toggleCanvas}
						variant={interrupt ? "default" : "ghost"}
						size="icon"
						className={cn(className)}
						{...props}
					>
						{interrupt ? (
							<AlertCircle
								className={cn(
									"h-4 w-4",
									interrupt ? "animate-bounce animate-infinite" : ""
								)}
							/>
						) : (
							<PanelLeftClose className="h-4 w-4" />
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					{interrupt ? "Action required, click to view" : "Toggle Canvas"}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
});
CanvasToggleButton.displayName = "Canvas.ToggleButton";

export const Canvas = {
	Root: CanvasRoot,
	Header: CanvasHeader,
	Title: CanvasTitle,
	Description: CanvasDescription,
	Content: CanvasContent,
	Footer: CanvasFooter,
	ToggleButton: CanvasToggleButton,
};
