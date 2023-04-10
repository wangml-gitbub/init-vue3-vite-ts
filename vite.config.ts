import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	// const env = loadEnv(mode, process.cwd())
	return {
		plugins: [
			vue(),
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // svg 图标所在文件夹地址
				symbolId: 'icon-[dir]-[name]' // 指定 symbolId 的格式
			})
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		},
		css: {
			preprocessorOptions: {
				less: {
					additionalData: '@import "@/styles/var.less";',
					javascriptEnabled: true
				}
			}
		},
		// server: {
		// 	host: '0.0.0.0',
		// 	port: Number(env.VITE_APP_PORT),
		// 	open: env.VITE_APP_OPEN,
		// 	proxy: {
		// 		[env.VITE_APP_BASE_URL]: {
		// 			target: env.VITE_APP_PROXY_TARGET_URL,
		// 			changeOrigin: true,
		// 			rewrite: (path: string) => path.replace(env.VITE_APP_BASE_URL, '')
		// 		}
		// 	}
		// }
	}
})
