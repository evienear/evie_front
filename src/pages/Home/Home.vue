<template>
  <section id="home" class="center align gap">
    <h1 class="titulo">BUY</h1>

    <button class="chooseNftBtn btn" @click="menuCollections=true">
      CHOOSE NFT's
      <div class="decoration" />
      <v-icon medium>mdi-chevron-down</v-icon>
    </button>

    <!-- menu collections -->
    <v-dialog
      id="dialogo"
      v-model="menuCollections"
      max-width="832.49px"
      :overlay-opacity="$store.state.overlay.opacity"
      :overlay-color="$store.state.overlay.color"
    >
      <section class="menuCollections colorCartas">
        <button class="buttonClose center">
          <img class="close" src="@/assets/icons/close.svg" alt="close" @click="menuCollections = false">
        </button>

        <v-col cols="12" class="contentCard">
          <v-data-table
            id="tableCollections"
            :headers="headers"
            :items="dataMenuCollections"
            :search="search"
            item-key="name"
            hide-default-footer
            :items-per-page="20"
            mobile-breakpoint="-1"
            class="colorCartas"
          >
            <template v-slot:top>
              <v-col class="containerControlsHeader space" style="padding-top: 0">
                <v-col class="center contSearch">
                  <v-text-field
                    id="search"
                    ref="search"
                    v-model="search"
                    solo background-color="transparent"
                    hide-details="true"
                    maxlength="20"
                    v-debounce:600ms="searchCollections"
                  >
                    <template v-slot:label>
                      <span style="font-weight: 600">SEARCH BY COLLECTIONS</span>
                    </template>

                    <template v-slot:append>
                      <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/search.svg`" alt="search icon">
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="4" class="center">
                  <v-select
                    :items="filter"
                    item-text="text"
                    item-value="value"
                    v-model="orderBy"
                    :hide-details="true"
                    append-icon="mdi-chevron-down"
                    @change="changeOrder()"
                  >
                    <template v-slot:label>
                      <span style="font-weight: 600">ALL TIME VOLUME</span>
                    </template>
                  </v-select>
                </v-col>
              </v-col>
            </template>

            <!-- desserts -->
            <template v-slot:[`item.name`]="{ item }">
              <button
                class="space marginbottom margintop"
                style="width: 100%; height: 100%"
                @click="viewNft(item)"
              >
                <aside class="divrow center" style="gap: 10px">
                  <img v-show="item.icon!==null" class="nft images" :src="item.icon" alt="token" />
                  <img v-show="item.icon===null" class="nft images" :src="require('@/assets/azul-color.png')" alt="token" />
                  <span class="h8" style="font-weight: 400">{{ item.name }}</span>
                </aside>
                <span class="h8">
                  <strong>{{ parseFloat(item.volumen_near).toFixed(4) }} </strong>
                  <img src="@/assets/logo/near.svg" alt="near">
                </span>
                
              </button>
            </template>
          </v-data-table>
        </v-col>
        <v-row>
        <v-col class="containerPagination end">
          <v-btn class="btn2" :disabled="indexPag == 0" @click="prevItems()">
            <v-icon large style="color:#58565b !important">mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn class="btn2" :disabled="dataMenuCollections.length < 20" @click="nextItems()">
            <v-icon large style="color:#58565b !important">mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      </section>
    </v-dialog>
  </section>
</template>

<script>
import axios from 'axios'
// const utf8 = require('utf8');

export default {
  name: "Home",
  data() {
    return {
      menuCollections: false,
      search: '',
      // filter: [ 'desc', 'asc' ],
      filter: [
        {value: 'desc',  text: 'Highest to lowest'},
        {value: 'asc',  text: 'Lowest to highest'},
      ],
      resultsCollection: [],
      dataMenuCollections: [],
      indexPag: 0,
      order: 'desc',
      orderBy: 'desc',
    }
  },
  
  mounted() {
    this.searchCollections()
  },
  methods: {
    async searchCollections () {
      var data = []
      if(this.search === '') {
        this.$store.commit('Load', true)
      }
      await axios.post('https://evie.pro:3070/api/v1/SearchCollections', {
        'input': this.search,
        'limit': 20,
        'index': this.indexPag,
        "order": "volumen",
        "type_order": this.order
      }).then(response => {
        this.dataMenuCollections = []
        // console.log(response.data)
        response.data.forEach(item => {
          
          axios.post('https://evie.pro:3070/api/v1/collectiondetails', {
            'collection': item.nft_contract
          }).then(respData => {
            item.daily_volumen = respData.data[0].daily_volumen
            item.floor_price = respData.data[0].floor_price
            item.minted = respData.data[0].minted
            item.owners = respData.data[0].owners
          }).catch(erro => console.log(erro))
          if(item.icon == null) {
            axios.get("https://api-v2-mainnet.paras.id/collections?creator_id=" + item.nft_contract).then(res => {
              data = res.data.data.results
              if(data.length) {
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
                })
              } else {
                item.icon = require('@/assets/azul-color.png')
              }
            }).catch(erro => {
              console.log(erro)
              item.icon = require('@/assets/azul-color.png')
            })
          }
          this.dataMenuCollections.push(item)
        })
        this.$store.commit('Load', false)
      }).catch(err => {
        console.log(err)
        this.$store.commit('Load', false)
      })
    },
    viewNft(item) {
      localStorage.collections = JSON.stringify(item)
      localStorage.nft_contract = item.nft_contract
      this.$router.push({
        name: 'buy',
        params:{
          id: item.nft_contract,
        }
      })
    },
    nextItems() {
      this.indexPag = this.indexPag + 20
      this.searchCollections()
    },
    prevItems() {
      this.indexPag = this.indexPag - 20
      this.searchCollections()
    },
    changeOrder() {
      this.order = this.orderBy
      this.searchCollections()
    }
  },
  computed: {
    headers() {return [{ sortable: false, value: "name" }]},
  },
};
</script>

<style src="../pages.scss" lang="scss" />
