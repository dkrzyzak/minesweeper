<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getBlockFontColor } from '../utils/visualUtils';
	import flagImage from '../assets/flag.png';
	import bombImage from '../assets/bomb2.png';
	import Button from './Button.svelte';

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

<Button
	style="
   width: {pixelSize}px;
   height: {pixelSize}px;
   color: {fontColor};
   border-width: {isExposed ? '2px' : '6px'};
	cursor: default;
   "
	{disabled}
	{onRightClick}
	{onLeftClick}
	animateExplosion={hasBomb && isExposed}
>
	{#if isExposed}
		{#if hasBomb}
			<img src={bombImage} alt="bomb" class="button-img-full-width" />
		{:else}
			{bombsAround > 0 ? bombsAround : ''}
		{/if}
	{:else if isFlagged}
		<img src={flagImage} alt="flag" class="button-img-full-width" />
	{/if}
</Button>
