import { Plane } from "lucide-react";

export default function Loading() {
	return (
		<div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
			<div className="relative flex flex-col items-center gap-8 max-w-md text-center p-8 glass-panel border border-primary/30 shadow-lg">
				{/* Retro-modern animated background */}
				<div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
					<div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background/10 to-accent/10"></div>
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="absolute rounded-lg bg-primary/10 animate-float-random"
							style={{
								width: `${30 + (i % 3) * 20}px`,
								height: `${8 + (i % 2) * 4}px`,
								left: `${(i * 15) % 100}%`,
								top: `${(i * 18) % 100}%`,
								animationDelay: `${i * 0.6}s`,
								animationDuration: `${3 + (i % 3) * 2}s`,
								transform: `rotate(${i * 45}deg)`,
							}}
						/>
					))}
				</div>

				{/* Main loading animation */}
				<div className="relative w-24 h-24 mb-2 glow-primary">
					<div className="w-full h-full border-2 border-primary/40 rounded-full animate-spin-slow"></div>
					<div className="absolute inset-3 border-2 border-dashed border-primary/60 rounded-full animate-spin-reverse"></div>

					<div className="absolute inset-0 flex items-center justify-center">
						<Plane className="h-10 w-10 text-primary animate-pulse" />
					</div>
				</div>

				{/* Text content */}
				<div className="space-y-4">
					<h3 className="text-2xl font-bold text-primary font-retro tracking-wide">
						LOADING ADVENTURE
					</h3>
					<p className="text-lg text-foreground/80 font-pixel">
						Initializing your travel experience
						<br />
						<span className="text-primary/80">Please stand by...</span>
					</p>
				</div>

				{/* Progress bar with modern styling */}
				<div className="w-full max-w-xs bg-muted/50 h-2 rounded-full overflow-hidden backdrop-blur-sm">
					<div className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
				</div>

				{/* Modern-retro loading indicators */}
				<div className="flex gap-4 mt-2">
					<div className="w-2.5 h-2.5 bg-primary rounded-sm animate-bounce-delay-1 opacity-80"></div>
					<div className="w-2.5 h-2.5 bg-secondary rounded-sm animate-bounce-delay-2 opacity-80"></div>
					<div className="w-2.5 h-2.5 bg-accent rounded-sm animate-bounce-delay-3 opacity-80"></div>
				</div>
			</div>
		</div>
	);
}
