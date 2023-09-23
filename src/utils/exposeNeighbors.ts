import { type Block, directNeighborsVector } from './constants';

interface Coords {
	x: number;
	y: number;
}

const getNeighbors = (point: Coords) => {
	const neighbors: Coords[] = directNeighborsVector.map((vector) => ({
		x: point.x + vector.x,
		y: point.y + vector.y,
	}));

	return neighbors;
};

const wasVisited = (point: Coords, visitedArray: Coords[]) =>
	visitedArray.some(
		(visitedBlock) => visitedBlock.x === point.x && visitedBlock.y === point.y
	);

export const exposeNeighbors = (emptyBlock: Block, grid: Block[][]) => {
	const visitedBlocks: Coords[] = [{ x: emptyBlock.x, y: emptyBlock.y }];
	const queuedBlocks: Coords[] = getNeighbors(emptyBlock);

	while (queuedBlocks.length > 0) {
		const neighborBlock = queuedBlocks.pop()!;

		if (wasVisited(neighborBlock, visitedBlocks)) {
			continue;
		}

		// try-catch block to prevent error when X or Y index is out of range
		try {
			// we expose every point that made its way to queuedBlocks and exists on the board
			grid[neighborBlock.x][neighborBlock.y].isExposed = true;
			visitedBlocks.push(neighborBlock);
		} catch {
			continue;
		}

		// if the point has no bombs around, we are queueing all its neighbors to be exposed as well
		// if the point have some bombs around we still expose it, but we don't expose its neighbours (cause there could be bomb)
		if (grid[neighborBlock.x][neighborBlock.y].bombsAround === 0) {
			const neighbors = getNeighbors(neighborBlock);
			neighbors.forEach((neighbor) => {
				if (!wasVisited(neighbor, visitedBlocks)) {
					queuedBlocks.push(neighbor);
				}
			});
		}
	}
};
