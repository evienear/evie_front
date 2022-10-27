<template>
  <section id="projectProposal" class="relative">
    <v-col class="padd">
      <aside class="divrow" style="gap: clamp(0.2em, 2.2vw, 1.25em)">
        <button class="botonBack center" @click="$router.push('/nft-projects')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h1 class="tituloBack p">PROJECT PROPOSAL</h1>
      </aside>

      <!-- <aside class="contenedor1 start">
        <span class="h9-em">BUY FROM:</span>
        <aside class="divrow">
          <v-btn v-for="(item,i) in dataMarketplace" :key="i" icon disabled>
            <img :src="item.market" alt="button">
          </v-btn>
        </aside>
      </aside> -->
    </v-col>

    <v-col class="container2">
      <ul class="mb-5"> 
        <li v-for="(item,i) in dataProjectProposal.lista" :key="i">
            
            <img class="marker imgC" :src="item.market" :alt="item.listen" :title="item.listen">
            <span class="ml-3 ml-md-0">Listen: {{ item.listen }}</span>
          
          <!-- <span>Floor Price: {{ item.price }}
            <img class="nearBalanceLogo filter" src="@/assets/logo/near.svg" alt="near">
          </span>
          <span>Monthly Volume: $ {{ item.volume}}</span>
          <span>Total Volumen: $ {{ item.total }}</span> -->
        </li>
      </ul>

      <section class="contRight" v-for="item, i in dataProjectProposal.description" :key="i">
        <aside>
          <img class="images" :src="item.images[0]" alt="nft">
          <div>
            <h3 class="Title">{{ item.title }}</h3>
            <span><strong>Origianl Supply: </strong>{{ item.supply }}</span>
            <span><strong>Website: </strong>{{ item.website }}</span>
            <span><strong>Twitter: </strong>{{ item.twitter }}</span>
            <span><strong>Instagram: </strong>{{ item.instagram }}</span>
            <span><strong>Discord: </strong>{{ item.discord }}</span>
          </div>
        </aside>

        <aside>
          <!-- <img v-if="dataProjectProposal.description.img" :src="dataProjectProposal.description.img" 
            alt="image">-->
          <h3 class="Title">ABOUT:</h3>
          <span v-html="item.descriptions[0]"></span>
        </aside>
        <aside>
          <v-col>
            <!-- <button class="button h9 btn2" @click="addForm()"> -->
            <button v-show="isAdmin==='true'" class="button h9 btn2" @click="updateForm()">
              EDIT
            </button>
            <button v-show="isAdmin==='true'" class="button h9 btn2 ml-3" @click="deleteForm()">
              DELETE
            </button>
          </v-col>
        </aside>
      </section>
    </v-col>
    <v-col cols="12" md="6" class="center">
      <button class="button h9 btn2" @click="viewNfts()">
        BUY NOW<v-icon medium>mdi-chevron-right</v-icon>
      </button>
    </v-col>

    <v-dialog
      id="dialogo"
      v-model="dialogDelete"
      max-width="400"
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <h5>
            <span>
              Are you sure?
            </span>
          </h5>
        </v-col>
        <v-col cols="12" class="center">
          <span>
            Are you sure you want to delete this form education?
          </span>
        </v-col>
        <v-col cols="12">
          <button  class="button h9 btn2" @click="deleteFormId()">
            YES
          </button>
          <button  class="button h9 btn2" @click="dialogDelete = false">
            CLOSE
          </button>
        </v-col>
      </section>
    </v-dialog>
    <v-dialog
      id="dialogo"
      v-model="dialogMessage"
      max-width="400"
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <h5>
            <span>
              {{ titleDM }}
            </span>
          </h5>
        </v-col>
        <v-col cols="12" class="center">
          <span>
            {{ messageDM }}
          </span>
        </v-col>
        <v-col cols="12">
          <button  class="button h9 btn2" @click="dialogMessage = false">
            CLOSE
          </button>
        </v-col>
      </section>
    </v-dialog>
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
          <button  class="button h9 btn2 ml-2" @click="closeModal()">
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
// const CONTRACT_NAME = 'backend.evie.testnet'
// const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "ProjectProposal",
  data() {
    return {
      account_id: localStorage.walletAccountId,
      load: false,
      dataMarketplace: [
        { market: require("@/assets/buttons/xdn.svg") },
        { market: require("@/assets/buttons/dlt.svg") },
      ],
      dataProjectProposal: {
        lista: [],
        description: [],
      },
      idForm: 0,
      dialogDelete: false,
      dialogMessage: false,
      titleDM: '',
      messageDM: '',
      idBuy: 0,
      vieneDe: '',
      nft_contract: '',
      collectionView: [],
      isAdmin: localStorage.isAdmin,
      dialog: false,
      pass: '',
    }
  },
  mounted() {
    this.idForm = parseInt(localStorage.idForm)
    this.idBuy = parseInt(localStorage.idCollectionForm)
    this.vieneDe = localStorage.vieneDe
    this.getFormId()
  },
  methods: {
    async getFormId() {
      var id = null
      if (this.vieneDe === 'buy') {
        id = this.idBuy
      }
      if (this.vieneDe === 'nftprojects') {
        id = this.idForm
      }
      this.$store.commit('Load', true)
      axios.post('https://evie.pro:3070/api/v1/descformedu', {
        'id': id 
      }).then(response => {
        this.searchCollections(response.data[0].title)
        this.dataProjectProposal.description = response.data
        this.$store.commit('Load', false)
      })
      // setTimeout(() => console.log(this.dataProjectProposal.description), 3000)
    },
    updateForm() {
      if(localStorage.pass) {
        this.$router.push('/form')
      } else {
        this.dialog = true
      }
    },
    async deleteFormId() {
      this.dialogDelete = false
      this.$store.commit('Load', true)
      axios.post('https://evie.pro:3070/api/v1/removeform', {
        "id": this.idForm,
        "user": localStorage.walletAccountId,
        "pass": localStorage.pass
      }).then(response => {
        this.$store.commit('Load', false)
        console.log(response)
        this.dialogMessage = true
        this.titleDM = 'Successful'
        this.messageDM = 'Delete form education successful'
        setTimeout(() => this.$router.push('/nft-projects'), 3000)
      }).catch(err => {
        console.log(err)
      })
    },
    async deleteForm() {
      if(localStorage.pass) {
        this.dialogDelete = true
      } else {
        this.dialog = true
      }
    },
    async searchCollections (title) {
      await axios.post('https://evie.pro:3070/api/v1/SearchCollections', {
        'input': title,
        'limit': 1,
        'index': 0,
      }).then(response => {
        response.data.forEach(item => {
          if(item.icon == null) {
            item.icon = require('@/assets/azul-color.png')
          }          
        })
        this.nft_contract = response.data[0].nft_contract
        localStorage.nft_contract = response.data[0].nft_contract
        this.viewMarketplace(response.data[0].nft_contract)
      }).catch(err => console.log(err))
    },
    async viewMarketplace(item) {
      this.dataProjectProposal.lista = []
      axios.post('https://evie.pro:3070/api/v1/listmarketplacecollection', {
        "collection": item
      }).then(response => {
        response.data.forEach(i => {
          this.dataProjectProposal.lista.push({
            listen: i.marketplace,
            // price: "1068",
            // volume: "50,000",
            // total: "150,000",
            market: require('@/assets/markets/' + i.marketplace + '.svg')
          })
        });
        
      }).catch(err => console.log(err))
    },
    viewNfts() {
      this.$router.push({
        name: 'buy',
        params:{
          id: this.nft_contract,
        }
      })
    },
    savePass() {
      localStorage.pass = this.pass
      this.dialog = false
      this.pass = ''
    },
    closeModal() {
      this.dialog = false
      this.pass = ''
    }
  },
};
</script>

<style src="../pages.scss" lang="scss" />
