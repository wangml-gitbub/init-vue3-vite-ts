/*
 * @description 节流： 用户在短时间内点击按钮多次，使用节流函数限制其短时间内只能点击一次
 * @do: 第一次点击按钮时，立即调用方法并禁用按钮，延迟时间结束再次让按钮可用
 *
 * 使用： <button v-throttle="handClick">按钮</button>
 */

import type { Directive, DirectiveBinding } from 'vue'

interface IElementType extends HTMLElement {
	__handleClick__: () => any
	disabled: boolean
}

const throttle: Directive = {
	mounted(element: IElementType, binding: DirectiveBinding) {
		if (typeof binding.value !== 'function') {
			throw 'callback must be a function'
		}

		let timer: NodeJS.Timeout | null = null

		element.__handleClick__ = function () {
			if (timer) clearTimeout(timer)

			if (!element.disabled) {
				element.disabled = true
				binding.value()
				timer = setTimeout(() => {
					element.disabled = false
				}, 1000)
			}
		}

		element.addEventListener('click', element.__handleClick__)
	},

	beforeUnmount(element: IElementType) {
		element.removeEventListener('click', element.__handleClick__)
	}
}

export default throttle
