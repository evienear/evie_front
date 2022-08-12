<template>
  <section id="formProposal" class="relative">
    <v-col class="padd divrow" style="gap: clamp(0.2em, 2.2vw, 1.25em)">
      <button class="botonBack center" @click="$router.push('/nft-projects')">
        <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
      </button>
      <h1 class="tituloBack p">PROJECT PROPOSAL EDIT</h1>
    </v-col>

    <section id="container-content">
      <v-file-input
        v-model="images"
        class="custome file"
        prepend-icon=""
        solo
      >
        <template v-slot:label>
          <!-- <img src="@/assets/icons/camera.svg" alt="upload files"> -->
          <v-icon>camera</v-icon>
          <span>UPLOAD</span>
        </template>
      </v-file-input>
      
      <v-text-field
        v-model="collection.title"
        class="custome"
        solo dense
      >
        <template v-slot:prepend>
          <label>TITLE</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.url"
        class="custome"
        solo dense
      >
        <template v-slot:prepend>
          <label>URL</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.supply"
        class="custome"
        solo dense
      >
        <template v-slot:prepend>
          <label>SUPPLY</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.website"
        class="custome"
        solo dense
      >
        <template v-slot:prepend>
          <label>WEBSITE</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.twitter"
        class="custome"
        solo dense
      >
        <template v-slot:prepend>
          <label>TWITTER</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.discord"
        class="custome"
        solo dense
      >
        <template v-slot:prepend>
          <label>DISCORD</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.instagram"
        class="custome"
        solo dense
      >
        <template v-slot:prepend>
          <label>INSTAGRAM</label>
        </template>
      </v-text-field>
    </section>
      
    <div class="divcol desc">
      <label>ABOUT DESCRIPTION</label>
      <v-textarea
        v-model="descriptions[0]"
        solo
        class="custome"
      ></v-textarea>
    </div>

    <v-col class="center">
      <!-- <button class="button h9 btn2" @click="addForm()"> -->
      <button v-show="!update" class="button h9 btn2" @click="addForm()">
        SAVE
      </button>
      <button v-show="update" class="button h9 btn2" @click="updateForm()">
        SAVE
      </button>
    </v-col>
  </section>
</template>

<script>
// import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract } = nearAPI;
const CONTRACT_NAME = 'dev-1660244871256-92189441173983'
export default {
  name: "ProjectProposal",
  data() {
    return {
      collection: [],
      descriptions: [],
      imagenes: ['https://ipfs.fleek.co/ipfs/bafybeihyxgz6xf5skpkcxmkpelnxqwywzc5ixofmznxuhn7ytljttrrnky'],
      images: [],
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
          nft: require("@/assets/nft/monkeyA2.png"),
          name: "MARA GEN 0",
          supply: "101",
          website: "maranft.art/",
          twitter: "twitter.com/MaraNFT_DAO",
          instagram: "instagram.com/mara_mtp",
          discord: "discord:discord.gg/prT5pxKv",
          about: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt ad quae ipsam qui debitis excepturi explicabo quas dolor, repellat itaque. In mollitia asperiores voluptate placeat ratione. Voluptas ipsum quibusdam quisquam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas ipsum quibusdam quisquam.Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
          img: require("@/assets/image1.png")
        }
      },
      idForm: null,
      update: false,
    }
  },
  mounted() {
    console.log(localStorage.idForm)
    if(localStorage.idForm) {
      this.idForm = parseInt(localStorage.idForm)
      this.update = true
      this.getFormId()
    }
    // this.getForm()
  },
  methods: {
    async addForm() {
      var EduForm = {
        title: this.collection.title,
        supply: this.collection.supply,
        website: this.collection.website,
        twitter: this.collection.twitter,
        discord: this.collection.discord,
        instagram: this.collection.instagram,
        descriptions: this.descriptions,
        images: this.imagenes,
      }
      console.log(EduForm)
      //connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["add_form"],
        sender: wallet.account(),
      })
      await contract.add_form({
        form: EduForm
      }, '85000000000000',
      ).then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err)
      })
    },
    async getFormId() {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["get_form_by_id"],
        sender: wallet.account(),
      })
      await contract.get_form_by_id({
        form_id: this.idForm
      }, '85000000000000',
      ).then((response) => {
        // console.log(response);
        this.dataNFTProjects = response
        this.dataProjectProposal.description = response
        console.log(this.dataProjectProposal.description)
      }).catch(err => {
        console.log(err)
      })
    },
    async updateForm() {
      // localStorage.removeItem('idForm')
      // var EduForm = {
      //   title: 'Antisocial Ape Club',
      //   supply: '813',
      //   website: 'asac.art/',
      //   twitter: 'twitter.com/AsacNFT_DAO',
      //   discord: 'discord:discord.gg/prT5pxKv',
      //   instagram: 'instagram.com/asac',
      //   descriptions: ['A collection of 3333 pixel art ape NFTs stored on the NEAR blockchain.'],
      //   images: ['https://ipfs.fleek.co/ipfs/bafybeigc6z74rtwmigcoo5eqcsc4gxwkganqs4uq5nuz4dwlhjhrurofeq'],
      // }
      var EduForm = {
        title: this.collection.title,
        supply: this.collection.supply,
        website: this.collection.website,
        twitter: this.collection.twitter,
        discord: this.collection.discord,
        instagram: this.collection.instagram,
        descriptions: this.descriptions,
        images: this.imagenes,
      }

      console.log(EduForm)
      //connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["update_form"],
        sender: wallet.account(),
      })
      await contract.update_form({
        form_id: this.idForm,
        form: EduForm
      }, '85000000000000',
      ).then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err)
      })
    },
    // async getForm() {
    //   // connect to NEAR
    //   const near = await connect(
    //     CONFIG(new keyStores.BrowserLocalStorageKeyStore())
    //   );
    //   // create wallet connection
    //   const wallet = new WalletConnection(near);
    //   const contract = new Contract(wallet.account(), CONTRACT_NAME, {
    //     changeMethods: ["get_forms"],
    //     sender: wallet.account(),
    //   })
    //   await contract.get_forms({
    //     from_index: '0',
    //     limit: 50
    //   }, '85000000000000',
    //   ).then((response) => {
    //     console.log(response);
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
  }
};
</script>
<style>
.v-application .row {
  margin-left: 12px !important;
  margin-right: 12px !important;
}
</style>
<style src="../pages.scss" lang="scss" />
