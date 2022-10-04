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
        <img class="images" :src="item.form.images[0]" alt="token" />
        <span>{{ item.form.title }}</span>
      </v-card>
    </v-col>

    <button v-show="isAdmin==='true'" class="button h9 btn2" @click="viewForm()">
      PROJECT PROPOSAL<v-icon medium>mdi-chevron-right</v-icon>
    </button>
  </section>
</template>

<script>
import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract } = nearAPI;
// // const CONTRACT_NAME = 'backend.evie.testnet'
const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "NFTProjects",
  data() {
    return {
      dataNFTProjects: [],
      account_id: localStorage.walletAccountId,
      isAdmin: localStorage.isAdmin,
    }
  },
  mounted() {
    axios.post('https://evie.pro:3070/api/v1/RefrescarFormEdu').then(response => {
      console.log(response)
    })
    console.log(typeof(this.isAdmin), 'admin')
    this.getForm()
  },
  methods: {
    viewForm() {
      localStorage.removeItem('idForm')
      this.$router.push('/form')
    },
    async getForm() {
      // await axios.post('https://evie.pro:3070/api/v1/ListFormEdu').then(response => {
      //   console.log(response.data)
      //   this.dataNFTProjects = response.data
      // }).catch(err => { console.log(err) })
      // connect to NEAR
      this.$store.commit('Load', true)
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore()
        )
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ["get_forms"],
        sender: wallet.account(),
      })
      await contract.get_forms().then((response) => {
        this.$store.commit('Load', false)
        this.dataNFTProjects = response
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
  }
};
</script>

<style src="../pages.scss" lang="scss" />
