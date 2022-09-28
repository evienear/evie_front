import Vue from 'vue'
import App from './App.vue'
import initI18n from '@/plugins/i18n'
import router from './Routes'
import store from './store/index'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
//import axios from "axios";
import VueAnimateOnScroll from 'vue-animate-onscroll';
import VueApexCharts from 'vue-apexcharts'
import vueDebounce from 'vue-debounce'
import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueApexCharts)
Vue.use(vueDebounce)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueFileAgent)
Vue.use(VueAnimateOnScroll);
const i18n = initI18n("ES", "US");

Vue.use(Toast);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App), store
}).$mount('#app')
