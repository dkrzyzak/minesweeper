import { writable } from 'svelte/store';
import { emptyFieldsRemaining } from './gameGridStore';

export type GameStatus = 'before' | 'during' | 'won' | 'lost';

export const gameStatus = writable<GameStatus>('before');

emptyFieldsRemaining.subscribe((emptyFields) => {
	console.log(emptyFields);

	if (emptyFields === 0) {
		gameStatus.set('won');
	}
});
