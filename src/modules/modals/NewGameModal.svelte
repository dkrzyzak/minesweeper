<script lang="ts">
	import Button from '../../components/Button.svelte';
	import Modal from '../../components/Modal.svelte';
	import { generateNewGrid } from '../../stores/gameGridStore';

	export let isOpen = false;

	const generateNewGame = (xSize: number, ySize: number, bombsCount: number) => {
		console.log('generuje giere', xSize, ySize, bombsCount);
		generateNewGrid(xSize, ySize, bombsCount);
		isOpen = false;
	};
</script>

<Modal title="Nowa Gra" bind:isOpen>
	<Button onLeftClick={() => generateNewGame(9, 9, 10)}>Łatwy</Button>
	<Button onLeftClick={() => generateNewGame(16, 16, 40)}>Średni</Button>
	<Button onLeftClick={() => generateNewGame(30, 16, 99)}>Trudny</Button>
	<Button onLeftClick={() => generateNewGame(30, 20, 80)}>Customowy</Button>
</Modal>
