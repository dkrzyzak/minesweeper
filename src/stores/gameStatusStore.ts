import { writable } from 'svelte/store';

export type GameStatus = 'before' | 'during' | 'won' | 'lost';

export const gameStatus = writable<GameStatus>('before');
