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
      <ul>
        <li v-for="(item,i) in dataProjectProposal.lista" :key="i">
          <img class="marker" :src="require(`@/assets/buttons/${item.market}.svg`)" alt="marker list">

          <span>Listen: {{ item.listen }}</span>
          <span>Floor Price: {{ item.price }}
            <img class="nearBalanceLogo filter" src="@/assets/logo/near.svg" alt="near">
          </span>
          <span>Monthly Volume: $ {{ item.volume}}</span>
          <span>Total Volumen: $ {{ item.total }}</span>
        </li>
      </ul>

      <section class="contRight">
        <aside>
          <img class="images" :src="dataProjectProposal.description[0].images[0]" alt="nft">
          <div>
            <h3 class="Title">{{ dataProjectProposal.description[0].title }}</h3>
            <span><strong>Origianl Supply: </strong>{{ dataProjectProposal.description[0].supply }}</span>
            <span><strong>Website: </strong>{{ dataProjectProposal.description[0].website }}</span>
            <span><strong>Twitter: </strong>{{ dataProjectProposal.description[0].twitter }}</span>
            <span><strong>Instagram: </strong>{{ dataProjectProposal.description[0].instagram }}</span>
            <span><strong>Discord: </strong>{{ dataProjectProposal.description[0].discord }}</span>
          </div>
        </aside>

        <aside>
          <!-- <img v-if="dataProjectProposal.description.img" :src="dataProjectProposal.description.img" 
            alt="image">-->
          <h3 class="Title">ABOUT:</h3>
          <span>{{ dataProjectProposal.description[0].descriptions[0] }}</span>
        </aside>
        <aside>
          <v-col>
            <!-- <button class="button h9 btn2" @click="addForm()"> -->
            <button v-show="account_id === 'lindaley16.near' || account_id === 'sirs.near' || account_id === 'andresdom.near'" class="button h9 btn2" @click="updateForm()">
              EDIT
            </button>
            <button v-show="account_id === 'lindaley16.near' || account_id === 'sirs.near' || account_id === 'andresdom.near'" class="button h9 btn2 ml-3" @click="deleteForm()">
              DELETE
            </button>
          </v-col>
        </aside>
      </section>
    </v-col>
    <v-col cols="12" md="6" class="center">
      <button class="button h9 btn2">
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
        lista: [
          {
            listen: "9",
            price: "1068",
            volume: "50,000",
            total: "150,000",
            market: "doge"
          },
          {
            listen: "9",
            price: "1068",
            volume: "50,000",
            total: "150,000",
            market: "auto"
          },
          {
            listen: "9",
            price: "1068",
            volume: "50,000",
            total: "150,000",
            market: "dlt"
          },
        ],
        description: {
          // nft: require("@/assets/nft/monkeyA2.png"),
          // name: "MARA GEN 0",
          // supply: "101",
          // website: "maranft.art/",
          // twitter: "twitter.com/MaraNFT_DAO",
          // instagram: "instagram.com/mara_mtp",
          // discord: "discord:discord.gg/prT5pxKv",
          // about: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt ad quae ipsam qui debitis excepturi explicabo quas dolor, repellat itaque. In mollitia asperiores voluptate placeat ratione. Voluptas ipsum quibusdam quisquam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas ipsum quibusdam quisquam.Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
          // img: require("@/assets/image1.png")
        }
      },
      idForm: 0,
      dialogDelete: false,
      dialogMessage: false,
      titleDM: '',
      messageDM: '',
      idBuy: 0,
      vieneDe: ''
    }
  },
  mounted() {
    this.idForm = parseInt(localStorage.idForm)
    this.idBuy = parseInt(localStorage.idCollectionForm)
    this.vieneDe = localStorage.vieneDe
    this.getFormId()
    console.log(this.vieneDe)
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
      //console.log('getForm', this.idForm)
      this.$store.commit('Load', true)
      axios.post('https://evie.pro:3070/api/v1/descformedu', {
        'id': id 
      }).then(response => {
        // console.log(response.data)
        this.dataProjectProposal.description = response.data
        // console.log(this.dataProjectProposal.description)
        this.$store.commit('Load', false)
      })
      // connect to NEAR
      // const near = await connect(
      //   CONFIG(new keyStores.BrowserLocalStorageKeyStore(), 'mainnet')
      // );
      // // create wallet connection
      // const wallet = new WalletConnection(near);
      // const contract = new Contract(wallet.account(), CONTRACT_NAME, {
      //   changeMethods: ["get_form_by_id"],
      //   sender: wallet.account(),
      // })
      // await contract.get_form_by_id({
      //   form_id: this.idForm
      // }, '85000000000000',
      // ).then((response) => {
      //   console.log(response);
      //   // this.dataNFTProjects = response
      //   // this.dataProjectProposal.description = response
      //   // console.log(this.dataProjectProposal.description)
      //   this.load = false
      //   this.$store.commit('Load', false)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    updateForm() {
      this.$router.push('/form')
    },
    async deleteFormId() {
      this.dialogDelete = false
      // connect to NEAR
      this.$store.commit('Load', true)
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), 'mainnet')
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
      }).catch(err => {
        console.log(err)
      })
    },
    async deleteForm() {
      this.dialogDelete = true
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
