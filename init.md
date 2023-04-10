# Vue3+Vite+Typescript+AnDesignVue+Less+Axios+Pinia 初始化过程

## 环境准备、工程初始化、依赖安装、项目启动

```bash
# 环境准备
yarn 安装（可选）
pnpm 安装（可选）
cnpm 安装（可选）
nvm 安装（可选）
nrm 安装（可选）



# 工程初始化
node 指定版本安装
npm init vite@/latest 或者 yarn create vite 或者 pnpm create vite
# 依赖安装
cd 项目名
yarn 或者 npm install
# 项目启动
yarn dev 或者 npm run dev

```

## 创建文件夹

```bash
/src/api
/src/api/request.ts
/src/api/interface.ts
/src/api/errorCode.ts
/src/api/modules


/src/assets
/src/assets/images

/src/layouts
/src/layouts/index.vue
/src/layouts/components
/src/layouts/components/header
/src/layouts/components/menu


/src/router
/src/router/index.ts
/src/router/nprogress.ts(可选)


/src/store
/src/store/index.ts
/src/store/piniaPersistConfig.ts(可选)
/src/store/modules


/src/styles
/src/styles/common.less
/src/styles/font.less
/src/styles/reset.less
/src/styles/var.less


/src/types
/src/types/.env.d.ts

/src/utils
/src/utils/common.ts
/src/utils/contants.ts

.env
.env.development
.env.production
.env.test
```

## 目录概览

```bash
项目名
├─ .vscode                # VSCode 推荐配置
├─ node_modules           # 第三方依赖
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ directives          # 全局指令文件
│  ├─ layouts             # 框架布局模块
│  ├─ router              # 路由管理
│  ├─ store               # pinia store
│  ├─ styles              # 全局样式文件
│  ├─ types               # 全局 ts 声明
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 项目主组件
│  ├─ main.ts             # 项目入口文件
│  └─ vite-env.d.ts       # 指定 ts 识别 vue
├─ .commitlintrc.js       # git 提交规范配置
├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .lintstagedrc.js       # lint-staged 配置文件
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.js         # Prettier 格式化配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ index.html             # 入口 html
├─ package-lock.json      # npm 依赖包包版本锁定
├─ yarn.lock              # yarn 依赖包包版本锁定
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
├─ tsconfig.node.json     # typescript node 全局配置
└─ vite.config.ts         # vite 全局配置文件
```

## 别名配置

- vite.config.ts 配置 alias

```ts
# vite.config.ts 文件

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
```

- ts.config.json 配置 baseUrl、paths、include

```json
// ts.config.json 文件

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- src/types/env.d.ts 配置

```ts
// src/types/env.d.ts 文件

declare module '*.vue' {
 import type { DefineComponent } from 'vue'
 // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
 const component: DefineComponent<{}, {}, any>
 export default component
}

```

- 使用

```vue
<!-- /src/layouts/index.vue 文件 -->

<template>
  <div>
    layout 页面
    <HeaderComponent />
    <MenuComponent />
  </div>
</template>

<script lang="ts" setup>
import HeaderComponent from '@/layouts/components/header.vue'
import MenuComponent from '@/layouts/components/menu.vue'
</script>

<style scoped>
</style>
```

- 扩展

## VueRouter 配置 & NProgress

- 安装 vue-router@4、nprogress、@types/nprogress -D

```bash
yarn add vue-router@4
yarn add nprogress
yarn add @types/nprogress -D
```

- /src/router/index.ts 文件

```ts
// /src/router/index.ts 文件
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import NProgress from '@/router/nprogress'

