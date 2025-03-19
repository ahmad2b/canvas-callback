export interface Canvas<T = any> {
	id: string;
	type: string;
	data?: T;
}

export interface CanvasState<T = any> {
	content: Canvas<T>[];
	is_open: boolean;
}

export type ImageAttachment = {
	base64: string;
	name: string;
	type: string;
	displayUrl: string;
};

export type AgentState = {
	destination?: string;
	dates?: string;
	activities?: string[];
	trips?: string;
};
