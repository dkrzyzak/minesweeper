import { get, writable } from 'svelte/store';
import {
	bombsCoords,
	emptyFieldsRemaining,
	flagsCoords,
	grid,
	remainingFlags,
} from './gameGridStore';

export type GameStatus = 'before' | 'during' | 'won' | 'lost';

export const gameStatus = writable<GameStatus>('before');

emptyFieldsRemaining.subscribe((emptyFields) => {
	console.log(emptyFields);

	if (emptyFields === 0) {
		// we check for any not-flagged fields
		const $bombsCoords = get(bombsCoords);
		const $flagsCoords = get(flagsCoords);
		if ($bombsCoords.length !== $flagsCoords.length) {
			const unflaggedFields = $bombsCoords.filter(
				(pointWithBomb) =>
					!$flagsCoords.find((pointWithFlag) => {
						return (
							pointWithBomb.x === pointWithFlag.x &&
							pointWithBomb.y === pointWithFlag.y
						);
					})
			);

			grid.update((gridValue) => {
				unflaggedFields.forEach((unflaggedField) => {
					gridValue[unflaggedField.x][unflaggedField.y].isFlagged = true;
				});

				return gridValue;
			});

			remainingFlags.set(0);
		}

		gameStatus.set('won');
	}
});
