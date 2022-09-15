<template>
  <section id="education" class="nftProjects relative">
    <v-col class="padd">
      <aside class="divrow" style="gap: 20px">
        <button class="botonBack center" @click="$router.push('/education')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h1 class="tituloBack p">NFT PROJECTS</h1>
      </aside>
    </v-col>

    <v-col class="containerNFTProjects padd">
      <v-card v-for="(item,i) in dataNFTProjects" :key="i" color="transparent" @click="viewEducation(item)">
        <img class="images" :src="item.images[0]" alt="token" />
        <span>{{ item.title }}</span>
      </v-card>
    </v-col>

    <button v-show="account_id === 'lindaley16.near' || account_id === 'sirs.near' || account_id === 'andresdom.near'" class="button h9 btn2" @click="viewForm()">
      PROJECT PROPOSAL<v-icon medium>mdi-chevron-right</v-icon>
    </button>
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
      account_id: localStorage.walletAccountId
    }
  },
  mounted() {
    // this.collections()
    this.getForm()
  },
  methods: {
    viewForm() {
      // console.log('viewForm')
      
      this.$router.push('/form')
    },
    async getForm() {
      await axios.post('https://evie.pro:3070/api/v1/ListFormEdu').then(response => {
        // console.log(response)
        this.dataNFTProjects = response.data
      }).catch(err => { console.log(err) })
      // // connect to NEAR
      // const near = await connect(
      //   CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
      // );
      // // create wallet connection
      // const wallet = new WalletConnection(near);
      // if (wallet.isSignedIn()) {
      //   this.$store.commit('Load', true)

      //   const contract = new Contract(wallet.account(), CONTRACT_NAME, {
      //     changeMethods: ["get_forms"],
      //     sender: wallet.account(),
      //   })
      //   await contract.get_forms({
      //     from_index: '0',
      //     limit: 50
      //   }, '85000000000000',
      //   ).then((response) => {
      //     // console.log(response);
      //     this.$store.commit('Load', false)
      //     this.dataNFTProjects = response
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // }
    },
    viewEducation(item) {
      // console.log(item)
      localStorage.idForm = item.id
      this.$router.push('/project-proposal')
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
