<script lang="ts">
	import BlockComponent from '../components/Block.svelte';
	import { generateBoard } from '../utils/generateBoard';
	import type { Block } from '../utils/constants';
	import { exposeNeighbors } from '../utils/exposeNeighbors';

	const xSize = 10;
	const ySize = 10;
	const bombsCount = 10;
	let gridChangeIndex = 0; // to force re-render on each grid change

	let grid = generateBoard(xSize, ySize, bombsCount);

	const onGetNewGrid = () => {
		gridChangeIndex += 1;
		grid = generateBoard(xSize, ySize, bombsCount);
	};

	const handleLeftClick = (block: Block) => {
		console.log('handle left click', block);
		if (block.isFlagged) {
			return;
		}

		grid[block.x][block.y].isExposed = true;

		console.log('got exposed');

		if (block.hasBomb) {
			console.log('game over');
		}

		if (block.bombsAround === 0) {
			exposeNeighbors(block, grid);
			// expose all neighbors with 0 bombs around
		}
	};

	const handleRightClick = (block: Block) => {
		if (block.isExposed) {
			return;
		}

		grid[block.x][block.y].isFlagged = !block.isFlagged;
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
				{#each row as block}
					<BlockComponent
						hasBomb={block.hasBomb}
						bombsAround={block.bombsAround}
						isExposed={block.isExposed}
						isFlagged={block.isFlagged}
						on:leftClick={() => handleLeftClick(block)}
						on:rightClick={() => handleRightClick(block)}
					/>
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
