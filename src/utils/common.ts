// 格式化时间
export const formatTime = (timeStr: string): string => {
	const time = new Date(timeStr)
	const yyyy = time.getFullYear()
	const HH = time.getMonth() + 1 >= 10 ? time.getMonth() : '0' + (time.getMonth() + 1)
	const dd = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()
	const hh = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()
	const mm = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
	const ss = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
	return yyyy + '-' + HH + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
}

// 获取时间段
export const getTimeState = (): string => {
	const time = new Date()
	const hours = time.getHours()
	if (hours >= 6 && hours < 12) return '早上好呀，'
	if (hours >= 12 && hours < 14) return '中午好呀，'
	if (hours >= 14 && hours < 18) return '下午好呀，'
	if (hours >= 18 && hours <= 24) return '晚上好呀，'
	return '凌晨好呀'
}

// 设置根字体
export const setDomFontSizeByDevice = () => {
	const width = document.documentElement.clientWidth || document.body.clientWidth
	const fontSize = width / width + 'px'
	document.getElementsByTagName('html')[0].style.fontSize = fontSize
}

// 窗口缩放
export const windowResize = () => {
	const setDomFontSizeDebounce = debounce(setDomFontSizeByDevice, 400)
	window.addEventListener('resize', setDomFontSizeDebounce)
}

// 防抖
export const debounce = (fn: any, delay: number) => {
	if (typeof fn !== 'function') {
		throw new Error('参数错误')
	}

	let timer: NodeJS.Timeout | null = null

	return function () {
		if (timer) clearTimeout(timer)

		timer = setTimeout(() => {
			fn()
		}, delay)
	}
}

// 节流
export const throttle = (fn: any, delay: number) => {
	if (typeof fn !== 'function') {
		throw new Error('参数错误')
	}

	let timer: NodeJS.Timeout | null = null

	if (timer) return

	timer = setTimeout(() => {
		fn()
		timer = null
	}, delay)
}

// byte 转换为 MB
export const byteToM = (size: number) => {
	if (!size) return

	return (Number(size) / 1024 / 1024).toFixed(2)
}

export const formatSize = (size: number): string => {
  if(size < 1024) {
    return size + ' B'
  }
  if(size < 1024 * 1024) {
    return (size/1024).toFixed(2) + ' KB'
  }
  if(size < 1024 * 1024 * 1024) {
    return (size/1024/1024).toFixed(2) + ' MB'
  }
  return size/1024/1024/1024 + ' GB'
}

export function getBtLength(str: string){
  let char = str.replace(/[^\x00-\xff]/g, '***')
  return char.length
}
