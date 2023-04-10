import { defineStore } from 'pinia'
import piniaPersistConfig from '@/store/piniaPersistConfig'

const useUserStore = defineStore({
	id: 'user-store',
	state: () => {
		return {
			token: '',
			userName: '',
			isLogin: ''
		}
	},
	getters: {},
	actions: {
		setToken(token: string) {
			this.token = token
		},
		setUserName(userName: string) {
			this.userName = userName
		}
	},
	persist: piniaPersistConfig('user-store', ['isLogin', 'userName']) // 持久化 state 中的 userName 和 isLogin 数据
})

export default useUserStore
