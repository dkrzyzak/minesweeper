export interface Block {
	x: number;
	y: number;
	hasBomb: boolean;
	bombsAround?: number;
	isExposed: boolean;
	isFlagged: boolean;
}

export interface Coords {
	x: number;
	y: number;
}

export const neighborsVector: Coords[] = [
	{ x: -1, y: -1 },
	{ x: -1, y: 0 },
	{ x: -1, y: 1 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: -1 },
	{ x: 1, y: 0 },
	{ x: 1, y: 1 },
];

export const directNeighborsVector: Coords[] = [
	{ x: -1, y: 0 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: 0 },
];
