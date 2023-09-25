import { writable, get } from 'svelte/store';
import { generateBoard } from '../logic/generateBoard';
import { gameStatus } from './gameStatusStore';
import { exposeNeighbors } from '../logic/exposeNeighbors';
import type { Block } from '../utils/constants';
import { remainingFlags } from './remainingFlagsStore';
import { initialBombsCount, initialXSize, initialYSize } from './constants';

export const gridSize = writable<[number, number]>([initialXSize, initialYSize]);
export const gridInstanceId = writable(-1);

export const grid = writable<Block[][]>(
	generateBoard(initialXSize, initialYSize, initialBombsCount)
);

export const emptyFieldsRemaining = writable(
	initialXSize * initialYSize - initialBombsCount
);

export const generateNewGrid = (xSize: number, ySize: number, bombsCount: number) => {
	grid.set(generateBoard(xSize, ySize, bombsCount));
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
		return;
	}

	const isFlagged = block.isFlagged;
	grid.update((gridValue) => {
		gridValue[block.x][block.y].isFlagged = !block.isFlagged;
		remainingFlags.update((flagsCount) =>
			isFlagged ? flagsCount + 1 : flagsCount - 1
		);
		return gridValue;
	});
};
