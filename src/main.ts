import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import pinia from '@/store'

const app = createApp(App)

import '@/styles/font.less'
import '@/styles/common.less'
import '@/styles/reset.less'

// UI 组件库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue'
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons])// 全局注册 Icons 组件
})

import directives from '@/directives/index' // 全局指令
import i18n from './language/i18n' // 国际化

// 支持 svg 图标
import 'virtual:svg-icons-register'
import { registerGlobalComponent } from '@/components/registerGlobalComponent'
registerGlobalComponent(app)

app.use(router).use(pinia).use(Antd).use(directives).use(i18n).mount('#app')
