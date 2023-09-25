<script lang="ts">
	import { gameTime } from './../../stores/gameTimeStore';
	import Modal from '../../components/Modal.svelte';
	import { gameStatus } from '../../stores/gameStatusStore';

	$: isModalOpen = $gameStatus === 'won';
</script>

<Modal title="GRATULACJE!" bind:isOpen={isModalOpen}>
	<h3>Wygrałeś B)</h3>

	<h4>Czas gry: {$gameTime} sek.</h4>
</Modal>
