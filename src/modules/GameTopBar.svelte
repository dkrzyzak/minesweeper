<script lang="ts">
	import SunButton from '../components/SunButton.svelte';
</script>

<section class="game-top-bar">
	<p>ile bomb zostało</p>
	<SunButton />
	<p>czas jaki upłynął</p>
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
