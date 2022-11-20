<template>
  <section id="education" class="nftProjects relative">
    <v-col class="padd">
      <aside class="divrow" style="gap: 20px">
        <button class="botonBack center" @click="$router.push('/education')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h1 class="tituloBack p">NFT PROJECTS</h1>
      </aside>

      <v-carousel
        id="blockhain-carousel"
        class="my-1"
        v-model="modelCarousel"
        height="max-content"
        hide-delimiters
        :show-arrows="dataBlockchain.length > columnsCarousel() ? true : false"
      >
        <template v-for="(item, index) in dataBlockchain">
          <v-carousel-item v-if="(index + 1) % columnsCarousel() === 1 || columnsCarousel() === 1" :key="index">
            <template v-for="(n,i) in columnsCarousel()">
              <template v-if="(+index + i) < dataBlockchain.length">
                <button :key="i" @click="selectBlockchain(dataBlockchain[+index + i].chain)">
                  <img :src="require(`@/assets/chains/${dataBlockchain[+index + i].chain}.svg`)" :alt="`${dataBlockchain[+index + i].chain} chain`">
                </button>
              </template>
            </template>
          </v-carousel-item>
        </template>
      </v-carousel>
    </v-col>

    <v-col class="containerNFTProjects padd">
      <v-card v-for="(item,i) in filter_dataNFTProjects" :key="i" color="transparent" @click="viewEducation(item)">
        <img class="images" :src="item.images[0]" alt="token" />
        <span>{{ item.title }}</span>
      </v-card>
    </v-col>

    <button v-show="isAdmin==='true'" class="button h9 btn2" @click="viewForm()">
      PROJECT PROPOSAL<v-icon medium>mdi-chevron-right</v-icon>
    </button>
    <v-dialog
      id="dialogo"
      v-model="dialog"
      max-width="500"
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <h5>
            <span>
              Verify password
            </span>
          </h5>
        </v-col>
        <v-col cols="12">
          <p>
            <span>You must enter your administrator password to create an educational form</span>
          </p>
        </v-col>
        <v-col cols="12" class="center">
          <v-text-field
            v-model="pass"
            class="custome"
            solo dense
          >
            <template v-slot:prepend>
              <label>Password</label>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <button  class="button h9 btn2" @click="savePass()">
            SAVE
          </button>
          <button  class="button h9 btn2 ml-2" @click="closeModalMessage()">
            CLOSE
          </button>
        </v-col>
      </section>
    </v-dialog>
  </section>
</template>

<script>
import axios from 'axios'
// import * as nearAPI from "near-api-js";
// import { CONFIG } from "@/services/api";
// const { connect, keyStores, WalletConnection, Contract } = nearAPI;
// // const CONTRACT_NAME = 'backend.evie.testnet'
// const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "NFTProjects",
  data() {
    return {
      dataNFTProjects: [],
      account_id: localStorage.walletAccountId,
      isAdmin: localStorage.isAdmin,
      dialog: false,
      pass: '',
      
      modelCarousel: 0,
      currentBlockchain: "near",
      dataBlockchain: [
        {chain: "ethereum"},
        {chain: "solana"},
        {chain: "aptos"},
        {chain: "near"},
        {chain: "aurora"},
        {chain: "cardano"},
        {chain: "polygon"},
        {chain: "algorand"},
        {chain: "binance"},
        {chain: "avax"},
      ],
    }
  },
  computed: {
    filter_dataNFTProjects() {
      if (this.currentBlockchain === 'near') {
        return this.dataNFTProjects.filter(data => data.blockchain === "NEAR")
      } else if (this.currentBlockchain === 'ethereum') {
        return this.dataNFTProjects.filter(data => data.blockchain === this.currentBlockchain)
      } else if (this.currentBlockchain === 'solana') {
        return this.dataNFTProjects.filter(data => data.blockchain === this.currentBlockchain)
      } else if (this.currentBlockchain === 'aptos') {
        return this.dataNFTProjects.filter(data => data.blockchain === this.currentBlockchain)
      }
      return []
    },
  },
  mounted() {
    // axios.post('https://evie.pro:3070/api/v1/RefrescarFormEdu').then(response => {
    //   console.log(response)
    // })
    console.log(typeof(this.isAdmin), 'admin')
    this.getForm()
    window.addEventListener("resize", this.reloadCarousel)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.reloadCarousel)
  },
  methods: {
    reloadCarousel() {
      const reload = this.modelCarousel
      this.modelCarousel = -1
      this.modelCarousel = reload
    },
    viewForm() {
      if(localStorage.pass) {
        localStorage.removeItem('idForm')
        this.$router.push('/form')
      } else {
        this.dialog = true
      }
      
    },
    async getForm() {
      this.$store.commit('Load', true)
      axios.post('https://evie.pro:3070/api/v1/listformedu', {
        "limit": 1000,
        "index": 0
      }).then(response => {
        // console.log(response)
        this.dataNFTProjects = response.data
        this.$store.commit('Load', false)
      }).catch(err => {
        console.log(err)
      })
    },
    viewEducation(item) {
      setTimeout(() => {
        localStorage.idForm = item.id
        localStorage.vieneDe = 'nftprojects'
        this.$router.push('/project-proposal')
      }, 1000)
    },
    savePass() {
      localStorage.pass = this.pass
      this.dialog = false
    },
    closeModalMessage() {
      this.dialog = false
      this.pass = ''
    },
    columnsCarousel() {
      if (window.innerWidth >= 1110) {
        return 21
      } else if (window.innerWidth >= 880) {
        return 15
      } else if (window.innerWidth >= 600) {
        return 10
      } else if (window.innerWidth >= 450) {
        return 7
      } else if (window.innerWidth >= 300) {
        return 5
      } else {
        return 4
      }
    },
    selectBlockchain(chain) {
      localStorage.setItem("currentBlockchain", chain)
      this.currentBlockchain = chain
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
