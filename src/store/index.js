import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/Routes';

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
    Message({commit}, {key, title, desc}) {
      const dialog = router.app.$children[0].$children[0].$children[0].$children
      .find(data => data.$el === document.querySelector("#dialog.message-dialog"))
      
      if (key === 'success') {
        dialog.title = title || "Success"
        dialog.desc = desc || "the operation has been successfully completed"
      } else if (key === 'cancel') {
        dialog.title = title || "Error"
        dialog.desc = desc || "An error has been ocurred"
      } else {
        dialog.title = title
        dialog.desc = desc
      }
      dialog.messageDialog = true
      console.log(commit)
    },
    formData(form) {
      const formData = new FormData();
      for (const [keys, values] of Object.entries(form)) {
        // set empty string in null 
        if (form[keys] && typeof form[keys] === "object") {
          Object.keys(values).forEach(key => { values[key] ??= "" })
        } else { form[keys] ??= "" }
        
        // push to form data
        const
          excludeUrl = !(/\.(gif|jpg|jpeg|tiff|png)$/i).test(values),
          file = values?.type;
        if (typeof values === 'object' && !file) { formData.append(keys, JSON.stringify(values).toLowerCase()) } // if object only
        else if (file) { formData.append(keys, values) } // if file object
        else if (excludeUrl) { formData.append(keys, typeof values === 'string' ? values.toLowerCase() : values || "") } // else
      }
      return formData
    }
    // OverlayMethod({commit}, {theme}) {}
  },
});
