<script lang="ts">
	import Modal from './components/Modal.svelte';
	import GameGrid from './modules/GameGrid.svelte';

	let isModalOpen = false;
</script>

<main>
	<h1>Saper</h1>
	<GameGrid />
	<Modal bind:isOpen={isModalOpen} />

	<button on:click={() => (isModalOpen = true)}>Open Modal</button>
</main>

<style>
	h1 {
		text-align: center;
	}

	main {
		display: grid;
		width: 100vw;
		justify-content: center;
	}
</style>
