"use client";

import type { Command, Interrupt } from "@langchain/langgraph-sdk";
import { differenceInDays, format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export interface DateSelectorProps {
	interrupt: Interrupt;
	onSubmit?: (command: Command) => void;
}

export function DateSelector({ interrupt, onSubmit }: DateSelectorProps) {
	const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
	const [numberOfMonths, setNumberOfMonths] = useState(2);

	// Extract the question from interrupt data
	const data =
		(interrupt?.value as any)?.data || "When would you like to travel?";

	// Calculate trip duration
	const tripDuration =
		dateRange?.from && dateRange?.to
			? differenceInDays(dateRange.to, dateRange.from) + 1
			: 0;

	// Handle responsive calendar
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setNumberOfMonths(1);
			} else {
				setNumberOfMonths(2);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleSubmit = () => {
		if (dateRange?.from) {
			if (onSubmit) {
				const payload: Command = {
					goto: undefined,
					resume: {
						dates: {
							startDate: dateRange.from.toISOString().split("T")[0],
							endDate: dateRange.to
								? dateRange.to.toISOString().split("T")[0]
								: dateRange.from.toISOString().split("T")[0],
						},
					},
					update: {},
				};
				onSubmit(payload);
			}
		}
	};

	return (
		<div className="w-fit pt-6 pb-4 px-4 md:px-6 relative overflow-hidden glass-panel bg-background/60 border border-primary/30 rounded-xl shadow-md">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.01)_0%,rgba(0,0,0,0.03)_50%,rgba(0,0,0,0.01)_100%)] pointer-events-none"></div>

			<div className="max-w-5xl mx-auto relative z-10">
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-6"
				>
					<motion.h2
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-2 font-retro text-primary"
					>
						<CalendarIcon className="h-6 w-6 text-primary" />
						{data}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="text-sm text-muted-foreground max-w-xl mx-auto"
					>
						Select your travel dates by clicking on the calendar. Click once for
						your arrival date, then click again for your departure date.
					</motion.p>
				</motion.div>

				{/* Large Calendar */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="bg-card/70 border border-primary/20 rounded-xl shadow-sm backdrop-blur-sm overflow-hidden mb-6"
				>
					<Calendar
						mode="range"
						selected={dateRange}
						onSelect={setDateRange}
						numberOfMonths={numberOfMonths}
						fromDate={new Date()}
						modifiersStyles={{
							selected: {
								backgroundColor: "hsl(var(--primary))",
								color: "hsl(var(--primary-foreground))",
								fontWeight: "600",
								borderRadius: "4px",
							},
							today: {
								border: "1px solid hsl(var(--primary))",
								color: "hsl(var(--primary))",
								fontWeight: "600",
							},
							range_start: {
								backgroundColor: "hsl(var(--primary))",
								color: "hsl(var(--primary-foreground))",
								fontWeight: "600",
								borderRadius: "4px 0 0 4px",
							},
							range_end: {
								backgroundColor: "hsl(var(--primary))",
								color: "hsl(var(--primary-foreground))",
								fontWeight: "600",
								borderRadius: "0 4px 4px 0",
							},
							range_middle: {
								backgroundColor: "hsl(var(--primary) / 0.1)",
							},
						}}
						styles={{
							caption_label: {
								fontSize: "1.1rem",
								fontWeight: 600,
								fontFamily: "var(--font-retro)",
								color: "hsl(var(--primary))",
							},
							day: {
								margin: "0",
								width: "2.5rem",
								height: "2.5rem",
								fontSize: "0.95rem",
								transition: "all 0.15s ease-in-out",
							},
							head_cell: {
								color: "var(--muted-foreground)",
								fontWeight: "600",
								fontSize: "0.9rem",
							},
							month: {
								border: "1px solid hsl(var(--border))",
								borderRadius: "6px",
								padding: "12px",
								backgroundColor: "hsl(var(--card))",
								marginBottom: "8px",
								boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
							},
						}}
						className="p-2"
					/>
				</motion.div>

				{/* Selected date summary */}
				{dateRange?.from && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="glass-panel border border-primary/20 p-4 mb-6 text-center rounded-lg shadow-sm"
					>
						<div className="font-medium">
							{dateRange.to && dateRange.from !== dateRange.to ? (
								<>
									<span className="text-primary font-bold">
										{format(dateRange.from, "MMMM d, yyyy")}
									</span>
									<span className="mx-2">to</span>
									<span className="text-primary font-bold">
										{format(dateRange.to, "MMMM d, yyyy")}
									</span>
									<div className="text-muted-foreground mt-1">
										{tripDuration} {tripDuration === 1 ? "day" : "days"} total
									</div>
								</>
							) : (
								<>
									<span className="text-primary font-bold">
										{format(dateRange.from, "MMMM d, yyyy")}
									</span>
									<div className="text-muted-foreground mt-1">Single day</div>
								</>
							)}
						</div>
					</motion.div>
				)}

				{/* Submit button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className="flex justify-center"
				>
					<button
						onClick={handleSubmit}
						disabled={!dateRange?.from}
						className={cn(
							"retro-button px-8 py-3 font-retro tracking-wide transition-all rounded-md",
							!dateRange?.from && "opacity-50 cursor-not-allowed"
						)}
					>
						{!dateRange?.from
							? "Select dates first"
							: dateRange.to && dateRange.from !== dateRange.to
							? `Confirm ${tripDuration}-day Trip`
							: "Confirm Single Day"}
					</button>
				</motion.div>
			</div>
		</div>
	);
}