/**
 * @description 路由参数配置
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
    meta: {}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    component: () => import('@/layouts/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '概览'
        }
      },
      {
        path: '/flexmatch-simulate',
        component: () => import('@/views/flexmatch-simulate/index.vue'),
        redirect: '/flexmatch-simulate/simulate-matchmaking',
        children: [
          {
            path: '/flexmatch-simulate/simulate-matchmaking',
            name: 'simulate-matchmaking',
            component: () => import('@/views/flexmatch-simulate/simulate-matchmaking.vue'),
            meta: {
              title: 'simulate-matchmaking'
            }
          },
          {
            path: '/flexmatch-simulate/player-profiles',
            name: 'player-profiles',
            component: () => import('@/views/flexmatch-simulate/player-profiles.vue'),
            meta: {
              title: 'player-profiles'
            }
          },
          {
            path: '/flexmatch-simulate/latency-profiles',
            name: 'latency-profiles',
            component: () => import('@/views/flexmatch-simulate/latency-profiles.vue'),
            meta: {
              title: 'latency-profiles'
            }
          },
          {
            path: '/flexmatch-simulate/manage-rule-sets',
            name: 'manage-rule-sets',
            component: () => import('@/views/flexmatch-simulate/manage-rule-sets.vue'),
            meta: {
              title: 'manage-rule-sets'
            }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, form, next) => {
  console.log(to, form)
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

router.onError(error => {
  NProgress.done()
  console.log('路由跳转错误: ' + error);
})

export default router
```

- /src/router/nprogress.ts 文件

```ts
// /src/router/nprogress.ts 文件
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
```

- main.ts 文件引入 /src/router/index

```ts
// main.ts 文件
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

createApp(App).use(router).mount('#app')
```

## Less & 系统样式 & 自定义字体 & 全局样式

- 安装 less 和 less-loader

```bash
yarn add less less-loader
```

- main.ts 文件中引入系统样式

```ts
// main.ts 文件
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

import '@/styles/common.less' // 系统样式
import '@/styles/reset.less'// 系统样式

createApp(App).use(router).mount('#app')
```

- 项目使用自定义字体

```ts
// main.ts 文件

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

import '@/styles/common.less' // 系统样式
import '@/styles/reset.less'// 系统样式
import '@/styles/font.less' // 项目使用自定义字体

createApp(App).use(router).mount('#app')
```

```less
// /src/styles/font.less 文件

@font-face {
 font-family: GothamSSm-Light;
 src: url('@/assets/fonts/GothamSSm-Light.woff2');
}
```

```vue
// 任意 *.vue 文件使用自定义字体

<template>
  <div class="container">
    <Layouts />
  </div>
</template>


<script setup lang="ts">
import Layouts from '@/layouts/index.vue'
</script>

<style scoped lang="less">
.container {
  font-family: GothamSSm-Light; // 使用自定义字体
}
</style>
```

- 全局样式配置: 注意在 vite.config.ts 配置时，additionalData 对应的值后面要加分号，否则可能会编译报错

```less
// src/styles/var.less 文件

@color: #4f4b5c; // 字体颜色
@activeColor: #0084FF; // 字体颜色 active | 链接
```

```ts
// vite.config.ts 文件

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { // 别名配置
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: { // 全局样式配置
        additionalData: '@import "@/styles/var.less";',
        javascriptEnables: true
      }
    }
  }
})
```

```vue
// 任意 *.vue 文件中使用全局样式
<template>
  <div>
    <Layouts />
  </div>
</template>


<script setup lang="ts">
import Layouts from '@/layouts/index.vue'
</script>

<style scoped lang="less">
div {
  color: @activeColor; // 使用全局样式
}
</style>
```

## UI 库(Ant Design Vue 为例，具体组件可见其官网)

- 安装组件库（具体见组件库官网）

```bash
yarn add ant-design-vue@3.2.20
yarn add @ant-design/icons-vue  # 图标库
```

- main.ts 文件引入组件库

```ts
// main.ts 文件

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

import '@/styles/font.less'
import '@/styles/common.less'
import '@/styles/reset.less'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue'
Object.keys(Icons).forEach(key => {
 app.component(key, Icons[key as keyof typeof Icons])// 全局注册 Icons 组件
})

createApp(App).use(router).use(Antd).mount('#app')
```

- 任意 *.vue 组件使用组件库

```vue
<!-- 任意 *.vue 组件使用 UI 库 -->

<template>
  <div>
    <step-backward-outlined />
    <a-button>aaaaa</a-button>
  </div>
</template>

<script setup lang="ts">
</script>

```

## Pinia 封装

- 安装 pinia 、 pinia-plugin-persistedstate

```bash
yarn add pinia
yarn add pinia-plugin-persistedstate
```

- src/store/index.ts 文件中初始化 pinia

```ts
// src/store/index.ts 文件

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
```

- main.ts 文件引入 pinia

```ts
// main.ts 文件

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import pinia from '@/store'

import '@/styles/font.less'
import '@/styles/common.less'
import '@/styles/reset.less'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue'
Object.keys(Icons).forEach(key => {
 app.component(key, Icons[key as keyof typeof Icons])// 全局注册 Icons 组件
})

createApp(App).use(router).use(pinia).use(Antd).mount('#app')
```

- 数据持久化文件封装（src/store/piniaPersistConfig.ts）

```ts
// src/store/piniaPersistConfig.ts 文件


import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

/*
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state 的数据
 * @return persist
 */
