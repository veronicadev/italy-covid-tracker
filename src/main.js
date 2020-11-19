import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './common/filters';
import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/custom.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {i18nTranslation} from './common/i18n'

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// VueI18n
Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: i18nTranslation
});

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')

