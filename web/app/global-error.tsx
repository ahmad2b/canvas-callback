"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Global error:", error);
	}, [error]);

	return (
		<html>
			<body>
				<div className="min-h-screen w-full bg-grid-small-black/5 relative flex items-center justify-center">
					{/* Simplified background */}
					<div className="absolute inset-0 pointer-events-none bg-black/5"></div>

					<div className="glass-panel border-2 border-red-300/50 p-8 rounded-xl max-w-md w-full z-10 text-center shadow-xl">
						<div className="inline-block p-3 mb-5">
							<div className="h-24 w-24 rounded-full bg-red-100 border-2 border-red-200 flex items-center justify-center mx-auto">
								<span className="font-retro text-6xl text-red-500">X</span>
							</div>
						</div>

						<h1 className="font-retro text-3xl mb-2 text-black">
							CRITICAL ERROR
						</h1>

						<p className="text-foreground/80 mb-6">
							A critical application error has occurred. This is likely a
							problem with the application itself.
						</p>

						{error.digest && (
							<div className="bg-black/5 p-3 rounded-md mb-6 overflow-auto">
								<p className="text-xs font-mono">Error ID: {error.digest}</p>
							</div>
						)}

						<div className="flex justify-center">
							<Button
								onClick={() => reset()}
								className="bg-red-500 hover:bg-red-600 text-white gap-2"
							>
								<RefreshCw className="h-4 w-4" />
								Attempt Recovery
							</Button>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
