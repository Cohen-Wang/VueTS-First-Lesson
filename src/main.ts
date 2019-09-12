import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/http'

/** 引用 **/
Vue.use(ElementUI);

Vue.config.productionTip = false;

/**
 * axios并没有install 方法，所以是不能使用vue.use()方法的。
 * 引入axios，并加到原型链中
 */
Vue.prototype.$axios = axios;
console.dir(Vue);


/**
 * 根目录调用
 *
 */
new Vue({

  router,
  store,
  render: h => h(App)

}).$mount('#app');
