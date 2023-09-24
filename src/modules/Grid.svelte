<script lang="ts">
	import { gameStatus } from './../stores/gameStatusStore';
	import BlockComponent from '../components/Block.svelte';
	import { generateBoard } from '../utils/generateBoard';
	import type { Block } from '../utils/constants';
	import { exposeNeighbors } from '../utils/exposeNeighbors';
	import { mousePressedOnGrid } from '../stores/mousePressedStore';

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
		if ($gameStatus === 'before') {
			gameStatus.set('during');
		}

		// console.log('handle left click', block);
		if (block.isFlagged) {
			return;
		}

		grid[block.x][block.y].isExposed = true;

		if (block.hasBomb) {
			console.log('game over');
			gameStatus.set('lost');
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

	// -- LOGIC FOR SUN EMOJI --
	const mousedownHandler = (event: MouseEvent) => {
		const isClickable = (event.target as HTMLElement).dataset.disabled === 'false';
		if (isClickable) {
			mousePressedOnGrid.set(true);
		}
	};

	const mouseupHandler = () => {
		// its better to leave it without any condition :)
		mousePressedOnGrid.set(false);
	};

	// -- END LOGIC FOR SUN EMOJI --
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section on:mousedown={mousedownHandler} on:mouseup={mouseupHandler}>
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
