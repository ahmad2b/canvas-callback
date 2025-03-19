"use client";

import { motion } from "framer-motion";
import {
	Calendar,
	Facebook,
	Link,
	MessageCircle,
	Scroll,
	Share2,
	Twitter,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface TripData {
	destination: string;
	dates: {
		startDate: string;
		endDate: string;
	};
	activities: string[];
}

interface TripCardProps {
	trip: TripData;
	onShare?: () => void;
}

// Inspiration messages for the traveler
const inspirationalMessages = [
	"Adventure awaits you in every corner of this beautiful destination.",
	"Prepare to create memories that will last a lifetime.",
	"Let your wanderlust guide you through this amazing journey.",
	"Every journey tells a story. Make yours unforgettable.",
	"Travel not to escape life, but for life not to escape you.",
	"The world is a book, and those who do not travel read only one page.",
	"Embrace the culture, savor the cuisine, and create lifelong memories.",
	"Let curiosity be your compass on this wonderful adventure.",
	"Discover new horizons and rediscover yourself.",
	"The best journeys in life are those that answer questions you never thought to ask.",
];

// Background image options
const backgroundImages = [
	"https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2069&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop",
];

export function TripCard({
	trip: { activities, dates, destination },
	onShare,
}: TripCardProps) {
	const [isSharing, setIsSharing] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);

	// Format dates for display
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	// Calculate trip duration
	const startDate = new Date(dates.startDate);
	const endDate = new Date(dates.endDate);
	const tripDuration =
		Math.ceil(
			(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
		) + 1;

	// Select a random inspirational message
	const message =
		inspirationalMessages[
			Math.floor(Math.random() * inspirationalMessages.length)
		];

	// Get only the part of the destination before the first comma
	const primaryDestination = destination.split(",")[0].trim();

	// Function to copy the current URL to clipboard
	const copyLinkToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			// toast({
			// 	title: "Copied!",
			// 	description: "Link copied to clipboard",
			// 	duration: 1500,
			// });
		} catch (err) {
			console.error("Failed to copy link: ", err);
			// toast({
			// 	title: "Error",
			// 	description: "Could not copy the link to clipboard",
			// 	duration: 3000,
			// });
		}
	};

	// Function to share via Web Share API if available
	const shareViaWebShare = async () => {
		setIsSharing(true);

		try {
			if (navigator.share) {
				await navigator.share({
					title: `My trip to ${primaryDestination}`,
					text: `Check out my upcoming trip to ${primaryDestination}! I'll be traveling from ${formatDate(
						dates.startDate
					)} to ${formatDate(dates.endDate)}.`,
					url: window.location.href,
				});

				// toast({
				// 	title: "Shared!",
				// 	description: "Your trip has been shared",
				// 	duration: 1500,
				// });
			} else {
				// Fallback if Web Share API is not available
				copyLinkToClipboard();
			}
		} catch (err) {
			console.error("Error sharing: ", err);
			// toast({
			// 	title: "Sharing canceled",
			// 	description: "You canceled the share operation",
			// 	duration: 1500,
			// });
		} finally {
			setIsSharing(false);
		}
	};

	// Function to share to specific platforms
	const shareToSocial = (platform: string) => {
		const text = encodeURIComponent(
			`Check out my upcoming trip to ${primaryDestination}! I'll be traveling from ${formatDate(
				dates.startDate
			)} to ${formatDate(dates.endDate)}.`
		);
		const currentUrl = encodeURIComponent(window.location.href);

		let url = "";

		switch (platform) {
			case "twitter":
				url = `https://twitter.com/intent/tweet?text=${text}&url=${currentUrl}`;
				break;
			case "facebook":
				url = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${text}`;
				break;
			default:
				return;
		}

		window.open(url, "_blank", "width=600,height=400");

		// toast({
		// 	title: `Opened ${platform}`,
		// 	description: `Sharing to ${platform} in a new window`,
		// 	duration: 1500,
		// });
	};

	// Custom share handler that manages the built-in and custom share functionality
	const handleShare = () => {
		if (onShare) {
			// Use custom handler if provided
			onShare();
		} else {
			// Use built-in sharing if no custom handler
			shareViaWebShare();
		}
	};

	return (
		<div className="max-w-xl mx-auto h-full flex items-center justify-center">
			<motion.div
				ref={cardRef}
				className="relative w-full max-h-full retro-box border-primary/70 border-2 overflow-hidden crt-screen"
				transition={{ duration: 0.6 }}
				style={{ perspective: 1500, transformStyle: "preserve-3d" }}
			>
				{/* Front of the card */}
				<div
					className={`relative scanlines`}
					style={{ backfaceVisibility: "hidden" }}
				>
					{/* Background image with overlay */}
					<div className="absolute inset-0">
						<Image
							src={
								backgroundImages[
									Math.floor(Math.random() * backgroundImages.length)
								]
							}
							alt="Travel background"
							fill
							style={{ objectFit: "cover" }}
							priority
							className="transition-transform duration-500 hover:scale-105 filter brightness-90 grayscale-[30%]"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
					</div>

					{/* Content overlay */}
					<div className="relative flex flex-col p-6 text-white z-10 min-h-[500px]">
						{/* Header */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="mb-4"
						>
							<h4 className="text-sm uppercase tracking-wider text-primary-foreground/80 font-medium font-pixel">
								YOUR ADVENTURE AWAITS
							</h4>
							<h2 className="text-5xl font-bold mt-1 font-retro tracking-wide uppercase text-primary animate-glitch">
								{primaryDestination}
							</h2>
						</motion.div>

						{/* Trip dates */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="flex items-center mb-6 text-primary-foreground/90"
						>
							<Calendar className="h-5 w-5 mr-2 text-primary" />
							<div className="font-pixel">
								<div className="font-medium">
									{formatDate(dates.startDate)} - {formatDate(dates.endDate)}
								</div>
								<div className="text-sm opacity-80">
									{tripDuration} {tripDuration === 1 ? "DAY" : "DAYS"} JOURNEY
								</div>
							</div>
						</motion.div>

						{/* Activities section */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4 }}
							className="mb-auto"
						>
							<div className="flex items-center mb-3">
								<Scroll className="h-5 w-5 mr-2 text-primary" />
								<h3 className="text-lg font-semibold font-retro tracking-wide">
									PLANNED ACTIVITIES
								</h3>
							</div>
							<div className="grid grid-cols-2 gap-2 font-pixel">
								{activities.slice(0, 6).map((activity, index) => (
									<div
										key={index}
										className="flex items-center"
									>
										<div className="w-2 h-2 bg-primary mr-2 pixel-box"></div>
										<span className="text-sm">{activity}</span>
									</div>
								))}
								{activities.length > 6 && (
									<div className="flex items-center text-primary text-sm font-medium">
										+{activities.length - 6} MORE...
									</div>
								)}
							</div>
						</motion.div>

						{/* Inspirational message */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="mt-6 p-4 retro-box border-primary/50 border-2"
						>
							<div className="flex">
								<MessageCircle className="h-5 w-5 mr-3 text-primary shrink-0 mt-1" />
								<p className="text-sm font-pixel">&quot;{message}&quot;</p>
							</div>
						</motion.div>

						{/* Card actions */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
							className="mt-6 flex justify-end items-center"
						>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="text-white/90 hover:text-white hover:bg-white/10 font-pixel retro-button"
										disabled={isSharing}
									>
										<Share2 className="h-4 w-4 mr-2" />
										{isSharing ? "SHARING..." : "SHARE"}
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-56 p-2 retro-box border-2 border-primary/50"
									align="end"
									side="top"
								>
									<div className="flex flex-col gap-1.5">
										<Button
											variant="outline"
											size="sm"
											className="justify-start font-pixel retro-button border-primary/50"
											onClick={copyLinkToClipboard}
										>
											<Link className="h-4 w-4 mr-2" />
											COPY LINK
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="justify-start font-pixel retro-button border-primary/50"
											onClick={() => shareToSocial("twitter")}
										>
											<Twitter className="h-4 w-4 mr-2" />
											TWITTER
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="justify-start font-pixel retro-button border-primary/50"
											onClick={() => shareToSocial("facebook")}
										>
											<Facebook className="h-4 w-4 mr-2" />
											FACEBOOK
										</Button>
										<Button
											variant="default"
											size="sm"
											className="justify-start mt-1 bg-primary retro-button font-retro tracking-wide"
											onClick={handleShare}
										>
											<Share2 className="h-4 w-4 mr-2" />
											SHARE NOW
										</Button>
									</div>
								</PopoverContent>
							</Popover>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
