import adapter from '@sveltejs/adapter-node'; // Baris ini yang sebelumnya error
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto hanya untuk environment tertentu, 
		// untuk cPanel kita wajib pakai adapter-node
		adapter: adapter()
	}
};

export default config;