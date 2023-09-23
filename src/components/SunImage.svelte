<script lang="ts">
	import { onDestroy } from 'svelte';
	import face_awe from '../assets/faces/awe.png';
	import face_dead from '../assets/faces/dead.png';
	import face_smile from '../assets/faces/smile.png';
	import face_sunglasses from '../assets/faces/sunglasses.png';

	import { gameStatus, type GameStatus } from './../stores/gameStatusStore';
	import { mousePressedOnGrid as mousePressed } from '../stores/mousePressedStore';
	import { derived, type Stores } from 'svelte/store';

	let faceImageSrc = face_smile;

	interface DerivedStoreData {
		gameStatus: GameStatus;
		mousePressed: boolean;
	}

	const derivedStore = derived<Stores, DerivedStoreData>(
		[gameStatus, mousePressed],
		($values, set) => {
			set({
				gameStatus: $values[0],
				mousePressed: $values[1],
			});
		}
	);

	const unsubscribeDerivedStore = derivedStore.subscribe(
		({ gameStatus, mousePressed }) => {
			switch (gameStatus) {
				case 'before':
				case 'during':
					faceImageSrc = mousePressed ? face_awe : face_smile;
					break;

				case 'lost':
					faceImageSrc = face_dead;
					break;

				case 'won':
					faceImageSrc = face_sunglasses;
			}
		}
	);

	onDestroy(unsubscribeDerivedStore);
</script>

<img src={faceImageSrc} alt="face" class="button-img-full-width" />
