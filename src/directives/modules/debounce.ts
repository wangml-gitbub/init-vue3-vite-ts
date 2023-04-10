/*
 * @description 防抖： 用户频繁进行操作时，限制其有效次数为1
 * @do: 第一次操作时，正常执行逻辑；如果在执行过程中继续频繁操作，则清除之前的操作
 *
 * 使用： <button v-debounce="handClick">按钮</button>
 */

import type { Directive, DirectiveBinding } from 'vue'

interface IElementType extends HTMLElement {
	__handleClick__: () => any
}

const debounce: Directive = {
	mounted(element: IElementType, binding: DirectiveBinding) {
		if (typeof binding.value !== 'function') {
			throw 'callback must be a function'
		}

		let timer: NodeJS.Timeout | null = null

		element.__handleClick__ = function () {
			if (timer) clearTimeout(timer)

			timer = setTimeout(() => {
				binding.value()
			}, 500)
		}

		element.addEventListener('click', element.__handleClick__)
	},
	beforeUnmount(element: IElementType) {
		element.removeEventListener('click', element.__handleClick__)
	}
}

export default debounce