const piniaPersistConfig = (key: string, paths?: string[]) => {
 const persist: PersistedStateOptions = {
  key,
  storage: localStorage,
  paths
 }
 return persist
}

export default piniaPersistConfig

```

- 封装某个模块的 store(如：src/store/modules/user.ts)

```ts
import { defineStore } from 'pinia'
import piniaPersistConfig from '@/store/piniaPersistConfig'

const useUserStore = defineStore({
 id: 'user-store',
 state: () => {
  return {
   token: '',
   userName: '',
   isLogin: ''
  }
 },
 getters: {},
 actions: {
  setToken(token: string) {
   this.token = token
  },
  setUserName(userName: string) {
   this.userName = userName
  }
 },
 persist: piniaPersistConfig('user-store', ['isLogin', 'userName']) // 持久化 state 中的 userName 和 isLogin 数据
})

export default useUserStore
```

- 任意 *.vue 、*.ts 等文件中使用 pinia

```vue
<template>
  <div>
    <Layouts />
    <a-button @click="onClick">改变 userName 的值</a-button>
    {{ userName }}
    {{ token }}
  </div>
</template>


<script setup lang="ts">
import Layouts from '@/layouts/index.vue'
import useUserStore from '@/store/modules/user'
import { storeToRefs } from 'pinia'

const { userName, token }  = storeToRefs(useUserStore())

const onClick = () => {
  useUserStore().setUserName('bob')
}

</script>

<style scoped lang="less">

</style>
```

## 环境变量配置 & 跨域配置

- .env 文件

```bash
#.env 文件

# 浏览器的 title
VITE_APP_TITLE = 'Funny Game Service'
# port
VITE_APP_PORT = 8081
# pnpm dev 时是否自动打开浏览器
VITE_APP_OPEN = true
```

- .env.development 文件

```bash
#.env.development 文件

# 本地环境
# 接口地址
VITE_APP_BASE_URL = 'https://devops-api.funnyland.io'
# 反向代理地址
VITE_APP_PROXY_TARGET_URL = 'http://devops-api.funnyland.io'
```

- .env.production 文件

```bash
#.env.production 文件

# 正式环境配置
# 接口地址
VITE_APP_BASE_URL = 'https://devops-api.funnyland.io'
# 反向代理地址
VITE_APP_PROXY_TARGET_URL = 'https://devops-api.funnyland.io'
```

- env.test 文件

```bash
#.env.test 文件

# 测试环境配置
# 接口地址
VITE_APP_BASE_URL = 'https://devops-api.funnyland.io'
# 反向代理地址
VITE_APP_PROXY_TARGET_URL = 'https://devops-api.funnyland.io'
```

- vite.config.ts 文件配置代理

```ts
// vite.config.ts 文件

import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
 const env = loadEnv(mode, process.cwd())
 return {
  plugins: [
   vue(),
  ],
  resolve: {
   alias: { // 别名配置
    '@': path.resolve(__dirname, 'src')
   }
  },
  css: {
   preprocessorOptions: {
    less: { // less 全局变量
     additionalData: '@import "@/styles/var.less";',
     javascriptEnabled: true
    }
   }
  },
  server: { // 跨域代理
   host: '0.0.0.0',
   port: Number(env.VITE_APP_PORT),
   open: env.VITE_APP_OPEN,
   proxy: {
    [env.VITE_APP_BASE_URL]: {
     target: env.VITE_APP_PROXY_TARGET_URL,
     changeOrigin: true,
     rewrite: (path: string) => path.replace(env.VITE_APP_BASE_URL, '')
    }
   }
  }
 }
})

