<template>
  <section>
    <!-- mobile -->

    <!-- desktop -->
    <v-app-bar
    id="headerApp"
    color="transparent"
    height="100px"
    fixed
  >
    <v-row>
      <v-col cols="12" sm="11" md="11" class="divrow space align paddbottomdel">
        <router-link to="/">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/logo.png`" alt="logo">
        </router-link>
        <aside class="divrow center" v-if="signedIn">
          <span class="h9 openMenuCollections" style="font-weight: bold">SEARCH BY COLLECTIONS</span>
            <button v-if="themeButton" class="relative" @click="CambiarTheme('dark'), CambiarTheme2('dark')"
              style="width: 80px; border-radius: 30px; color: transparent">
              .
              <div class="containerSwitchTheme" />
              <div class="switchTheme" />
              <div />
            </button>
            <button v-else class="relative" @click="CambiarTheme('light'), CambiarTheme2('light')"
              style="width: 80px; border-radius: 30px; color: transparent">
              .
              <div class="containerSwitchThemeDark" />
              <div class="switchThemeDark" />
              <div />
            </button>
            <span class="h9" style="font-weight: bold">{{accountId}}</span> 
          <v-btn icon>
            <v-icon medium>mdi-account-circle-outline</v-icon>
          </v-btn>
          <v-btn color="transparent" class="openMenuHeader">
            <v-icon medium>mdi-menu</v-icon>
          </v-btn>
          
          <!-- <v-btn color="transparent">
            <button v-on:click="logout" medium>{{accountId}}</button>
             <v-icon medium>mdi-logout</v-icon>
          </v-btn> -->
        </aside>
        

        <aside class="center" v-else>
          <button v-if="themeButton" class="relative" @click="CambiarTheme('dark'), CambiarTheme2('dark')"
              style="width: 80px; border-radius: 30px; color: transparent">
              .
              <div class="containerSwitchTheme" />
              <div class="switchTheme" />
              <div />
            </button>
            <button v-else class="relative" @click="CambiarTheme('light'), CambiarTheme2('light')"
              style="width: 80px; border-radius: 30px; color: transparent">
              .
              <div class="containerSwitchThemeDark" />
              <div class="switchThemeDark" />
              <div />
            </button>
            <v-btn color="transparent">
              
              <span class="h9" style="" v-on:click="login">Sign in</span> 
            </v-btn>
          </aside>

        
        
      </v-col>
    </v-row>
  </v-app-bar>

  <MenuHeader ref="menu"></MenuHeader>
  </section>
</template>

<script>
import MenuHeader from "./MenuHeader.vue";
import { login, logout } from "../../utils";
let ubicacionPrincipal = window.pageYOffset;
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();
      // The actualResizeHandler will execute at a rate of 15fps
    }, 80);
  }
}
export default {
  name: "Header",
  components: {
    MenuHeader
  },
  i18n: require("./i18n"),
  created() {
    this.element = document.getElementById("theme");
    const theme = localStorage.getItem("theme");
    if (theme) {
      this.CambiarTheme(theme);
    }
    if (theme == "light") {
      this.themeButton = true;
    }
    if (theme == "dark") {
      this.themeButton = false;
    }
  },
  data() {
    return {
      themeButton: true,
    };
  },
  computed: {
    accountId() {
      console.log(window.accountId)
     // console.log(this.contractBalance)
     
      return window.accountId;
    },
    signedIn() {
      return window.walletConnection.isSignedIn();
    },
    contractBalance(){
      
      
      return window.contractBalance;
    }
  },
  asyncComputed: {
     getBalance(){
      return window.contractBalance.then(balance => balance.total)
    },
  },
  methods: {

    CambiarTheme(theme) {
      this.$store.dispatch("CambiarTheme", { theme, element: this.element });
      this.themeButton = !this.themeButton;
    },
    CambiarTheme2(theme) {
      this.$refs.menu.OverlayMethod(theme);
      this.$parent.$children[0].$children[0].$refs.menu.OverlayMethod(theme)
    },
    OcultarNavbar() {
      let Desplazamiento_Actual = window.pageYOffset;
      if (ubicacionPrincipal >= Desplazamiento_Actual) {
        document.getElementById("headerApp").style.top = "0";
      } else {
        document.getElementById("headerApp").style.top = "-100px";
      }
      ubicacionPrincipal = Desplazamiento_Actual;
    },
    scrollListener() {
      resizeThrottler(this.OcultarNavbar);
    },
    login() {
      console.log("calling utils.login");
      login();
      
    },
    logout: logout
  },
  mounted() {
    document.addEventListener('scroll', this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollListener);
  }
};
</script>

<style src="./layout.scss" lang="scss" />