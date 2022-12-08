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
import VueApexchart from 'vue-apexcharts'
import vueDebounce from 'vue-debounce'
import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';


if (!String.prototype.limitString) {
  String.prototype.limitString = function(limit) {
    if (this.length > limit) return `${this.substring(0, limit)}...`
    return this
  }
}

if (!String.prototype.cutString) {
  String.prototype.cutString = function(start = 7, end = 4) {
    if (this.length > start + end) return `${this.substring(0, start)}...${this.substring(this.length - end, this.length)}`;
    return this
  }
}

if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function(by) {
    return this.reduce((acc, obj) => {
      const key = obj[by];
      const curGroup = acc[key] ?? [];
      
      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
  }
}

if (!Array.prototype.groupAtPairs) {
  Array.prototype.groupAtPairs = function() {
    const pairs = this.filter((item, i) => i % 2 === 0);
    const unpairs = this.filter((item, i) => i % 2 !== 0);
    
    return unpairs.map((item, i) => [unpairs[i], pairs[i]])
  }
}


Vue.use(VueApexchart)
Vue.use(vueDebounce)
Vue.component('VueApexchart', VueApexchart)
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
