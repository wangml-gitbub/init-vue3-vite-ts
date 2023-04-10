export function getCookie(name: string): string | null {
	const cookieStr = document.cookie
	let cookieValue: null | string = null

	if (!cookieStr) return cookieValue

	const cookies = cookieStr.split(';')

	for(const cookie of cookies) {
		const equalIndex = cookie.indexOf('=')
		const cookieName = cookie.substring(0, equalIndex).trim()
		if (cookieName === name) {
			cookieValue =  decodeURIComponent(cookie.substring(equalIndex + 1))
		}
	}
	return cookieValue
}

export function setCookie(cookieName: string, cookieValue: string, expireDays = 1000 * 60 * 60 * 24, path = '/') {
	let expiredTime = new Date()
	expiredTime.setTime(new Date().getTime() + expireDays) // 默认一天后过期
	let expires = `expires=${expiredTime.toUTCString()}`

	document.cookie = `${cookieName}=${encodeURIComponent(cookieValue)};expires=${expires};path=${path}`
}
