import type { AstroConfig, AstroIntegration, AstroRenderer } from 'astro';
import solid, { type Options as ViteSolidPluginOptions } from 'vite-plugin-solid';

function getRenderer(): AstroRenderer {
	return {
		name: '@astrojs/solid-js',
		clientEntrypoint: '@astrojs/solid-js/client.js',
		serverEntrypoint: '@astrojs/solid-js/server.js',
	};
}

export type Options = Pick<ViteSolidPluginOptions, 'include' | 'exclude'>;

export default function ({ include, exclude }: Options): AstroIntegration {
	return {
		name: '@astrojs/solid-js',
		hooks: {
			'astro:config:setup': async ({ command, addRenderer, updateConfig, config }) => {
				addRenderer(getRenderer());
				updateConfig({
					vite: {
						plugins: [solid({ include, exclude, dev: command === 'dev', ssr: true })],
					},
				});
			},
		},
	};
}
