import { App, Directive } from 'vue'
import debounce from '@/directives/modules/debounce'
import throttle from '@/directives/modules/throttle'
import closeOnClickOutside from '@/directives/modules/closeOnClickOutside'

const directiveList: { [key: string]: Directive } = {
	debounce,
	throttle,
	closeOnClickOutside
}

const directives = {
	install: function (app: App<Element>) {
		Object.keys(directiveList).forEach(key => {
			app.directive(key, directiveList[key])
		})
	}
}

export default directives