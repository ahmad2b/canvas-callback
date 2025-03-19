"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Command, Interrupt } from "@langchain/langgraph-sdk";
import { motion } from "framer-motion";
import {
	Check,
	ChevronLeft,
	ChevronRight,
	Landmark,
	Map,
	Mountain,
	LibraryIcon as Museum,
	Music,
	ShoppingBag,
	TreesIcon as Tree,
	Users,
	Utensils,
	Waves,
	X,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export interface ActivitySelectorProps {
	interrupt: Interrupt;
	onSubmit?: (command: Command) => void;
}

// Enhanced activity data with rich details
const activityData = [
	{
		id: "museums",
		name: "Museums and culture",
		image:
			"https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&q=80&w=1000",
		icon: Museum,
		color: "from-primary",
		description:
			"Immerse yourself in local art, history, and cultural exhibits",
		mood: "Inspiring and enlightening",
		sound: "Quiet contemplation with occasional tour guide voices",
	},
	{
		id: "outdoor",
		name: "Outdoor adventures",
		image:
			"https://images.unsplash.com/photo-1559521783-1d1599583485?auto=format&fit=crop&q=80&w=1000",
		icon: Mountain,
		color: "from-primary/90",
		description: "Feel the adrenaline rush of exciting outdoor activities",
		mood: "Exhilarating and energizing",
		sound: "Wind rushing past, excited voices, and nature's call",
	},
	{
		id: "beaches",
		name: "Beaches and water activities",
		image:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
		icon: Waves,
		color: "from-primary/80",
		description: "Feel the sand between your toes and the refreshing water",
		mood: "Relaxing and rejuvenating",
		sound: "Gentle waves lapping at the shore, seagulls calling",
	},
	{
		id: "hiking",
		name: "Hiking and nature",
		image:
			"https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1000",
		icon: Tree,
		color: "from-primary/95",
		description: "Breathe in the fresh air as you explore natural wonders",
		mood: "Peaceful and grounding",
		sound: "Rustling leaves, birdsong, and the crunch of the trail",
	},
	{
		id: "food",
		name: "Food and culinary experiences",
		image:
			"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000",
		icon: Utensils,
		color: "from-primary",
		description: "Savor the flavors and aromas of local cuisine",
		mood: "Delightful and satisfying",
		sound: "Sizzling pans, clinking glasses, and happy conversation",
	},
	{
		id: "shopping",
		name: "Shopping",
		image:
			"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=1000",
		icon: ShoppingBag,
		color: "from-primary/70",
		description: "Hunt for treasures and unique items to remember your trip",
		mood: "Exciting and rewarding",
		sound: "Bustling markets, rustling bags, and street performers",
	},
	{
		id: "historical",
		name: "Historical sites",
		image:
			"https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&q=80&w=1000",
		icon: Landmark,
		color: "from-primary/95",
		description: "Step back in time and connect with the past",
		mood: "Fascinating and thought-provoking",
		sound: "Echoing footsteps in ancient halls and whispers of history",
	},
	{
		id: "tours",
		name: "Local tours",
		image:
			"https://images.unsplash.com/photo-1520998116484-6eeb2f72b5b9?auto=format&fit=crop&q=80&w=1000",
		icon: Map,
		color: "from-primary/85",
		description:
			"See the destination through the eyes of those who know it best",
		mood: "Informative and authentic",
		sound: "Enthusiastic guides sharing stories and local secrets",
	},
	{
		id: "nightlife",
		name: "Nightlife",
		image:
			"https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=1000",
		icon: Music,
		color: "from-primary/90",
		description: "Experience the energy and excitement after dark",
		mood: "Vibrant and lively",
		sound: "Pulsing music, laughter, and the buzz of conversation",
	},
	{
		id: "family",
		name: "Family-friendly activities",
		image:
			"https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&q=80&w=1000",
		icon: Users,
		color: "from-primary/80",
		description:
			"Create memories that everyone from kids to grandparents will cherish",
		mood: "Joyful and heartwarming",
		sound: "Children's laughter, playful shouts, and family chatter",
	},
];

export function ActivitySelector({
	interrupt,
	onSubmit,
}: ActivitySelectorProps) {
	const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
	const horizontalScrollRef = useRef<HTMLDivElement>(null);

	// Extract the question from interrupt data
	const data =
		(interrupt?.value as any)?.data ||
		"What activities would you like to experience?";

	const toggleActivity = (activity: string) => {
		setSelectedActivities((current) =>
			current.includes(activity)
				? current.filter((a) => a !== activity)
				: [...current, activity]
		);
	};

	const handleSubmit = () => {
		if (selectedActivities.length > 0 && onSubmit) {
			const payload: Command = {
				goto: undefined,
				resume: {
					activities: selectedActivities,
				},
				update: {},
			};
			onSubmit(payload);
		}
	};

	const scrollHorizontal = (direction: "left" | "right") => {
		if (horizontalScrollRef.current) {
			const { current } = horizontalScrollRef;
			const scrollAmount = current.clientWidth * 0.8;

			if (direction === "left") {
				current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
			} else {
				current.scrollBy({ left: scrollAmount, behavior: "smooth" });
			}
		}
	};

	return (
		<div className="w-full glass-panel border border-primary/30 py-6 px-4 relative overflow-hidden rounded-xl shadow-md">
			{/* Subtle gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/5 pointer-events-none"></div>

			<div className="relative z-10">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
					<div>
						<h2 className="text-xl md:text-2xl font-bold font-retro text-primary tracking-wide">
							{data}
						</h2>
						<p className="text-sm text-primary/70 mt-1">
							Select the experiences that resonate with you
						</p>
					</div>
				</div>

				{/* Horizontal Scroll View */}
				<motion.div
					key="horizontal-view"
					initial={{ opacity: 0, x: 10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3 }}
					className="relative mb-6"
				>
					{/* Navigation buttons */}
					<div className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 p-2 h-full flex flex-col justify-center items-center">
						<Button
							variant="secondary"
							size="icon"
							className="rounded-full shadow-md h-8 w-8 bg-background/80 backdrop-blur-sm"
							onClick={() => scrollHorizontal("left")}
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Scroll left</span>
						</Button>
					</div>

					<div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 p-2 h-full flex flex-col justify-center items-center">
						<Button
							variant="secondary"
							size="icon"
							className="rounded-full shadow-md h-8 w-8 bg-background/80 backdrop-blur-sm"
							onClick={() => scrollHorizontal("right")}
						>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Scroll right</span>
						</Button>
					</div>

					<div
						ref={horizontalScrollRef}
						className="flex gap-4 overflow-x-auto pb-4 px-4 mx-4 py-2 snap-x snap-mandatory scrollbar-hide"
						style={{
							scrollbarWidth: "none",
							msOverflowStyle: "none",
							maxHeight: "400px",
						}}
					>
						{activityData.map((activity) => {
							const isSelected = selectedActivities.includes(activity.name);
							const Icon = activity.icon;

							return (
								<motion.div
									key={activity.id}
									layoutId={`card-${activity.id}-horizontal`}
									className={cn(
										"relative flex-shrink-0 w-[280px] snap-start overflow-hidden retro-card border transition-all duration-300 rounded-xl",
										isSelected
											? "ring-1 ring-primary shadow-md border-primary/50"
											: "hover:border-primary/30"
									)}
									onClick={() => toggleActivity(activity.name)}
									whileHover={{ scale: 1.02, y: -2 }}
									transition={{ type: "spring", stiffness: 400, damping: 25 }}
								>
									<div className="relative h-40 w-full">
										<div className="absolute inset-0 bg-black/10 z-10"></div>
										<Image
											src={activity.image}
											alt={activity.name}
											fill
											className="object-cover"
										/>
										<div
											className={cn(
												"absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20",
												`${activity.color}/20`
											)}
										></div>

										{/* Selection indicator */}
										<div className="absolute top-2 right-2 z-30">
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: isSelected ? 1 : 0 }}
												className="bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg"
											>
												<Check className="h-4 w-4" />
											</motion.div>
										</div>

										{/* Activity icon */}
										<div className="absolute top-2 left-2 z-30">
											<motion.div
												className={cn(
													"rounded-full p-2 backdrop-blur-sm",
													isSelected
														? "bg-primary text-primary-foreground"
														: "bg-background/20"
												)}
												whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
												transition={{ duration: 0.5 }}
											>
												<Icon className="h-4 w-4" />
											</motion.div>
										</div>

										<div className="absolute bottom-0 left-0 right-0 p-4 text-white z-30">
											<h3 className="font-medium text-lg font-retro">
												{activity.name}
											</h3>
										</div>
									</div>

									<div className="p-4 bg-card/90">
										<p className="text-sm text-foreground/80 mb-3">
											{activity.description}
										</p>

										{/* Always visible content */}
										<div className="space-y-2 text-xs border-t border-primary/20 pt-2 mb-3">
											<p>
												<span className="font-medium text-primary">Feel:</span>{" "}
												{activity.mood}
											</p>
											<p>
												<span className="font-medium text-primary">Hear:</span>{" "}
												{activity.sound}
											</p>
										</div>

										<Button
											variant={isSelected ? "secondary" : "default"}
											size="sm"
											className={cn(
												"mt-3 w-full transition-all rounded-md",
												isSelected
													? "bg-primary/10 hover:bg-primary/20 text-primary"
													: ""
											)}
											onClick={(e) => {
												e.stopPropagation();
												toggleActivity(activity.name);
											}}
										>
											{isSelected ? (
												<>
													<Check className="h-3.5 w-3.5 mr-1" />
													Selected
												</>
											) : (
												"Select"
											)}
										</Button>
									</div>
								</motion.div>
							);
						})}
					</div>
				</motion.div>

				{/* Selected activities summary */}
				<div className="mb-4 border-t border-primary/20 pt-4">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-sm font-medium font-retro text-primary">
							{selectedActivities.length === 0
								? "No activities selected yet"
								: `${selectedActivities.length} ${
										selectedActivities.length === 1 ? "activity" : "activities"
								  } selected`}
						</h3>

						{selectedActivities.length > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setSelectedActivities([])}
								className="h-7 text-xs hover:bg-destructive/10 hover:text-destructive"
							>
								Clear all
							</Button>
						)}
					</div>

					{selectedActivities.length > 0 && (
						<motion.div
							className="flex flex-wrap gap-2"
							initial="hidden"
							animate="visible"
							variants={{
								visible: {
									transition: {
										staggerChildren: 0.05,
									},
								},
							}}
						>
							{selectedActivities.map((activity) => {
								const activityDataFound = activityData.find(
									(a) => a.name === activity
								);
								const Icon = activityDataFound?.icon || Museum;

								return (
									<motion.div
										key={activity}
										className="bg-background glass-panel border border-primary/20 px-2 py-1 flex items-center gap-1 rounded-full"
										variants={{
											hidden: { opacity: 0, scale: 0.8 },
											visible: { opacity: 1, scale: 1 },
										}}
										whileHover={{ scale: 1.05 }}
									>
										<Icon className="h-3 w-3 text-primary" />
										<span className="text-xs">{activity}</span>
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleActivity(activity);
											}}
											className="ml-1 text-muted-foreground hover:text-destructive rounded-full hover:bg-destructive/10 p-0.5"
											aria-label={`Remove ${activity}`}
										>
											<X className="h-3 w-3" />
										</button>
									</motion.div>
								);
							})}
						</motion.div>
					)}
				</div>

				{/* Submit button */}
				<div className="flex justify-end">
					<Button
						onClick={handleSubmit}
						disabled={selectedActivities.length === 0}
						size="sm"
						className={cn(
							"px-4 transition-all duration-300 retro-button font-retro",
							selectedActivities.length > 0
								? "bg-primary hover:bg-primary/90 hover:scale-105"
								: "bg-muted"
						)}
					>
						{selectedActivities.length === 0
							? "Select activities"
							: `Confirm ${selectedActivities.length} ${
									selectedActivities.length === 1 ? "activity" : "activities"
							  }`}
					</Button>
				</div>
			</div>
		</div>
	);
}
