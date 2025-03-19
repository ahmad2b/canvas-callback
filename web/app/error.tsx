"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Application error:", error);
	}, [error]);

	return (
		<div className="min-h-screen w-full bg-grid-small-black/5 relative flex items-center justify-center">
			{/* Background dot pattern */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-grid-small-black/10 opacity-30"></div>
				<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent"></div>
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
			</div>

			<div className="glass-panel border-2 border-black/30 p-8 rounded-xl max-w-md w-full z-10 text-center shadow-xl">
				<div className="inline-block p-3 rounded-full bg-red-50 border border-red-100 mb-5">
					<div className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-200 flex items-center justify-center mx-auto">
						<span className="font-retro text-4xl text-red-500">!</span>
					</div>
				</div>

				<h1 className="font-retro text-3xl mb-2 text-black">
					ERROR ENCOUNTERED
				</h1>

				<p className="text-foreground/80 mb-6">
					Something went wrong while loading this page.
				</p>

				{error.digest && (
					<div className="bg-black/5 p-3 rounded-md mb-6 overflow-auto">
						<p className="text-xs font-mono">Error ID: {error.digest}</p>
					</div>
				)}

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button
						onClick={() => reset()}
						className="bg-black hover:bg-black/80 text-white gap-2"
					>
						<RefreshCw className="h-4 w-4" />
						Try Again
					</Button>

					<Button
						asChild
						variant="outline"
						className="border-black/30 hover:bg-black/5 gap-2"
					>
						<Link href="/">
							<Home className="h-4 w-4" />
							Return Home
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
