import { neighborsVector, type Block, type Point } from '../utils/constants';

export const generateBoard = (xSize: number, ySize: number, bombsCount: number) => {
	if (xSize < 1 || ySize < 1) {
		throw new Error('Invalid board size');
	}

	const area = xSize * ySize;
	if (bombsCount > area) {
		// TODO: uspójnić mechanizm errorów lub się go pozbyć
		throw new TooMuchBombsError();
	}

	// generate empty xSize x ySize board
	const board: Block[][] = [];
	const bombsCoords: Point[] = [];

	for (let x = 0; x < xSize; x++) {
		const rowArray: Block[] = [];
		for (let y = 0; y < ySize; y++) {
			rowArray.push({
				x,
				y,
				hasBomb: false,
				isExposed: false,
				isFlagged: false,
			});
		}

		board.push(rowArray);
	}

	// fill the board randomly with bombs
	for (let bombsLeft = bombsCount; bombsLeft--; bombsCount === 0) {
		let randomX: number, randomY: number;
		do {
			// generate new random coordinates
			randomX = Math.floor(Math.random() * xSize);
			randomY = Math.floor(Math.random() * ySize);
		} while (board[randomX][randomY].hasBomb);

		board[randomX][randomY].hasBomb = true;
		bombsCoords.push({ x: randomX, y: randomY });
	}

	// create labels for blocks (how many bombs are around each of them)

	for (let x = 0; x < xSize; x++) {
		for (let y = 0; y < ySize; y++) {
			// skip checking if block has bomb
			if (board[x][y].hasBomb) {
				continue;
			}

			let bombsAround = 0;

			neighborsVector.forEach((vector) => {
				// try block to prevent error if index is out of range
				try {
					if (board[x + vector.x][y + vector.y].hasBomb) {
						bombsAround++;
					}
				} catch {}
			});

			board[x][y].bombsAround = bombsAround;
		}
	}

	return { board, bombsCoords };
};
