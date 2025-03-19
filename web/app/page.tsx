import { BookOpen, Github, Play } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
	return (
		<div className="min-h-screen w-full bg-grid-small-black/5 relative">
			{/* Background dot pattern */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-grid-small-black/10 opacity-30"></div>
				<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent"></div>
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
			</div>

			<div className="container mx-auto px-4 py-10 relative z-10 flex flex-col items-center justify-center min-h-screen">
				<div className="max-w-3xl w-full">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="font-retro text-5xl md:text-6xl text-black">
							CANVAS<span className="text-primary ml-2">CALLBACK</span>
						</h1>
						<p className="text-md text-foreground/80 mt-3">
							Open-source implementation of Canvas with human-in-the-loop
						</p>
					</div>

					{/* Description card */}
					<div className="glass-panel border border-black/30 rounded-xl p-6 shadow-md mb-8 text-center">
						<p className="mb-4">
							Canvas Callback demonstrates how to transform AI chat interfaces
							into interactive visual workspaces using LangGraph interrupts for
							joint problem-solving between users and AI agents.
						</p>
					</div>

					{/* Large CTAs */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
						<div className="glass-panel border-2 border-black/20 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 flex flex-col">
							<h3 className="text-2xl font-bold mb-3">Canvas Guide</h3>
							<p className="mb-5 text-foreground/80 flex-grow">
								Learn architecture and implementation patterns for interactive
								canvas interfaces.
							</p>
							<Button
								asChild
								size="lg"
								className="bg-black hover:bg-black/80 text-white w-full h-14 text-lg"
							>
								<Link
									href="/guide"
									className="flex items-center justify-center gap-2"
								>
									<BookOpen className="w-5 h-5" />
									Read Guide
								</Link>
							</Button>
						</div>

						<div className="glass-panel border-2 border-primary/30 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 flex flex-col">
							<h3 className="text-2xl font-bold mb-3">Interactive Demo</h3>
							<p className="mb-5 text-foreground/80 flex-grow">
								Try canvas interactions firsthand with an interactive travel
								planning AI Agent.
							</p>
							<Button
								asChild
								size="lg"
								className="bg-primary hover:bg-primary/90 text-white w-full h-14 text-lg"
							>
								<Link
									href="/n"
									className="flex items-center justify-center gap-2"
								>
									<Play className="w-5 h-5" />
									Launch Demo
								</Link>
							</Button>
						</div>
					</div>

					{/* Key Features */}
					<div className="glass-panel border border-black/20 p-5 rounded-xl mb-10">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="p-2 text-center">
								<h4 className="font-bold text-primary mb-1">Canvas UI</h4>
								<p className="text-xs">
									Visual workspace alongside chat interface
								</p>
							</div>
							<div className="p-2 text-center">
								<h4 className="font-bold text-primary mb-1">
									Human-in-the-loop
								</h4>
								<p className="text-xs">
									LangGraph interrupts for collecting user input
								</p>
							</div>
							<div className="p-2 text-center">
								<h4 className="font-bold text-primary mb-1">Reference Code</h4>
								<p className="text-xs">
									Patterns to adapt to your applications
								</p>
							</div>
						</div>
					</div>

					{/* Footer */}
					<footer className="text-center text-sm text-foreground/60 mt-auto border-t border-black/10 pt-4">
						<div className="flex justify-center space-x-4">
							<Link
								href="https://github.com/ahmad2b/canvas-callback"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 hover:text-primary transition-colors"
							>
								<Github className="h-4 w-4" />
								<span>GitHub Repository</span>
							</Link>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
}
