<script lang="ts">
	import Block from '../components/Block.svelte';
	import { generateBoard } from '../utils/generateBoard';

	const xSize = 10;
	const ySize = 10;
	const bombsCount = 25;
	let gridChangeIndex = 0; // to force re-render on each grid change

	let grid = generateBoard(xSize, ySize, bombsCount);

	const onGetNewGrid = () => {
		gridChangeIndex += 1;
		grid = generateBoard(xSize, ySize, bombsCount);
	};
</script>

<section>
	<div
		class="board"
		style="
   grid-template-columns: repeat({ySize}, 50px);
   grid-template-rows: repeat({xSize}, 50px);
   "
	>
		{#key gridChangeIndex}
			{#each grid as row}
				{#each row as { x, y, hasBomb, bombsAround }}
					<Block {hasBomb} {bombsAround} />
				{/each}
			{/each}
		{/key}
	</div>

	<button on:click={onGetNewGrid}>Nowy Board</button>
</section>

<style>
	.board {
		display: grid;
		gap: 1px;
		background-color: #2c2c2c;
	}
</style>
