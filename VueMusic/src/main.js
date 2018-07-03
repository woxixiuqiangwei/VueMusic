// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//入口！
import store from './store'
import  'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index.styl'

//Vue.config.productionTip = false

//解决按钮或者div的点击没有3秒的延迟
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-new */

new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  store
  // template: '<App/>',
  // components: { App }
})
