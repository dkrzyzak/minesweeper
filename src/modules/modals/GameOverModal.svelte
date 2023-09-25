<script lang="ts">
	import Modal from '../../components/Modal.svelte';
	import { gameTime } from './../../stores/gameTimeStore';
	import { gameStatus } from '../../stores/gameStatusStore';

	$: isModalOpen = $gameStatus === 'lost';
</script>

<Modal title="AJAJAJAJ" bind:isOpen={isModalOpen}>
	<h3>Trafiłeś w bombę</h3>
	<h4>Czas gry: {$gameTime} sek.</h4>
	<h4>Odkryte bomby: chuj wie</h4>
</Modal>
