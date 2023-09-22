interface Block {
	x: number;
	y: number;
	hasBomb: boolean;
	bombsAround?: number;
}

export const generateBoard = (xSize: number, ySize: number, bombsCount: number) => {
	if (xSize < 1 || ySize < 1) {
		throw new Error('Invalid board size');
	}

	const area = xSize * ySize;
	if (bombsCount > area) {
		throw new TooMuchBombsError();
	}

	// generate empty xSize x ySize board
	const board: Block[][] = [];

	for (let x = 0; x < xSize; x++) {
		const rowArray = [];
		for (let y = 0; y < ySize; y++) {
			rowArray.push({
				x,
				y,
				hasBomb: false,
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
	}

	// create labels for blocks (how many bombs are around each of them)
	const checkVector = [
		{ x: -1, y: -1 },
		{ x: -1, y: 0 },
		{ x: -1, y: 1 },
		{ x: 0, y: -1 },
		{ x: 0, y: 1 },
		{ x: 1, y: -1 },
		{ x: 1, y: 0 },
		{ x: 1, y: 1 },
	];

	for (let x = 0; x < xSize; x++) {
		for (let y = 0; y < ySize; y++) {
			if (board[x][y].hasBomb) {
				continue;
			}

			let bombsAround = 0;

			checkVector.forEach((vector) => {
				try {
					if (board[x + vector.x][y + vector.y].hasBomb) {
						bombsAround++;
					}
				} catch {}
			});

			board[x][y].bombsAround = bombsAround;
		}
	}

	return board;
};
