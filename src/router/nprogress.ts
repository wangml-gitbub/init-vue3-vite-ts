import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
	easing: 'ease', // 动画方式
	speed: 500, // 递增进度条的速度
	showSpinner: false, // 是否显示加载的 icon
	trickleSpeed: 200, // 自动启动时使用的最小百分比
	parent: 'body', // 指定进度条的父容器
	minimum: 0.3 // 初始化时的最小百分比
})

export default NProgress