```

## Axios 封装 & API

- 安装 axios

```bash
yarn add axios
```

- 封装 /src/api/request.ts 文件

```ts
// /src/api/request.ts 文件


import axios from 'axios'
import router from '@/router'
import { errorCode } from '@/api/errorCode'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/modules/user'
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

const service: AxiosInstance = axios.create({
 baseURL: import.meta.env.VITE_APP_BASE_URL,
 timeout: 60000,
 headers: {
  'Content-Type': 'application/json;charset=utf-8'
 }
})

service.interceptors.request.use(
 (config: InternalAxiosRequestConfig) => {
  if (useUserStore().token) {
   config.headers.Authorization = `Bear ${useUserStore().token}`
  }

  return config
 },
 (error: AxiosError) => {
  return Promise.reject(error)
 }
)

service.interceptors.response.use(
 (response: AxiosResponse) => {
  const status = response.status
  if (status === 200) {
   return response.data
  }

  if (status === 401) {
   router.replace('/login')
   useUserStore().setToken('')
  }

  message.error(errorCode(status))
  return Promise.reject(response.data.msg)
 },
 (error: AxiosError) => {
  return Promise.reject(error)
 }
)

export default service

```

- 封装 /src/api/errorCode.ts 文件

```ts
// /src/api/errorCode.ts 文件

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

```

- 封装 /src/api/interface.ts 文件

```ts
// /src/api/interface.ts 文件
export namespace Login {
 export interface IRequestLoginForm {
  userName: string
  password: string
 }

 export interface IResponseLogin {
  access_token: string
 }
}

```

- 封装 /src/api/modules/login.ts 文件

```ts
// /src/api/modules/login.ts 文件

import service from '@/api/request'
import { Login } from '@/api/interface'

export const loginApi = (data: Login.IRequestLoginForm) => {
 return service({
  method: 'post',
  data,
  url: ''
 })
}
```

## 自定义全局指令

- /src/directives/index.ts 文件

```ts
// /src/directives/index.ts 文件

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
```

- /src/directives/modules/throttle.ts 文件

```ts
// /src/directives/modules/throttle.ts 文件

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

```

- /src/directives/modules/debounce.ts 文件

```ts
// /src/directives/modules/debounce.ts 文件

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


```

- /src/directives/modules/closeOnClickOutside.ts 文件

```ts
// /src/directives/modules/closeOnClickOutside.ts 文件


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

```

- man.ts 文件中引入全局指令

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import pinia from '@/store'

import '@/styles/font.less'
import '@/styles/common.less'
import '@/styles/reset.less'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue'
Object.keys(Icons).forEach(key => {
 app.component(key, Icons[key as keyof typeof Icons])// 全局注册 Icons 组件
})

import directives from '@/directives/index' // 引入全局指令

createApp(App).use(router).use(pinia).use(Antd).use(directives).mount('#app')
```

## 支持 SVG 图标

- 安装 vite-plugin-svg-icons

```bash
yarn add vite-plugin-svg-icons
```

- vite.config.ts 配置插件

```ts
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
 const env = loadEnv(mode, process.cwd())
 return {
  plugins: [
   vue(),
   createSvgIconsPlugin({ // 配置 vite-plugin-svg-icons 插件
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // svg 图标所在文件夹地址
    symbolId: 'icon-[dir]-[name]' // 指定 symbolId 的格式
   })
  ],
  resolve: {
   alias: {
    '@': path.resolve(__dirname, 'src')
   }
  },
  css: {
   preprocessorOptions: {
    less: {
     additionalData: '@import "@/styles/var.less";',
     javascriptEnabled: true
    }
   }
  },
  server: {
   host: '0.0.0.0',
   port: Number(env.VITE_APP_PORT),
   open: env.VITE_APP_OPEN,
   proxy: {
    [env.VITE_APP_BASE_URL]: {
     target: env.VITE_APP_PROXY_TARGET_URL,
     changeOrigin: true,
     rewrite: (path: string) => path.replace(env.VITE_APP_BASE_URL, '')
    }
   }
  }
 }
})

```

- src/componnets/svg-icon.vue 组件封装

