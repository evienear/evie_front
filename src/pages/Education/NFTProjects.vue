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
        "limit": 10,
        "index": 0
      }).then(response => {
        console.log(response.data)
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
    }
  }
};
</script>

<style src="../pages.scss" lang="scss" />
