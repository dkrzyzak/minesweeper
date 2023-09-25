<script lang="ts">
	export let style = '';
	export let disabled = false;

	export let onLeftClick = () => {};
	export let onRightClick = () => {};

	export let animateExplosion = false;
</script>

<button
	{style}
	class:active={!disabled}
	data-disabled={disabled}
	class:explode-animated={animateExplosion}
	on:contextmenu|preventDefault={onRightClick}
	on:click={disabled ? null : onLeftClick}
>
	<slot />
</button>

<style>
	button {
		display: grid;
		place-items: center;
		font-family: 'Wheaton';
		font-weight: bold;
		font-size: 30px;
		background-color: #444444;
		cursor: pointer;

		border-width: 6px;
		border-style: solid;
		border-top-color: #5b5b5b;
		border-left-color: #5b5b5b;
		border-bottom-color: #333333;
		border-right-color: #333333;

		transition: border-color 25ms ease;
	}

	button.active:active {
		border-bottom-color: #5b5b5b;
		border-right-color: #5b5b5b;
		border-top-color: #333333;
		border-left-color: #333333;
	}

	:global(.button-img-full-width) {
		width: 100%;
		padding: 5px;
	}

	.explode-animated {
		animation-duration: 500ms;
		animation-name: explode;
	}

	@keyframes explode {
		0% {
			filter: drop-shadow(0 0 30px #444444);
		}

		20% {
			filter: drop-shadow(0 0 30px #fe0000);
		}

		100% {
			filter: drop-shadow(0 0 0 #444444);
		}
	}
</style>
