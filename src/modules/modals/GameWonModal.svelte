<script lang="ts">
	import { gameTime } from './../../stores/gameTimeStore';
	import Modal from '../../components/Modal.svelte';
	import { gameStatus } from '../../stores/gameStatusStore';

	$: isModalOpen = $gameStatus === 'won';
</script>

<Modal title="GRATULACJE!" bind:isOpen={isModalOpen}>
	<h2>Wygrałeś B)</h2>

	<h3>Czas gry: {$gameTime} sek.</h3>
</Modal>
