<script lang="ts">
	import Modal from '../components/Modal.svelte';
	import GameTopBar from './GameTopBar.svelte';
	import Grid from './Grid.svelte';
	import NewGameModal from './NewGameModal.svelte';
	let isModalOpen = false;
</script>

<section>
	<GameTopBar />
	<Grid />
	<Modal bind:isOpen={isModalOpen} />
</section>

<button on:click={() => (isModalOpen = true)}>Open Modal</button>
