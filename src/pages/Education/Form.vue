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
        v-model="images[0]"
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
// import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract } = nearAPI;
const CONTRACT_NAME = 'backend.evie.testnet'
export default {
  name: "Form",
  data() {
    return {
      collection: [],
      descriptions: [],
      imagenes: [],
      images: [],
      dataMarketplace: [
        { market: require("@/assets/buttons/xdn.svg") },
        { market: require("@/assets/buttons/dlt.svg") },
      ],
      idForm: null,
      update: false,
      dialogMessage: false,
      titleDM: '',
      messageDM: '',
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
      this.$store.commit('Load', true)
      var EduForm = {
        title: this.collection.title,
        supply: this.collection.supply,
        website: this.collection.website,
        twitter: this.collection.twitter,
        discord: this.collection.discord,
        instagram: this.collection.instagram,
        descriptions: this.descriptions,
        images: this.images,
      }
      console.log(EduForm)
      //connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
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
        this.$store.commit('Load', false)
        this.dialogMessage = true
        this.titleDM = 'Successfully saved'
        this.messageDM = 'The data was saved successfully'
      }).catch(err => {
        console.log(err)
      })
    },
    async getFormId() {
      // connect to NEAR
      this.$store.commit('Load', true)
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
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
        this.collection = response.form
        this.descriptions[0] = response.form.descriptions[0]
        this.images[0] = response.form.images[0]
        this.$store.commit('Load', false)
      }).catch(err => {
        console.log(err)
      })
    },
    async updateForm() {
      this.$store.commit('Load', true)
      var EduForm = {
        title: this.collection.title,
        supply: this.collection.supply,
        website: this.collection.website,
        twitter: this.collection.twitter,
        discord: this.collection.discord,
        instagram: this.collection.instagram,
        descriptions: this.descriptions,
        images: this.images,
      }

      console.log(EduForm)
      //connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
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
        this.$store.commit('Load', false)
        this.dialogMessage = true
        this.titleDM = 'Successfully modified'
        this.messageDM = 'The data was modified successfully'
      }).catch(err => {
        console.log(err)
      })
    },
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
