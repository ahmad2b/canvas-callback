"use client";

import { addDays, format, isSameDay, isToday, startOfMonth } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DateRangePickerProps {
	dateRange: DateRange | undefined;
	onDateRangeChange: (range: DateRange | undefined) => void;
	showCompactCalendar?: boolean;
	className?: string;
	align?: "center" | "start" | "end";
	numberOfMonths?: number;
}

export function DateRangePicker({
	dateRange,
	onDateRangeChange,
	showCompactCalendar = false,
	className,
	align = "start",
	numberOfMonths = 2,
}: DateRangePickerProps) {
	const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

	// Predefined ranges
	const predefinedRanges = [
		{
			name: "Today",
			range: {
				from: new Date(),
				to: new Date(),
			},
		},
		{
			name: "Next weekend",
			range: {
				from: (() => {
					const today = new Date();
					const day = today.getDay(); // 0 is Sunday, 6 is Saturday
					const daysUntilFriday = day <= 5 ? 5 - day : 5 - day + 7;
					return addDays(today, daysUntilFriday);
				})(),
				to: (() => {
					const today = new Date();
					const day = today.getDay(); // 0 is Sunday, 6 is Saturday
					const daysUntilSunday = day <= 6 ? 7 - day : 7 - day + 7;
					return addDays(today, daysUntilSunday);
				})(),
			},
		},
		{
			name: "Next week",
			range: {
				from: addDays(new Date(), 7),
				to: addDays(new Date(), 13),
			},
		},
		{
			name: "Next month",
			range: {
				from: startOfMonth(addDays(new Date(), 30)),
				to: (() => {
					const nextMonth = addDays(new Date(), 30);
					const startOfNextMonth = startOfMonth(nextMonth);
					return addDays(startOfNextMonth, 6);
				})(),
			},
		},
	];

	// Format the selected date range for display
	const formatDateRange = () => {
		if (!dateRange?.from) {
			return "Select dates";
		}

		if (dateRange.to) {
			if (isSameDay(dateRange.from, dateRange.to)) {
				return format(dateRange.from, "MMM d, yyyy");
			}
			return `${format(dateRange.from, "MMM d, yyyy")} - ${format(
				dateRange.to,
				"MMM d, yyyy"
			)}`;
		}

		return format(dateRange.from, "MMM d, yyyy");
	};

	// If we're showing the compact calendar, render it directly without popover
	if (!showCompactCalendar) {
		return (
			<Popover
				open={isCalendarOpen}
				onOpenChange={setIsCalendarOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-full justify-start text-left font-normal h-14",
							!dateRange && "text-muted-foreground",
							className
						)}
					>
						<CalendarIcon className="mr-2 h-5 w-5" />
						<span>{formatDateRange()}</span>
						{dateRange?.from && isToday(dateRange.from) && (
							<span className="ml-auto rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
								Today
							</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto p-0 shadow-lg border border-gray-200"
					align={align}
				>
					<div className="flex flex-col md:flex-row md:divide-x divide-gray-200">
						<div className="p-3 space-y-3 border-b md:border-b-0">
							<h3 className="text-sm font-medium">Quick select</h3>
							<div className="grid gap-2">
								{predefinedRanges.map((range) => (
									<Button
										key={range.name}
										variant="outline"
										size="sm"
										className="justify-start text-left"
										onClick={() => {
											onDateRangeChange(range.range);
											setIsCalendarOpen(false);
										}}
									>
										{range.name}
									</Button>
								))}
							</div>
						</div>
						<div>
							<Calendar
								initialFocus
								mode="range"
								defaultMonth={dateRange?.from}
								selected={dateRange}
								onSelect={onDateRangeChange}
								numberOfMonths={numberOfMonths}
								showOutsideDays={false}
								className="p-3"
							/>
						</div>
					</div>
					<div className="p-3 border-t flex justify-end space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								onDateRangeChange(undefined);
								setIsCalendarOpen(false);
							}}
						>
							Clear
						</Button>
						<Button
							size="sm"
							onClick={() => {
								setIsCalendarOpen(false);
							}}
						>
							Done
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		);
	}

	// Compact calendar view (no popover)
	return (
		<div className={cn("space-y-4", className)}>
			<div className="border rounded-lg overflow-hidden shadow-md">
				<div className="p-4 bg-primary/5 border-b">
					<h3 className="text-base font-medium">Select Date Range</h3>
					<p className="text-sm text-muted-foreground mt-1">
						{formatDateRange()}
					</p>
				</div>

				<Calendar
					mode="range"
					defaultMonth={dateRange?.from || new Date()}
					selected={dateRange}
					onSelect={onDateRangeChange}
					numberOfMonths={numberOfMonths}
					showOutsideDays={false}
					className="p-3"
				/>
			</div>

			<div className="grid grid-cols-2 gap-2">
				{predefinedRanges.map((range) => (
					<Button
						key={range.name}
						variant="outline"
						size="sm"
						className="text-sm"
						onClick={() => onDateRangeChange(range.range)}
					>
						{range.name}
					</Button>
				))}
			</div>
		</div>
	);
}
