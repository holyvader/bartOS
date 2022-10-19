import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function alias(targetPath: string) {
	return path.resolve(__dirname, targetPath);
}
function moduleAlias(resourcePath: string) {
	return alias(`./src/app/modules${resourcePath}`);
}

function coreAlias(corePath: string) {
	return alias(`./src/app/core${corePath}`);
}

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@public': alias('./public'),
			// USER HOME
			'@user-home': alias('./src/app/user-home'),
			// MODULES
			'@programs': moduleAlias('/programs'),
			'@services': moduleAlias('/services'),
			'@config': moduleAlias('/config'),
			// CORE
			'@permission': coreAlias('/permission'),
			'@system': coreAlias('/system'),
			'@ui': coreAlias('/ui')
		}
	},
	plugins: [react()]
});
