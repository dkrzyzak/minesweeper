export interface Block {
	x: number;
	y: number;
	hasBomb: boolean;
	bombsAround?: number;
	isExposed: boolean;
	isFlagged: boolean;
}

export interface Point {
	x: number;
	y: number;
}

export const neighborsVector: Point[] = [
	{ x: -1, y: -1 },
	{ x: -1, y: 0 },
	{ x: -1, y: 1 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: -1 },
	{ x: 1, y: 0 },
	{ x: 1, y: 1 },
];

export const directNeighborsVector: Point[] = [
	{ x: -1, y: 0 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: 0 },
];
