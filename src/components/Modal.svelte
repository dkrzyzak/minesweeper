<script lang="ts">
	import bombImage from '../assets/bomb.png';

	export let isOpen = false;
	export let dismissible = true;
	export let title = 'Game Over';

	const onCloseModal = () => {
		if (dismissible) {
			isOpen = false;
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	role="dialog"
	class="modal-overlay"
	style="transform: translateY({isOpen ? '0' : '-100vh'});"
	on:click|self={onCloseModal}
>
	<div class="modal-wrapper" style="opacity: {isOpen ? '1' : '0'}">
		<div class="modal-title-wrapper">
			<div class="modal-title">{title}</div>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="modal-title-close" on:click|self={onCloseModal}>
				<img src={bombImage} alt="close icon" on:click|self={onCloseModal} />
			</div>
		</div>
		<div class="modal-body">
			<slot />
		</div>
	</div>
</div>

<style>
	.modal-overlay {
		position: absolute;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);

		display: flex;
		justify-content: center;
		align-items: center;
		transition: transform 100ms ease-out;
	}

	.modal-wrapper {
		background: rgba(0, 0, 0, 0.7);
		position: relative;
		width: 50%;
		height: 60%;
		min-width: 320px;
		min-height: 480px;
		border: 2px solid #710f80;
		transition: opacity 400ms ease-out;
	}

	.modal-title-wrapper {
		height: 60px;
		display: flex;
		border-bottom: 2px solid #710f80;
	}

	.modal-title {
		font-variant: small caps;
		flex-grow: 1;
		font-size: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: default;
	}

	.modal-title-close {
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-left: 2px solid #710f80;
		cursor: pointer;
	}

	.modal-title-close img {
		width: 80%;
	}
</style>
