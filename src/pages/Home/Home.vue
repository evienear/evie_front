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
            mobile-breakpoint="-1"
            class="colorCartas"
          >
            <template v-slot:top>
              <v-col class="containerControlsHeader space" style="padding-top: 0">
                <v-col class="center contSearch">
                  <v-text-field
                    id="search"
                    v-model="search"
                    solo background-color="transparent"
                    hide-details="true"
                    maxlength="20"
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
                    :hide-details="true"
                    append-icon="mdi-chevron-down"
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
                  <img class="nft images" :src="item.icon" alt="token" />
                  <span class="h8" style="font-weight: 400">{{ item.name }}</span>
                </aside>
                <span class="h8">
                  <strong>$ 502.22</strong>
                </span>
              </button>
            </template>
          </v-data-table>
        </v-col>
      </section>
    </v-dialog>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: "Home",
  data() {
    return {
      menuCollections: false,
      search: '',
      filter: [ 'foo', 'bar', 'fizz', 'buzz' ],
      resultsCollection: [],
      dataMenuCollections: [],
    }
  },
  
  mounted() {
    this.collections()
  },
  methods: {
    async collections () {
      this.$store.commit('Load', true)
      await axios.post('https://evie.pro:3070/api/v1/listcollections', {
      // await axios.post('http://157.230.2.213:3071/api/v1/listcollections', {
      // await axios.post('http://157.230.2.213:3072/api/v1/listcollections', {
        'limit': 20,
        'index': 0,
      }).then(response => {
        // console.log(response.data)
        // this.dataMenuCollections = response.data
        response.data.forEach(item => {
          if(item.nft_contract === 'asac.near') { item.icon = 'https://paras-cdn.imgix.net/bafybeigc6z74rtwmigcoo5eqcsc4gxwkganqs4uq5nuz4dwlhjhrurofeq?w=800&auto=format,compress' }
          this.dataMenuCollections.push(item)
        })
        this.$store.commit('Load', false)
        console.log(this.dataMenuCollections)
      }).catch(err => console.log(err))
    },
    viewNft(item) {
      localStorage.collections = JSON.stringify(item)
      this.$router.push({
        name: 'buy',
        params:{
          id: item.nft_contract,
        }
      })
    },
  },
  computed: {
    headers() {return [{ sortable: false, value: "name" }]},
  },
};
</script>

<style src="../pages.scss" lang="scss" />