```vue
<!-- src/componnets/svg-icon.vue 组件封装 -->

<template>
 <svg :style="iconStyle" aria-hidden="true">
  <use :xlink:href="symbolId" />
 </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { CSSProperties, computed } from 'vue'

interface ISvgProps {
 name: string // 图标名称
 prefix?: string // 图标前缀
 iconStyle?: CSSProperties // 图标样式
}

const props = withDefaults(defineProps<ISvgProps>(), {
 prefix: 'icon',
 iconStyle: () => ({ width: '16px', height: '16px' })
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
```

- src/componnets/registerGlobalComponent.ts 文件

```ts
// src/componnets/registerGlobalComponent.ts 文件

import type { App } from 'vue'
import SvgIcon from '@/components/svg-icon.vue'
import CountUp from '@/components/count-up.vue'

const componentList = [
 {
  name: 'SvgIcon',
  component: SvgIcon
 },
 {
  name: 'CountUp',
  component: CountUp
 }
]

export function registerGlobalComponent(app: App) {
 componentList.forEach(item => {
  app.component(item.name, item.component)
 })
}
```

- main.ts 文件引入注册脚本 & 全局注册 svg-icon.vue 组件

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import pinia from '@/store'

const app = createApp(App)

import '@/styles/font.less'
import '@/styles/common.less'
import '@/styles/reset.less'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue'
Object.keys(Icons).forEach(key => {
 app.component(key, Icons[key as keyof typeof Icons])// 全局注册 Icons 组件
})

import directives from '@/directives/index'
import i18n from './language/i18n'

import 'virtual:svg-icons-register' // 引入注册脚本
import { registerGlobalComponent } from '@/components/registerGlobalComponent' // 全局注册 svg-icon.vue 组件
registerGlobalComponent(app)

app.use(router).use(pinia).use(Antd).use(directives).use(i18n).mount('#app')
```

- 任意文件中使用 svg 图标

```vue
<template>
 <div>
  <!-- 国际化 -->
  <div>{{ $t('download') }}</div>

  <!-- 滚动数字 -->
  <CountUp :end="1000" />

  <!-- svg 图标 -->
  <SvgIcon name="s3" :icon-style="{ width: '36px', height: '36px' }" />
 </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>

</style>
```

## 国际化

- 安装 vue-i18n@next

```bash
yarn add vue-i18n@next
```

- 新建 src/language/langs/en_US.json

```ts
{
  "download": "download" ,
  "upload": "upload",
  "play": "PLAY",
  "preparation": "preparation",
  "funnyLand": "Funny Land",
  "frogeGuiVersion": "froge gui v2.21.22",
  "localUploadTile": "local upload",
  "uploadingText": "uploading",
  "uploadSuccessText": "upload success",
  "uploadAgainText": "upload again",
  "uploadErrorText": "upload error",
  "uploadedText": "uploaded",
  "uploadFileTip": "Drag and drop the game client here to upload",
  "emptyDownloadText": "no download tasks",
  "onlyDirText": "only supports folders"
}
```

- 新建 src/language/langs/zh_CN.json

```ts
{
  "download": "下载" ,
  "upload": "上传",
  "play": "开始游戏",
  "preparation": "准备中",
  "funnyLand": "Funny Land",
  "frogeGuiVersion": "froge gui v2.21.22",
  "localUploadTile": "本地上传",
  "uploadingText": "正在上传中...",
  "uploadSuccessText": "上传成功",
  "uploadErrorText": "上传失败",
  "uploadAgainText": "重新上传",
  "uploadedText": "已上传",
  "uploadFileTip": "将游戏客户端拖拽到此处即可上传",
  "emptyDownloadText": "暂无下载任务",
  "onlyDirText": "仅支持文件夹"
}
```

- 新建 src/language/langs/ru_RU.json

```ts
{
  "download": "Скачать" ,
  "upload": "Загрузить",
  "play": "Начать игру",
  "preparation": "Готово.",
  "funnyLand": "Funny Land",
  "frogeGuiVersion": "froge gui v2.21.22",
  "localUploadTile": "Локальная загрузка",
  "uploadingText": "Загрузить",
  "uploadSuccessText": "Удалось загрузить",
  "uploadAgainText": "Перезагрузить",
  "uploadErrorText": "Ошибка загрузки",
  "uploadedText": "Загрузка",
  "uploadFileTip": "Перетащите игровой клиент сюда и загрузите его.",
  "emptyDownloadText": "Нет задачи загрузки",
  "onlyDirText": "Поддержка только папок"
}
```

- 新建 src/language/i18nts

```ts
import { createI18n } from 'vue-i18n'
import en_US from './langs/en_US.json' // 英语
import zh_CN from './langs/zh_CN.json' // 中文
import ru_RU from './langs/ru_RU.json' // 俄罗斯语

