import Vue from 'vue'
import App from './App.vue'

import tinymce from 'tinymce'
// import VueTinymce from './components/vue-tinymce.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.prototype.$tinymce = tinymce // 将全局tinymce对象指向给Vue作用域下
// Vue.use(VueTinymce);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
