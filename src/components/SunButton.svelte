<script lang="ts">
	import Button from './Button.svelte';

	import NewGameModal from '../modules/NewGameModal.svelte';
	import SunImage from './SunImage.svelte';

	let isNewGameModalOpened = false;

	const onModalOpen = () => {
		isNewGameModalOpened = true;
	};
</script>

<Button style="width: 60px; height: 60px;" onLeftClick={onModalOpen}>
	<SunImage />
</Button>

<NewGameModal bind:isOpen={isNewGameModalOpened} />