const getLocale = () => {
  let locale = 'ru_RU'
  if (localStorage.getItem('locale')) {
    locale = localStorage.getItem('locale') || 'ru_RU'
  }
  return locale
}
const messages = { en_US, zh_CN, ru_RU }

const i18n = createI18n({
  legacy: true,
  locale: getLocale(),
  messages
})

export default i18n
```

- main.ts 入口文件添加 i18n

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import pinia from '@/store'

import '@/styles/font.less'
import '@/styles/common.less'
import '@/styles/reset.less'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as Icons from '@ant-design/icons-vue'
Object.keys(Icons).forEach(key => {
 app.component(key, Icons[key as keyof typeof Icons])// 全局注册 Icons 组件
})

import directives from '@/directives/index'
import i18n from './language/i18n' // 引入 i18n

createApp(App).use(router).use(pinia).use(Antd).use(directives).use(i18n).mount('#app')
```

- 任意组件中使用 i18n

```vue
<template>
 <div>{{ $t('download') }}</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```

- 注意，上面是自定义字体的国际化，如果是要对第三方组件库中的字体国际化，那么请前往第三方组件库官网中查看这部分的内容

## 统一编辑器编码规范及风格

- [官方网站](https://editorconfig.org/)
- vscode 扩展搜索 EditorConfig for VS Code，并下载安装
- 项目根目录创建 .editorconfig 文件

```text
# .editorconfig 文件
# https://editorconfig.org/

root = true

# 表示所有的文件适用
[*]
# 设置文件字符集为 utf-8
charset = utf-8
# 控制换行类型（lf  | cr  |  crlf）
end_of_line = lf
# 缩进风格（tab | sapce）
indent_style = tab
# 缩进大小
indent_size = 2
# tab 缩进大小（当 indent_style 设置为 tab 时可用）
tab_width = 2
# 始终在文件末尾插入一个新行
insert_final_newline = true


# md 文件使用以下规则
[*.md]
# 关闭最大行长度限制
max_line_length = off
# 关闭末尾空格修剪
trim_trailing_whitespace = false
```

## browserslist

- [github](https://github.com/browserslist/browserslist)
- 介绍：在不同前端工具之间共享目标浏览器和 Node.js 版本的配置。在前端项目中可以根据提供的目标浏览器环境，智能添加 css 前缀 及 js 的polyfill，以此来兼容旧版本浏览器。避免不必要的兼容代码，提高代码的编译质量
- 配置方式1：package.json中配置 browserslist 字段

```json
{
  "name": "ui",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build:dev": "vue-tsc && vite build --mode development",
    "build:prod": "vue-tsc && vite build --mode production",
    "build:test": "vue-tsc && vite build --mode test",
    "preview": "vite preview"
  },
  "dependencies": {
    "ant-design-vue": "^4.1.2",
    "axios": "^1.6.8",
    "countup.js": "^2.8.0",
    "less": "^4.2.0",
    "less-loader": "^12.2.0",
    "nprogress": "^0.2.0",
    "pinia": "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    "vite-plugin-svg-icons": "^2.0.1",
    "vue": "^3.4.21",
    "vue-i18n": "^9.9.0",
    "vue-router": "4"
  },
  "devDependencies": {
    "@types/nprogress": "^0.2.3",
    "@vitejs/plugin-vue": "^5.0.4",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "vue-tsc": "^2.0.6"
  },
 "browserslist": [
  "> 1%",
  "last 2 versions",
  "not dead"
 ]
}
```

- 配置方式2：新建 .browserslistrc 文件

```text
> 1%
last 2 versions
not dead
```

## 代码风格&质量检测（eslint）

## 代码美化 (prettier)

## 样式美化（stylelint）

## 提交规范（husky+lint-staged+commitlint+commitizen+cz-git）
