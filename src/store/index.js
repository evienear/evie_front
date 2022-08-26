import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

  namespace: true,
  state: {
    baseURL: process.env.BASE_URL,
    theme: "light",
    overlay: { opacity: 0.2, color: "white" },
    load: false,
  },
  mutations: {
    CambiarTheme(state, theme) {state.theme = theme},
    OverlayMethod(state, theme) {
      if (theme == "dark") {state.overlay.opacity = "0.5";state.overlay.color = "black"}
      if (theme == "light") {state.overlay.opacity = "0.2";state.overlay.color = "white"}
    },
    Load(state, key) {
      if(key == true) {state.load = true} else if(key == false) {state.load = false}
    },
  },
  actions: {
    CambiarTheme({state, commit}, {theme, element}) {
      element.href = `${state.baseURL}themes/${theme}/theme.css`;
      localStorage.setItem("theme", theme);
      commit( "CambiarTheme", theme)
    },
    // OverlayMethod({commit}, {theme}) {}
  },
});
