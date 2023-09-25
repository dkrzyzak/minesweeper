import { writable } from 'svelte/store';
import { initialBombsCount } from './constants';

export const remainingFlags = writable(initialBombsCount);
