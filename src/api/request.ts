import axios from 'axios'
import router from '@/router'
import { errorCode } from '@/api/errorCode'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/modules/user'
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.MODE == 'development' ? import.meta.env.VITE_APP_BASE_URL : import.meta.env.VITE_APP_PROXY_TARGET_URL,
	timeout: 60000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	}
})

service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (useUserStore().token) {
			config.headers.Authorization = `Bear ${useUserStore().token}`
		}

		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	(response: AxiosResponse) => {
		const status = response.status
		if (status === 200) {
			return response.data
		}

		if (status === 401) {
			router.replace('/login')
			useUserStore().setToken('')
		}

		message.error(errorCode(status))
		return Promise.reject(response.data.msg)
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

export default service
