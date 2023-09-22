import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import UnFonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		UnFonts({
			custom: {
				families: {
					'Arcade Classic': {
						src: './src/assets/fonts/ARCADECLASSIC.TTF',
					},
					'PC Senior': {
						src: './src/assets/fonts/pcsenior.ttf',
					},
					Rexlia: {
						src: './src/assets/fonts/rexlia-rg.ttf',
					},
					Wheaton: {
						src: './src/assets/fonts/wheaton-capitals.ttf',
					},
				},
				preload: true,
				injectTo: 'head-prepend',
			},
		}),
	],
});
