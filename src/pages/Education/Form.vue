<template>
  <section id="formProposal" class="relative">
    <v-col class="padd divrow" style="gap: clamp(0.2em, 2.2vw, 1.25em)">
      <button class="botonBack center" @click="$router.push('/nft-projects')">
        <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
      </button>
      <h1 class="tituloBack p">PROJECT PROPOSAL {{ addEdit }}</h1>
    </v-col>

    <section id="container-content">
      <!-- <VueFileAgent
        :uploadUrl="uploadUrl"
        v-model="fileRecord"
        :multiple="false"
        :deletable="true"
        :accept="'image/*'"
        :helpText="'Choose images'"
        class="file"
        @select="filesSelected()"
      ></VueFileAgent> -->
      <!-- <v-file-input
        v-model="images"
        class="custome file"
        prepend-icon=""
        solo
      >
        <template v-slot:label>
          
          <v-icon>camera</v-icon>
          <span>UPLOAD</span>
        </template>
      </v-file-input> -->
      <img class="file" :src="images[0]" :alt="collection.title" width="">
      <v-autocomplete
        v-model="collection.contract"
        :items="dataMenuCollections"
        chips
        item-text="name"
        item-value="nft_contract"
        class="custome"
        solo
        @change="dataCollection()"
      >
        <template v-slot:prepend>
          <label>COLLECTION</label>
        </template>
        <template v-slot:selection="data">
          <template>
            <v-list-item-avatar class="ml-3">
              <v-img :src="data.item.icon" /> 
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar>
              <v-img :src="data.item.icon" /> 
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </template>        
      </v-autocomplete>
      
      <!-- <v-text-field
        v-model="collection.title"
        class="custome"
        solo dense
      >
        <template v-slot:prepend>
          <label>TITLE</label>
        </template>
      </v-text-field> -->
      
      <!-- <v-text-field
        v-model="images[0]"
        class="custome"
        solo dense
      >
        <template v-slot:prepend>
          <label>URL</label>
        </template>
      </v-text-field> -->
      
      <v-text-field
        v-model="collection.supply"
        class="custome"
        solo dense
        :rules="rules"
      >
        <template v-slot:prepend>
          <label>SUPPLY</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.website"
        class="custome"
        solo dense
        :rules="rules"
      >
        <template v-slot:prepend>
          <label>WEBSITE</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.twitter"
        class="custome"
        solo dense
        :rules="rules"
      >
        <template v-slot:prepend>
          <label>TWITTER</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.discord"
        class="custome"
        solo dense
        :rules="rules"
      >
        <template v-slot:prepend>
          <label>DISCORD</label>
        </template>
      </v-text-field>
      
      <v-text-field
        v-model="collection.instagram"
        class="custome"
        solo dense
        :rules="rules"
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
        :rules="rules"
      ></v-textarea>
    </div>

    <v-col class="center">
      <!-- <button class="button h9 btn2" @click="addForm()"> -->
      <button
        v-show="!update"
        class="button h9 btn2"
        @click="addForm()"
      >
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
          <button  class="button h9 btn2" @click="closeModalMessage()">
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
// import { NFTStorage, File } from 'nft.storage'
const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "Form",
  data() {
    return {
      rules: [
        value => !!value || 'This field is required.',
      ],
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
      dataMenuCollections: [],
      account_id: localStorage.walletAccountId,
      addEdit: '',
    }
  },
  mounted() {
    // console.log(localStorage.idForm)
    if(localStorage.idForm) {
      this.idForm = parseInt(localStorage.idForm)
      this.update = true
      this.addEdit = 'EDIT'
      this.getFormId()
    }

    this.collections()
    // if(this.account_id !== 'lindaley16.near' || this.account_id !== 'sirs.near' || this.account_id !== 'andresdom.near') {
    //   this.$router.push('/nft-projects')
    // }
  },
  methods: {
    async collections () {
      // this.$store.commit('Load', true)
      var data = []
      await axios.post('https://evie.pro:3070/api/v1/listcollections', {
      // await axios.post('http://157.230.2.213:3071/api/v1/listcollections', {
      // await axios.post('http://157.230.2.213:3072/api/v1/listcollections', {
        'limit': 20000,
        'index': 0,
      }).then(response => {
        response.data.forEach(item => {
          if(item.icon == null) {
            axios.get("https://api-v2-mainnet.paras.id/collections?creator_id=" + item.nft_contract).then(res => {
              // console.log(res.data.data.results)
              data = res.data.data.results
              data.forEach(element => {
                if (data.length > 1) {
                  if ((element.collection).toLowerCase() === (item.name).toLowerCase()) {
                    item.icon = 'https://ipfs.fleek.co/ipfs/' + element.media
                  }
                } else if ((element.creator_id).toLowerCase() === (item.nft_contract).toLowerCase()) {
                  item.icon = 'https://ipfs.fleek.co/ipfs/' + element.media
                }
                if (item.nft_contract === 'mara-smartcontract.near') {
                  item.icon = 'https://paras-cdn.imgix.net/bafybeid7fbyflawy24hsttpriucgbc26hv3rnegsbcrvqww72prr2jdhoq?w=300&auto=format,compress'
                }
              });
            })
          }
          this.dataMenuCollections.push(item)
        })
      }).catch(err => console.log(err))
    },
    addForm() {
      if (!this.collection.contract) {
        this.dialogMessage = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'You must select a collection'
      } else if(!this.collection.supply) {
        this.dialogMessage = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'The supply field must not be empty'
      } else if(!this.collection.website) {
        this.dialogMessage = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'The website field must not be empty'
      } else if(!this.collection.twitter) {
        this.dialogMessage = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'The twitter field must not be empty'
      } else if(!this.collection.discord) {
        this.dialogMessage = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'The discord field must not be empty'
      } else if(!this.collection.instagram) {
        this.dialogMessage = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'The instagram field must not be empty'
      } else if(!this.descriptions.length) {
        this.dialogMessage = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'The description field must not be empty'
      } else {
        var idFormAdd = null
        axios.post('https://evie.pro:3070/api/v1/GenerateId').then(async response => {
          idFormAdd = response.data.id
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
          console.log(idFormAdd, 'este es el id')
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
            form_id: idFormAdd,
            form: EduForm
          }, '85000000000000',
          ).then((response) => {
            console.log(response, idFormAdd);
            this.$store.commit('Load', false)
            this.dialogMessage = true
            this.titleDM = 'Successfully saved'
            this.messageDM = 'The data was saved successfully'
            setTimeout(() => {
              axios.post('https://evie.pro:3070/api/v1/RefrescarFormEdu').then(response => {
                console.log(response)
              }).catch(erro => {console.log(erro)})
            }, 35000)
          }).catch(err => {
            console.log(err)
            this.$store.commit('Load', false)
            this.dialogMessage = true
            this.titleDM = 'Error'
            this.messageDM = 'An error has occurred' + err
          })
        }).catch(erro => console.log(erro))
      }
      
      
    },
    async getFormId() {
      // connect to NEAR
      this.$store.commit('Load', true)
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
        console.log(response)
        this.collection = response.form
        this.descriptions[0] = response.form.descriptions[0]
        this.images[0] = response.form.images[0]
        this.$store.commit('Load', false)
        //this.searchCollections(this.collection.title)
         axios.post('https://evie.pro:3070/api/v1/SearchCollections', {
          'input': this.collection.title,
          'limit': 1,
          'index': 0,
        }).then(res => {
          console.log(res.data)
          this.collection.contract = res.data[0].nft_contract
        }).catch(erro => console.log(erro))
        setTimeout(() => {
          console.log(this.collection, 'colection')
        }, 1000);
        
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
        this.$store.commit('Load', false)
        this.dialogMessage = true
        this.titleDM = 'Successfully modified'
        this.messageDM = 'The data was modified successfully'
        setTimeout(() => {
          axios.post('https://evie.pro:3070/api/v1/RefrescarFormEdu').then(response => {
            console.log(response)
          }).catch(erro => {console.log(erro)})
        }, 35000)
      }).catch(err => {
        console.log(err)
      })
    },
    dataCollection() {
      this.dataMenuCollections.forEach(item => {
        if (item.nft_contract === this.collection.contract) {
          this.images[0] = item.icon
          this.collection.title = item.name
        }
      });
    },
    closeModalMessage() {
      this.dialogMessage = false
      if(this.update) {
        localStorage.idForm = this.idForm
        localStorage.vieneDe = 'nftprojects'
        this.$router.push('/project-proposal')
      } else {
        this.$router.push('/nft-projects')
      }
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
