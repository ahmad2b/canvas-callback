import { ChatSidebar } from "@/components/chat-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CanvasProvider } from "@/context/canvas-context";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen w-full">
			<CanvasProvider>
				<SidebarProvider>
					<ChatSidebar />
					<SidebarInset className="flex-1 overflow-hidden">
						{children}
					</SidebarInset>
				</SidebarProvider>
			</CanvasProvider>
		</div>
	);
}
