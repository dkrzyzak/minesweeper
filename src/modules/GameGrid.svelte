<script lang="ts">
	import Block from '../components/Block.svelte';
	import { generateBoard } from '../utils/generateBoard';

	const xSize = 10;
	const ySize = 10;

	const grid = generateBoard(xSize, ySize, 10);
</script>

<section>
	<div
		class="board"
		style="
   grid-template-columns: repeat({ySize}, 50px);
   grid-template-rows: repeat({xSize}, 50px);
   "
	>
		{#each grid as row}
			{#each row as { x, y, hasBomb }}
				<Block label={hasBomb ? 'b' : `${x} ${y}`} />
			{/each}
		{/each}
	</div>
</section>

<style>
	.board {
		display: grid;
		gap: 1px;
		background-color: #2c2c2c;
	}
</style>
