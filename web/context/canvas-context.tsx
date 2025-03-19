"use client";

import { CanvasState } from "@/types";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";

export interface UseCanvasReturn {
	isOpen: boolean;
	isLoading: boolean;
	closeCanvas: () => void;
	toggleCanvas: () => void;
	setLoading: (loading: boolean) => void;
	canvasState: CanvasState | undefined;
	setCanvasState: (canvas: CanvasState) => void;
}

// Create the context with the same shape as the hook return value
const CanvasContext = createContext<UseCanvasReturn | undefined>(undefined);

interface CanvasProviderProps {
	children: ReactNode;
}

export function CanvasProvider({ children }: CanvasProviderProps) {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		content: [],
		is_open: false,
	});
	const [isLoading, setLoading] = useState(false);

	const toggleCanvas = useCallback(() => {
		setCanvasState((prev) => ({
			...prev,
			is_open: !prev.is_open,
		}));
	}, []);

	const closeCanvas = useCallback(() => {
		setCanvasState((prev) => ({
			...prev,
			is_open: false,
		}));
	}, []);

	// Create the value object with the same structure as the original hook
	const value: UseCanvasReturn = {
		isOpen: canvasState.is_open,
		isLoading,
		closeCanvas,
		toggleCanvas,
		setLoading,
		canvasState,
		setCanvasState,
	};

	return (
		<CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
	);
}

// useCanvasContext remains the same
export function useCanvasContext() {
	const context = useContext(CanvasContext);

	if (context === undefined) {
		throw new Error("useCanvasContext must be used within a CanvasProvider");
	}

	return context;
}
