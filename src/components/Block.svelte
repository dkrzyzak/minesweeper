<script lang="ts">
	import { getBlockFontColor } from '../utils/visualUtils';
	import flagImage from '../assets/flag.png';
	import bombImage from '../assets/bomb.png';

	export let size: 's' | 'm' | 'l' = 'm';

	const pixelSize = size === 's' ? 40 : 50;
	export let hasBomb = false;
	export let bombsAround = 0;

	// TODO: przekazywać jako prop?
	let isExposed = false;
	let isFlagged = false;

	$: disabled = isFlagged || isExposed;

	const onRightClick = () => {
		if (isExposed) {
			return;
		}

		isFlagged = !isFlagged;
	};

	const onLeftClick = () => {
		isExposed = true;
	};

	$: fontColor = getBlockFontColor(bombsAround);
</script>

<button
	style="
   width: {pixelSize}px;
   height: {pixelSize}px;
   color: {fontColor};
   border-width: {isExposed ? '2px' : '6px'}
   "
	class:active={!disabled}
	on:contextmenu|preventDefault={onRightClick}
	on:click={disabled ? null : onLeftClick}
>
	{#if isExposed}
		{#if hasBomb}
			<img src={bombImage} alt="bomb" />
		{:else}
			{bombsAround > 0 ? bombsAround : ''}
		{/if}
	{:else if isFlagged}
		<img src={flagImage} alt="flag" />
	{/if}
</button>

<style>
	button {
		/* font-family: 'Arcade Classic'; */
		/* font-family: 'PC Senior'; */
		/* font-family: 'Rexlia'; */
		font-family: 'Wheaton';
		font-weight: bold;
		font-size: 30px;
		background-color: #444444;

		border-width: 6px;
		border-style: solid;
		border-top-color: #5b5b5b;
		border-left-color: #5b5b5b;
		border-bottom-color: #333333;
		border-right-color: #333333;

		transition: border-color 25ms ease;
	}

	button.active:active {
		border-bottom-color: #5b5b5b;
		border-right-color: #5b5b5b;
		border-top-color: #333333;
		border-left-color: #333333;
	}

	button img {
		width: 100%;
	}
</style>
