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
