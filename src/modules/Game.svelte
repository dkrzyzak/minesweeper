<script lang="ts">
	import GameTopBar from './GameTopBar.svelte';
	import Grid from './Grid.svelte';
	import GameOverModal from './modals/GameOverModal.svelte';
	import GameWonModal from './modals/GameWonModal.svelte';
</script>

<section>
	<GameTopBar />
	<Grid />

	<GameOverModal />
	<GameWonModal />
</section>
