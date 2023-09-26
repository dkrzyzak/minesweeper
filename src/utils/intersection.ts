import type { Point } from './constants';

export const intersection = (points1: Point[], points2: Point[]) =>
	points1.filter((point1) =>
		points2.find((point2) => point2.x === point1.x && point2.y === point1.y)
	);
