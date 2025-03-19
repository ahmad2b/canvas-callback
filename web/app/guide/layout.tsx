import { CanvasProvider } from "@/context/canvas-context";

export default function CanvasHiloopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen w-full bg-grid-small-black/5 relative pb-16">
			{/* Background dot pattern */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-grid-small-black/10 opacity-30"></div>
				<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent"></div>
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
			</div>

			{/* Magazine page container */}
			<div className="relative z-10">
				<CanvasProvider>{children}</CanvasProvider>
			</div>
		</div>
	);
}
