import { defineStore } from 'pinia'
import piniaPersistConfig from '@/store/piniaPersistConfig'


type menuListItemType = {
	name: string
  path: string
  icon: string
  children?: menuListItemType[]
}
const useSystemStore = defineStore({
	id: 'system-store',
	state: () => {
		return {
			menuList: [
				{
					name: 'Dashboard',
					path: '/dashboard',
					icon: 'LayoutOutlined'
				},
				{
					name: 'Flexmatch Simulate',
					path: '/flexmatch-simulate',
					icon: 'appstore-outlined',
					children: [
						{
							name: 'Simulate Matchmaking',
							path: '/flexmatch-simulate/simulate-matchmaking',
							icon: 'file-text-outlined'
						},
						{
							name: 'Player Profiles',
							path: '/flexmatch-simulate/player-profiles',
							icon: 'aim-outlined'
						},
						{
							name: 'Latency Profiles',
							path: '/flexmatch-simulate/latency-profiles',
							icon: 'audit-outlined'
						},
						{
							name: 'Manage Rule Sets',
							path: '/flexmatch-simulate/manage-rule-sets',
							icon: 'cloud-server-outlined'
						}
					]
				}
			],
			activeMenu: {
				name: 'Dashboard',
				path: '/dashboard',
				icon: 'LayoutOutlined'
			},
			projectUuid: ''
		}
	},
	getters: {},
	actions: {
		setActiveMenu(menu: menuListItemType) {
			this.activeMenu = menu
		}
	},
	persist: piniaPersistConfig('system-store')
})

export default useSystemStore
