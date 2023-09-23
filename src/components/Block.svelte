<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getBlockFontColor } from '../utils/visualUtils';
	import flagImage from '../assets/flag.png';
	import bombImage from '../assets/bomb2.png';

	const dispatch = createEventDispatcher();

	const pixelSize = 50;
	export let hasBomb = false;
	export let bombsAround = 0;
	export let isExposed = false;
	export let isFlagged = false;

	const onLeftClick = () => {
		dispatch('leftClick');
	};

	const onRightClick = () => {
		dispatch('rightClick');
	};

	$: disabled = isFlagged || isExposed;

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
		display: grid;
		place-items: center;

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
