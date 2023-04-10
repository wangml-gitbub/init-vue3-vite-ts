import service from '@/api/request'
import { Login } from '@/api/interface'

export const loginApi = (data: Login.IRequestLoginForm) => {
	return service({
		method: 'post',
		data,
		url: ''
	})
}