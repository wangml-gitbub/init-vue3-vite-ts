import type { App } from 'vue'
import SvgIcon from '@/components/svg-icon.vue'
import CountUp from '@/components/count-up.vue'

const componentList = [
	{
		name: 'SvgIcon',
		component: SvgIcon
	},
	{
		name: 'CountUp',
		component: CountUp
	}
]

export function registerGlobalComponent(app: App) {
	componentList.forEach(item => {
		app.component(item.name, item.component)
	})
}
