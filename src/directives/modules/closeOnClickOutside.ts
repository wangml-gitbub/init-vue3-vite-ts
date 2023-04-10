/*
 * @description： 点击当前位置以外的区域
 * @do: 常用于点击当前当前位置以外的区域时，弹框或者下拉框关闭
 *
 * 使用： v-close-on-click-outside="hideDialog"
 */
import { Directive, DirectiveBinding } from 'vue'

interface IHTMLElement extends HTMLElement {
	_clickOutside: any
}


const closeOnClickOutside: Directive = {
	mounted(element: IHTMLElement, binding: DirectiveBinding) {

		element._clickOutside = (event: any) => {
			if (!element.contains(event.target) && element !== event.target) {
				binding.value()
			}
		}

		document.addEventListener('click', element._clickOutside)
	},
	
	beforeUnmount(element: IHTMLElement) {
		document.removeEventListener('click', element._clickOutside)
		delete element._clickOutside
	}
}

export default closeOnClickOutside
