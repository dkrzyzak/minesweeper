<script lang="ts">
	import Button from '../components/Button.svelte';
	import Modal from '../components/Modal.svelte';

	export let isOpen = false;
</script>

<Modal title="Nowa Gra" bind:isOpen>
	<Button>Łatwy</Button>
	<Button>Średni</Button>
	<Button>Trudny</Button>
	<Button>Customowy</Button>
</Modal>
