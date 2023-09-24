<script lang="ts">
	import { gameTime } from './../stores/gameTimeStore';
	import AnalogDisplay from '../components/AnalogDisplay.svelte';
	import SunButton from '../components/SunButton.svelte';

	$: gameTimeFormatted = String($gameTime).padStart(3, '0');
</script>

<section class="game-top-bar">
	<AnalogDisplay displayValue="010" />
	<SunButton />
	<AnalogDisplay displayValue={gameTimeFormatted} />
</section>

<style>
	.game-top-bar {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
	}
</style>
