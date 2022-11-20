<template>
  <section id="formProposal" class="relative">
    <v-col class="padd divrow" style="gap: clamp(0.2em, 2.2vw, 1.25em)">
      <button class="botonBack center" @click="$router.push('/nft-projects')">
        <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
      </button>
      <h1 class="tituloBack p">PROJECT PROPOSAL {{ addEdit }}</h1>
    </v-col>

    <section id="container-content" class="mb-5">
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

      <!-- if near blockchain -->
      <template v-if="currentBlockchain === 'near'">
        <img class="file" :src="images[0]" :alt="collection.title" width="100%" height="100%">
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
      </template>


      <!-- if not near blockchain -->
      <template v-else>
        <v-file-input
          v-model="image_model"
          class="file"
          prepend-icon="" solo
          label=""
          hide-details
          @change="imagePreview()"
        >
          <template v-slot:label>
            <img src="@/assets/upload.svg" alt="label">
          </template>
          
          <template v-slot:selection>
            <img :src="images[0]" :alt="collection.title" width="100%" height="100%">
          </template>
        </v-file-input>
        
        <v-text-field
          v-model="collection.title"
          class="custome"
          solo
        ></v-text-field>
      </template>
      
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
      <vue-editor
        v-model="descriptions[0]"
        class="editor"
        :class="{ rules: editorRules }"
      ></vue-editor>
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
import { VueEditor } from "vue2-editor";

// import * as nearAPI from "near-api-js";
// import { CONFIG } from "@/services/api";
// const { connect, keyStores, WalletConnection, Contract } = nearAPI;
// const CONTRACT_NAME = 'backend.evie.testnet'
// import { NFTStorage, File } from 'nft.storage'
// const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "Form",
  components: {
    VueEditor
  },
  data() {
    return {
      editorRules: false,
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
      image_model: undefined,
    }
  },
  watch: {
    editorRules(current) {
      const message = document.createElement("div")
      message.id = "editor-message"
      message.className = "v-messages__message error-message"
      message.innerText = "This field is required."
      if (current) {
        document.querySelector(".editor").insertAdjacentElement("afterend", message)
      } else {
        document.getElementById("editor-message").remove()
      }
    }
  },
  computed: {
    currentBlockchain() {
      return localStorage.getItem("currentBlockchain")
    },
  },
  mounted() {
    const editor = document.querySelector(".editor .ql-editor");
    editor?.addEventListener("keyup", () => {
      if (this.$router.currentRoute.path === '/form') { this.validatorEditor(this.descriptions[0]) }
    })
    // console.log(localStorage.idForm)
    if(localStorage.idForm) {
      this.idForm = parseInt(localStorage.idForm)
      this.update = true
      this.addEdit = 'EDIT'
      this.getFormId()
    }
    this.collections()
  },
  methods: {
    async collections () {
      await axios.post('https://evie.pro:3070/api/v1/SearchCollections', {
        'input': '',
        'limit': 1000,
        'index': 0,
        "order": "volumen",
        "type_order": "asc"
      }).then(response => {
        response.data.forEach(item => {
          if(item.icon == null) {
            item.icon = require('@/assets/azul-color.png')
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
        this.editorRules = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'The description field must not be empty'
      } else {
        this.$store.commit('Load', true)
        var EduForm = {
          "blockchain": this.currentBlockchain,
          "title": this.collection.title,
          "supply": this.collection.supply,
          "website": this.collection.website,
          "twitter": this.collection.twitter,
          "discord": this.collection.discord,
          "instagram": this.collection.instagram,
          "descriptions": this.descriptions,
          "images": this.images,
          "user": localStorage.walletAccountId,
          "pass": localStorage.pass,
        }

        axios.post('https://evie.pro:3070/api/v1/addform', EduForm).then(response => {
          console.log(response)
          this.$store.commit('Load', false)
          this.dialogMessage = true
          this.titleDM = 'Successfully saved'
          this.messageDM = 'The data was saved successfully'
        }).catch(err => {
          console.log(err)
        })
      }
    },
    async getFormId() {
      this.$store.commit('Load', true)
      axios.post('https://evie.pro:3070/api/v1/descformedu', {
        'id': this.idForm 
      }).then(response => {
        this.collection = response.data[0]
        this.descriptions[0] = this.collection.descriptions[0]
        this.images[0] = this.collection.images[0]
        axios.post('https://evie.pro:3070/api/v1/SearchCollections', {
          'input': this.collection.title,
          'limit': 1000,
          'index': 0,
          "order": "volumen",
          "type_order": 'asc'
        }).then(res => {
          this.collection.contract = res.data[0].nft_contract
        }).catch(erro => console.log(erro))
        this.$store.commit('Load', false)
      })
    },
    async updateForm() {
      this.$store.commit('Load', true)
      var EduForm = {
        "id": this.idForm,
        "blockchain": this.collection.blockchain,
        "title": this.collection.title,
        "supply": this.collection.supply,
        "website": this.collection.website,
        "twitter": this.collection.twitter,
        "discord": this.collection.discord,
        "instagram": this.collection.instagram,
        "descriptions": this.descriptions,
        "images": this.images,
        "user": localStorage.walletAccountId,
        "pass": localStorage.pass,
      }

      axios.post('https://evie.pro:3070/api/v1/updateform', EduForm).then(response => {
        console.log(response,);
        this.$store.commit('Load', false)
        this.dialogMessage = true
        this.titleDM = 'Successfully modified'
        this.messageDM = 'The data was modified successfully'
      }).catch(err => {
        console.log(err)
      })
    },
    dataCollection() {
      this.dataMenuCollections.forEach(item => {
        if (item.nft_contract === this.collection.contract) {
          this.images[0] = item.icon
          this.collection.title = item.name
          this.image_model = {name: item.name + ".png"} // <-- temporary
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
    validatorEditor(model) {
      if (model) return (this.editorRules = false);
      this.editorRules = true;
    },
    imagePreview() {
      if (this.image_model) this.images[0] = URL.createObjectURL(this.image_model)
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
