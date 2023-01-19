<template>
  <section>
    <MenuHeader ref="menu"></MenuHeader>
    <ModalConnect ref="connect"></ModalConnect>
    
    <v-app-bar
      id="headerApp"
      height="120px"
      fixed
    >
      <v-row no-gutters>
        <v-col cols="12" sm="11" class="space align" style="gap:1em">
          <router-link to="/">
            <img class="navLogo" :src="`${$store.state.baseURL}themes/${$store.state.theme}/logo.svg`" alt="logo">
          </router-link>

          <aside class="contNavbar" style="gap:1em">
            <button v-for="(item,i) in dataNavbar" :key="i" class="navBtn divcol center eliminarmobile"
              @click="$router.push(item.to)">
            <!-- <button v-for="(item,i) in dataNavbar" :key="i" class="navBtn divcol center eliminarmobile"
              @click="$router.push(item.to);dataNavbar.forEach(e=>{e.state='-outline'});item.state=''"> -->
              <!-- <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/${item.key}${item.state}.svg`" alt="navigation icons"> -->
              <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/${item.key}.svg`" alt="navigation icons">
              <span>{{item.name}}</span>
            </button>

            <button class="sesionBtn btn" @click="!sesion ? $refs.connect.modalConnect = true : loginNear()">
              <span>{{user}}</span>
            </button>


            <button class="vermobile" @click="MenuHeaderMobile()">
              <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/toggle.svg`" alt="toggle navbar">
            </button>
          </aside>
          <!-- <aside @click="logout()" style="cursor:pointer">
            <v-icon>mdi-logout</v-icon>
          </aside> -->
        </v-col>
      </v-row>
    </v-app-bar>
  </section>
</template>

<script>
import axios from 'axios'
import MenuHeader from "./MenuHeader.vue"
import ModalConnect from "@/components/modals/connect";
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, /*Contract*/ } = nearAPI;
// const contractIdTestnet = 'backend.evie.testnet'
const contractId = 'backend.eviepro.near'
let scrollValue =
document.body.scrollTop || document.documentElement.scrollTop;
// let ubicacionPrincipal = window.pageYOffset;
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
  components: {MenuHeader, ModalConnect},
  i18n: require("./i18n"),
  data() {
    return {
      menuHeader: true,
      user: 'Connect Wallet',
      sesion: false,
      dataNavbar: [
        {
          key: "buy",
          state: "-outline",
          name: "Buy",
          to: "/"
        },
        {
          key: "buy-limit",
          state: "-outline",
          name: "Buy Limit",
          to: "/coming-soon"
        },
        {
          key: "sell",
          state: "-outline",
          name: "Sell",
          to: "/sell"
        },
        {
          key: "stats",
          state: "-outline",
          name: "Stats",
          to: "/stats"
        },
        {
          key: "education",
          state: "-outline",
          name: "Education",
          to: "/education"
        },
        {
          key: "games",
          state: "-outline",
          name: "Games",
          to: "/games"
        },
        {
          key: "calendar",
          state: "-outline",
          name: "Calendar",
          to: "/mint-calendar"
        },
        {
          key: "faq",
          state: "-outline",
          name: "FAQ",
          to: "/faq"
        },
      ],
    };
  },
  created() {
    if (window.innerWidth <= 880) {this.menuHeader = false}
    else {this.menuHeader = true}
  },
  methods: {
    MenuHeaderMobile() {
      this.$refs.menu.menuHeaderMobile = true;
    },
    OpenDialog() {
      this.$refs.menu.dialog = true;
    },
    OcultarNavbar() {
      let Desplazamiento_Actual = window.pageYOffset;
      //     // in top
      if (Desplazamiento_Actual > scrollValue) {
        document.getElementById("headerApp").style.background = "var(--bg)";
      } else {
        document.getElementById("headerApp").style.background = "transparent";
      }
    },
    scrollListener() {resizeThrottler(this.OcultarNavbar)},

    async loginNear(key) {
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      const wallet = new WalletConnection(near);
      const nearWallet = "https://wallet.mainnet.near.org"
      const myNearWallet = "https://app.mynearwallet.com/"
      if (!this.sesion && key === 'near') {
        localStorage.setItem("walletBaseUrl", nearWallet)
        wallet._walletBaseUrl = nearWallet
      } else if (!this.sesion && key === 'myNear') {
        localStorage.setItem("walletBaseUrl", myNearWallet)
        wallet._walletBaseUrl = myNearWallet
      } else if (!this.sesion && key === 'sender') {
        return alert("comming soon")
      } else if (this.sesion) {
        wallet.signOut();
        this.user = "Connect Wallet";
        this.sesion = false;
        localStorage.sesion = false;
        return this.$router.go();
      }
      wallet.requestSignIn(contractId);
    },

    // async loginNear(key) {
      // if(key === undefined) {
      //   localStorage.network = 'near'
      // } else {
      //   localStorage.network = key
      // }
      

      // var contract = ''
      // if (!this.sesion && key === 'near') {
      //   contract = contractId
      // } else if (!this.sesion && key === 'myNear') {
      //   contract = contractId
      // } else if (!this.sesion && key === 'testnet'){
      //   contract = contractIdTestnet
      // } else if (!this.sesion && key === 'sender') {
      //   return alert("comming soon")
      // } else if (this.sesion) {
      //   localStorage.network = 'near'
      //   console.log('sesion true')
      //   wallet.signOut();
      //   this.user = "Connect Wallet";
      //   this.sesion = false;
      //   localStorage.sesion = false;
      //   return this.$router.go();
      // }


    //   wallet.requestSignIn(contractId);
        
    // },
    async isSigned() {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      if (wallet.isSignedIn()) {
        this.sesion = true;
        localStorage.sesion = true;
        // returns account Id as string
        const walletAccountId = wallet.getAccountId();
        this.user = walletAccountId
        localStorage.walletAccountId = walletAccountId

        axios.post('https://evie.pro:3070/api/v1/validadmin', {
          "user": walletAccountId
        }).then(response => {
          localStorage.isAdmin = response.data.respuesta
        }).catch(err =>{
          console.log(err)
        })
      }
    },
    logout() {
      console.log('logout')
      localStorage.login = 'false'
      localStorage.removeItem('isAdmin')
      this.$router.push('/login')
    }
  },
  mounted() {
    this.isSigned()
    document.getElementById("headerApp").style.background = "transparent";
    document.addEventListener('scroll', this.scrollListener);
    // var root = this.$router.currentRoute.name;
    // if (root=='home') {root='buy'}
    // const index = this.dataNavbar.findIndex(e=>e.key==root)
    // this.dataNavbar.forEach(e=>{e.state='-outline'});
    // this.dataNavbar[index].state=''
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollListener);
  },
};
</script>

<style src="./layout.scss" lang="scss" />
