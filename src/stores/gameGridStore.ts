import { writable, get } from 'svelte/store';
import { generateBoard } from '../logic/generateBoard';
import { gameStatus } from './gameStatusStore';
import { exposeNeighbors } from '../logic/exposeNeighbors';
import type { Block, Point } from '../utils/constants';
import { initialBombsCount, initialXSize, initialYSize } from './constants';
import { intersection } from '../utils/intersection';

export const gridSize = writable<[number, number]>([initialXSize, initialYSize]);
export const gridInstanceId = writable(-1);

const { board: initialBoard, bombsCoords: initialBombsCoords } = generateBoard(
	initialXSize,
	initialYSize,
	initialBombsCount
);
export const grid = writable<Block[][]>(initialBoard);
export const bombsCoords = writable<Point[]>(initialBombsCoords);
export const flagsCoords = writable<Point[]>([]);
export const remainingFlags = writable(initialBombsCount);
export const emptyFieldsRemaining = writable(
	initialXSize * initialYSize - initialBombsCount
);

export const generateNewGrid = (xSize: number, ySize: number, bombsCount: number) => {
	const { board: generatedBoard, bombsCoords: generatedBombsCoords } = generateBoard(
		xSize,
		ySize,
		bombsCount
	);
	grid.set(generatedBoard);
	bombsCoords.set(generatedBombsCoords);
	flagsCoords.set([]);
	gridSize.set([xSize, ySize]);
	gameStatus.set('before');
	remainingFlags.set(bombsCount);
	emptyFieldsRemaining.set(xSize * ySize - bombsCount);
	gridInstanceId.update((value) => value + 1);
};

export const handleLeftClick = (block: Block) => {
	if (get(gameStatus) === 'before') {
		gameStatus.set('during');
	}

	if (block.isFlagged) {
		return;
	}

	grid.update((gridValue) => {
		gridValue[block.x][block.y].isExposed = true;
		return gridValue;
	});

	emptyFieldsRemaining.update((value) => value - 1);

	if (block.hasBomb) {
		gameStatus.set('lost');
	}

	if (block.bombsAround === 0) {
		// expose all neighbors with 0 bombs around
		const exposedNeighborsCount = exposeNeighbors(block, get(grid));
		emptyFieldsRemaining.update((value) => value - exposedNeighborsCount);
	}
};

export const handleRightClick = (block: Block) => {
	if (block.isExposed) {
		return;
	}

	if (get(remainingFlags) < 1) {
		if (!get(grid)[block.x][block.y].isFlagged) {
			return;
		}
	}

	const isFlagged = block.isFlagged;
	grid.update((gridValue) => {
		gridValue[block.x][block.y].isFlagged = !block.isFlagged;
		if (isFlagged) {
			// add one flag to total amount of flags left
			remainingFlags.update((flagsCount) => flagsCount + 1);

			// filter out selected flag from flagsCoords
			flagsCoords.update((prevFlags) =>
				prevFlags.filter((point) => !(point.x === block.x && point.y === block.y))
			);
		} else {
			// remove one flag from total amount of flags left
			remainingFlags.update((flagsCount) => flagsCount - 1);

			// add selected flag to flagsCoords
			flagsCoords.update((prevFlags) => [...prevFlags, { x: block.x, y: block.y }]);
		}

		return gridValue;
	});
};
