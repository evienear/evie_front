import Vue from 'vue'
import App from './App.vue'
import initI18n from '@/plugins/i18n'
import router from './Routes'
import store from './store/index'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from "axios";
import VueAnimateOnScroll from 'vue-animate-onscroll';
import VueApexCharts from 'vue-apexcharts'
import { initContract } from './utils'
import AsyncComputed from 'vue-async-computed'

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use(VueAnimateOnScroll);
const i18n = initI18n("ES", "US");
Vue.use(AsyncComputed)
Vue.use(axios);

Vue.use(Toast);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

axios.post('http://157.230.2.213:3080/api/near/getLandingPage', {
  receivedAccount: 'jeph.testnet',
  listReceivedContract: ['paras-token-v2.testnet']
})
.then(function (response) {
  console.log("GetLanding");
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

Vue.config.productionTip = false

window.nearInitPromise = initContract()
  .then(() => {
    new Vue({
      vuetify,
      router,
      i18n,
      render: h => h(App), store
    }).$mount('#app')
  })

