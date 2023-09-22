<script lang="ts">
	import { getBlockFontColor } from '../utils/visualUtils';
	import flagImage from '../assets/flag.png';

	export let size: 's' | 'm' | 'l' = 'm';

	const pixelSize = size === 's' ? 40 : 50;
	export let hasBomb = false;
	export let bombsAround = 0;

	let isExposed = false;
	let isFlagged = false;

	const onRightClick = () => {
		isFlagged = !isFlagged;
	};

	const onLeftClick = () => {
		isExposed = true;
	};

	const fontColor = getBlockFontColor(bombsAround);
</script>

<button
	style="width: {pixelSize}px; height: {pixelSize}px; color: {fontColor}"
	on:contextmenu|preventDefault={onRightClick}
	on:click={onLeftClick}
>
	{#if isExposed}
		{#if hasBomb}
			b
		{:else}
			{bombsAround}
		{/if}
	{:else if isFlagged}
		<img src={flagImage} alt="flag" />
	{/if}
</button>

<style>
	button {
		background-color: #444444;

		border-width: 6px;
		border-style: solid;

		border-top-color: #5b5b5b;
		border-left-color: #5b5b5b;
		border-bottom-color: #333333;
		border-right-color: #333333;
	}

	button img {
		width: 100%;
		height: 100%;
	}
</style>
