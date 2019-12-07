import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入字体图标样式
import './style/iconfont.css'

//导入vant ui框架
import Vant from 'vant'
import 'vant/lib/index.css'

import dayjs from 'dayjs'

import login from './utils/login'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import 'dayjs/locale/zh-cn' // 按需加载
dayjs.locale('zh-cn') 
Vue.filter('spaceTime', function (value) {
  // value 是使用这个过滤器的字符串
  return dayjs().from(dayjs(value))
})

Vue.use(Vant)

Vue.use(login)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
