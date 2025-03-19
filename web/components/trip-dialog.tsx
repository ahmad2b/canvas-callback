"use client";

import { TripCard, TripData } from "@/components/trip-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface TripDialogProps {
	trip: TripData | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function TripDialog({ trip, open, onOpenChange }: TripDialogProps) {
	if (!trip) return null;

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden bg-transparent border-none shadow-none">
				<div className="absolute right-4 top-4 z-50">
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm rounded-full border border-white/10 shadow-md hover:scale-105 transition-all duration-200"
						onClick={() => onOpenChange(false)}
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
				<div className="overflow-auto max-h-[90vh]  shadow-none">
					<TripCard trip={trip} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
