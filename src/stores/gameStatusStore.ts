import { writable } from 'svelte/store';

type GameStatus = 'before' | 'during' | 'won' | 'lost';

export const gameStatus = writable<GameStatus>('before');
