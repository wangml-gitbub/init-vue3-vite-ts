export const errorCode = (code: number) => {
	switch (code) {
		case 401:
			return '登录过期，请重新登录'
			break
		case 500:
			return '登录过期，请重新登录'
			break
		default:
			return '其他异常'
	}
}
