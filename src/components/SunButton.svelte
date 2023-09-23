<script lang="ts">
	import Button from './Button.svelte';
	import face_awe from '../assets/faces/awe.png';
	import face_dead from '../assets/faces/dead.png';
	import face_smile from '../assets/faces/smile.png';
	import face_sunglasses from '../assets/faces/sunglasses.png';
	import { gameStatus } from './../stores/gameStatusStore';
	import { onDestroy } from 'svelte';
	import NewGameModal from '../modules/NewGameModal.svelte';

	let isNewGameModalOpened = false;

	const onModalOpen = () => {
		isNewGameModalOpened = true;
	};

	let faceImage = face_smile;
	const unsubscribeGameStatus = gameStatus.subscribe(($gameStatus) => {
		switch ($gameStatus) {
			case 'before':
			case 'during':
				return face_smile;

			case 'lost':
				return face_dead;

			case 'won':
				return face_sunglasses;
		}
	});

	onDestroy(unsubscribeGameStatus);
</script>

<Button style="width: 60px; height: 60px;" onLeftClick={onModalOpen}>
	<img src={faceImage} alt="face" class="button-img-full-width" />
</Button>

<NewGameModal bind:isOpen={isNewGameModalOpened} />
