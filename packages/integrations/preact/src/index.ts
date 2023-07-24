import type { AstroIntegration, AstroRenderer, ViteUserConfig } from 'astro';
import preact, {type PreactPluginOptions as VitePreactPluginOptions} from '@preact/preset-vite';

function getRenderer(development: boolean): AstroRenderer {
	return {
		name: '@astrojs/preact',
		clientEntrypoint: development ? '@astrojs/preact/client-dev.js' : '@astrojs/preact/client.js',
		serverEntrypoint: '@astrojs/preact/server.js',
	};
}

export type Options =Pick<VitePreactPluginOptions, 'include' | 'exclude'> & { compat?: boolean };
// TODO: Add back compat support -- how would this work in the new world?
export default function ({include, exclude}: VitePreactPluginOptions = {}): AstroIntegration {
	return {
		name: '@astrojs/preact',
		hooks: {
			'astro:config:setup': ({ addRenderer, updateConfig, command }) => {
				addRenderer(getRenderer(command === 'dev'));
				updateConfig({
					vite: {
						plugins: [preact({include, exclude})],
						optimizeDeps: {
							include: ['@astrojs/preact/client.js', 'preact', 'preact/jsx-runtime'],
							exclude: ['@astrojs/preact/server.js'],
						},
					},
				});
			},
		},
	};
}
