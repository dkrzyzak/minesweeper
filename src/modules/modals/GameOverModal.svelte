<script lang="ts">
	import Modal from '../../components/Modal.svelte';
	import { gameTime } from './../../stores/gameTimeStore';
	import { gameStatus } from '../../stores/gameStatusStore';
	import { intersection } from '../../utils/intersection';
	import { bombsCoords, flagsCoords } from '../../stores/gameGridStore';
	import { get } from 'svelte/store';

	let isModalOpen = false;
	let bombsFound = 0;

	gameStatus.subscribe(($gameStatus) => {
		if ($gameStatus === 'lost') {
			isModalOpen = true;
			bombsFound = intersection(get(bombsCoords), get(flagsCoords)).length;
		}
	});
</script>

<Modal title="AJAJAJAJ" bind:isOpen={isModalOpen}>
	<h2>Trafiłeś w bombę</h2>
	<h3>Czas gry: {$gameTime} sek.</h3>
	<h3>Odkryte bomby: {bombsFound}</h3>
</Modal>
