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

    <button v-show="account_id === 'lindaley16.near' || account_id === 'sirs.near' || account_id === 'andresdom.near' || account_id === 'leyner.near'" class="button h9 btn2" @click="viewForm()">
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
    axios.post('https://evie.pro:3070/api/v1/RefrescarFormEdu').then(response => {
      console.log(response)
    })
    this.getForm()
  },
  methods: {
    viewForm() {
      localStorage.removeItem('idForm')
      this.$router.push('/form')
    },
    async getForm() {
      await axios.post('https://evie.pro:3070/api/v1/ListFormEdu').then(response => {
        this.dataNFTProjects = response.data
      }).catch(err => { console.log(err) })
    },
    viewEducation(item) {
      localStorage.idForm = item.id
      localStorage.vieneDe = 'nftprojects'
      this.$router.push('/project-proposal')
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
