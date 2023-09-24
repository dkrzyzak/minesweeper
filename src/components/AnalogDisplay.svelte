<script lang="ts">
	import { getAnalogDigit, type Digit } from '../utils/getAnalogDigit';

	export let displayValue = '';

	$: digits = displayValue.split('') as Digit[];
</script>

<div class="display-container">
	{#each digits as digit}
		<img src={getAnalogDigit(digit)} alt={digit} />
	{/each}
</div>

<style>
	.display-container {
		display: flex;
		gap: 4px;
		background: #000;
		padding: 4px;
	}

	.display-container img {
		width: 30px;
		flex-grow: 1;
	}
</style>
