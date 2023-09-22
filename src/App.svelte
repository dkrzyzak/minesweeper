<script lang="ts">
	import GameGrid from './modules/GameGrid.svelte';
</script>

<main>
	<h1>Saper</h1>
	<GameGrid />
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
