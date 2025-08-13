import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react(), tailwindcss()],
		server: {
			proxy: {
				'/api/graphql': env.VITE_GRAPHQL_ENDPOINT,
			},
		},
	};
});
