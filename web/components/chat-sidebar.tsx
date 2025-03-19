"use client";

import { UserButton } from "@stackframe/stack";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
import { useCanvasContext } from "@/context/canvas-context";

export function ChatSidebar() {
	const router = useRouter();
	const { state, toggleSidebar } = useSidebar();
	const { isOpen, toggleCanvas } = useCanvasContext();

	// Create a new chat
	const handleNewChat = async () => {
		try {
			if (state === "expanded") toggleSidebar(); // Close the sidebar
			if (isOpen) toggleCanvas(); // Close the canvas
			router.push(`/n`); // Start a new chat
		} catch (error) {
			console.error("Failed to create new chat:", error);
		}
	};

	return (
		<Sidebar className="border-r">
			<SidebarHeader className="border-b px-4 py-2">
				<div className="flex items-center justify-between">
					<h1 className="text-lg font-semibold">Canvas Callback</h1>
					<SidebarTrigger />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<div className="px-4 py-2">
					<Button
						variant="outline"
						className="w-full justify-start"
						onClick={handleNewChat}
					>
						<PlusIcon className="mr-2 h-4 w-4" />
						New Chat
					</Button>
				</div>
			</SidebarContent>
			<SidebarFooter className="border-t p-4 bg-background">
				<div className="flex items-center justify-between">
					<div className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} CanvasCallback
					</div>
					<div className="rounded-full border">
						<UserButton />
					</div>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
