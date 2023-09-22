<script lang="ts">
	export let label = '';
	export let size: 's' | 'm' | 'l' = 'm';

	const pixelSize = size === 's' ? 40 : 50;
	export let hasBomb = false;

	let isExposed = true;
</script>

<button style="width: {pixelSize}px; height: {pixelSize}px;">
	{label}
</button>

<style>
	button {
		background-color: #444444;
		border: 2px solid #5b5b5b;
	}

	/* button::before {
		content: '';
	} */
</style>
