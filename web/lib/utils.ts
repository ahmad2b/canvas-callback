import { TripData } from "@/components/trip-card";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const converToBase64 = async (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

/**
 * Extracts interrupt data from a thread if it exists
 * @param thread The thread object that might contain interrupt data
 * @returns The first interrupt data object if found, otherwise undefined
 */
export function extractInterruptData(thread: any): any {
	// Check if thread and interrupts exist
	if (!thread || !thread.interrupts) {
		return undefined;
	}

	try {
		// Get the first interrupt key
		const interruptKeys = Object.keys(thread.interrupts);

		if (interruptKeys.length === 0) {
			return undefined;
		}

		// Get the first interrupt entry
		const firstKey = interruptKeys[0];
		const interruptArray = thread.interrupts[firstKey];

		// Return the first interrupt data if it exists
		if (Array.isArray(interruptArray) && interruptArray.length > 0) {
			return interruptArray[0];
		}

		return undefined;
	} catch (error) {
		console.error("Error extracting interrupt data:", error);
		return undefined;
	}
}

export const createTripData = (tripState: any): TripData | null => {
	if (!tripState) return null;

	return {
		destination: tripState.destination?.destination || "",
		dates: {
			startDate: tripState.dates?.startDate || "",
			endDate: tripState.dates?.endDate || "",
		},
		activities: tripState.activities?.activities || [],
	};
};
