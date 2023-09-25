<script lang="ts">
	import BlockComponent from '../components/Block.svelte';
	import { mousePressedOnGrid } from '../stores/mousePressedStore';
	import {
		grid,
		gridInstanceId,
		gridSize,
		handleLeftClick,
		handleRightClick,
	} from '../stores/gameGridStore';

	$: [xSize, ySize] = $gridSize;

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
		{#key $gridInstanceId}
			{#each $grid as row}
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
</section>

<style>
	.board {
		display: grid;
		gap: 1px;
		background-color: #2c2c2c;
	}
</style>
