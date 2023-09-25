import { writable } from 'svelte/store';
import { gameStatus } from './gameStatusStore';

export const gameTime = writable(0);

let intervalId: number;

export const startTimer = () => {
	gameTime.set(0);
	const timeStart = Date.now();

	intervalId = setInterval(() => {
		const nextTick = Date.now();
		const diff = Math.floor((nextTick - timeStart) / 1000);

		gameTime.set(diff);
	}, 1000);
};

export const stopTimer = () => {
	clearInterval(intervalId);
};

gameStatus.subscribe((status) => {
	if (status === 'during') {
		startTimer();
	}

	if (status === 'before') {
		stopTimer();
		gameTime.set(0);
	}

	if (status === 'before' || status === 'won' || status === 'lost') {
		stopTimer();
	}
});
