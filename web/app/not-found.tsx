import { Home, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="min-h-screen w-full bg-grid-small-black/5 relative flex items-center justify-center">
			{/* Background dot pattern */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-grid-small-black/10 opacity-30"></div>
				<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent"></div>
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
			</div>

			<div className="glass-panel border-2 border-black/30 p-8 rounded-xl max-w-md w-full z-10 text-center shadow-xl">
				<div className="inline-block p-3 rounded-full bg-blue-50 border border-blue-100 mb-5">
					<div className="flex items-center justify-center mx-auto">
						<span className="font-retro text-8xl text-black font-bold">
							404
						</span>
					</div>
				</div>

				<h1 className="font-retro text-3xl mb-2 text-black">PAGE NOT FOUND</h1>

				<p className="text-foreground/80 mb-6">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button
						asChild
						className="bg-black hover:bg-black/80 text-white gap-2"
					>
						<Link href="/">
							<Home className="h-4 w-4" />
							Return Home
						</Link>
					</Button>

					<Button
						asChild
						variant="outline"
						className="border-black/30 hover:bg-black/5 gap-2"
					>
						<Link href="/guide">
							<Search className="h-4 w-4" />
							Browse Guide
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
