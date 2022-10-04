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

      <section class="contRight">
        <aside>
          <img class="images" :src="dataProjectProposal.description.form.images[0]" alt="nft">
          <div>
            <h3 class="Title">{{ dataProjectProposal.description.form.title }}</h3>
            <span><strong>Origianl Supply: </strong>{{ dataProjectProposal.description.form.supply }}</span>
            <span><strong>Website: </strong>{{ dataProjectProposal.description.form.website }}</span>
            <span><strong>Twitter: </strong>{{ dataProjectProposal.description.form.twitter }}</span>
            <span><strong>Instagram: </strong>{{ dataProjectProposal.description.form.instagram }}</span>
            <span><strong>Discord: </strong>{{ dataProjectProposal.description.form.discord }}</span>
          </div>
        </aside>

        <aside>
          <!-- <img v-if="dataProjectProposal.description.img" :src="dataProjectProposal.description.img" 
            alt="image">-->
          <h3 class="Title">ABOUT:</h3>
          <span>{{ dataProjectProposal.description.form.descriptions[0] }}</span>
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
  </section>
</template>

<script>
import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract } = nearAPI;
// const CONTRACT_NAME = 'backend.evie.testnet'
const CONTRACT_NAME = 'backend.eviepro.near'
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
      console.log(this.idForm, 'idform')
      var id = null
      if (this.vieneDe === 'buy') {
        id = this.idBuy
      }
      if (this.vieneDe === 'nftprojects') {
        id = this.idForm
      }
      this.$store.commit('Load', true)
      // axios.post('https://evie.pro:3070/api/v1/descformedu', {
      //   'id': id 
      // }).then(response => {
      //   this.searchCollections(response.data[0].title)
      //   this.dataProjectProposal.description = response.data
      //   this.$store.commit('Load', false)
      // })
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore()
        )
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ["get_form_by_id"],
        sender: wallet.account(),
      })
      await contract.get_form_by_id({
        form_id: id
      }).then((response) => {
        this.$store.commit('Load', false)
        setTimeout(() => {
          this.searchCollections(response.form.title)
          this.dataProjectProposal.description = response
          console.log(response, 'response by id')
        }, 1000)
        
      }).catch(err => {
        console.log(err)
      })
      setTimeout(() => {console.log(this.dataProjectProposal.description.form.title, 'var data')}, 1200)
      
    },
    updateForm() {
      this.$router.push('/form')
    },
    async deleteFormId() {
      this.dialogDelete = false
      // connect to NEAR
      this.$store.commit('Load', true)
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore()
        )
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["remove_form"],
        sender: wallet.account(),
      })
      await contract.remove_form({
        form_id: this.idForm
      }, '85000000000000',
      ).then((response) => {
        this.$store.commit('Load', false)
        console.log(response)
        this.dialogMessage = true
        this.titleDM = 'Successful'
        this.messageDM = 'Delete form education successful'
        setTimeout(() => this.$router.push('/nft-projects'), 4000)
      }).catch(err => {
        console.log(err)
      })
    },
    async deleteForm() {
      this.dialogDelete = true
    },
    async searchCollections (title) {
      var data = []
      await axios.post('https://evie.pro:3070/api/v1/SearchCollections', {
        'input': title,
        'limit': 1,
        'index': 0,
      }).then(response => {
        response.data.forEach(item => {
          //console.log(item)
          if(item.icon == null) {
            axios.get("https://api-v2-mainnet.paras.id/collections?creator_id=" + item.nft_contract).then(res => {
              data = res.data.data.results
              data.forEach(element => {
                if ((element.collection).toLowerCase() === (item.name).toLowerCase()) {
                  item.icon = 'https://ipfs.fleek.co/ipfs/' + element.media
                  localStorage.collections = JSON.stringify(item)
                }
              });
            })
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
        console.log(response.data, 'markets')
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
    }
  },
};
</script>

<style src="../pages.scss" lang="scss" />
