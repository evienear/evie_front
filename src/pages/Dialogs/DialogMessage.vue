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
                  <img class="nft images" :src="item.media" alt="token" />
                  <span class="h8" style="font-weight: 400">{{ item.collection }}</span>
                </aside>
                <span class="h8">
                  <strong>$ {{ item.avg_price_usd.toFixed(2) }}</strong>
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
//const contarct = 'evie.jeph.testnet'
export default {
  name: "Home",
  data() {
    return {
      menuCollections: true,
      search: '',
      filter: [ 'foo', 'bar', 'fizz', 'buzz' ],
      resultsCollection: [],
      dataMenuCollections: [
        // {
        //   nft: require("@/assets/nft/monkey1.png"),
        //   name: "Antisocial Ape Club",
        //   price: "1,953,504.15"
        // },
        // {
        //   nft: require("@/assets/nft/monkey2.png"),
        //   name: "NearNauts",
        //   price: "9960,472.42"
        // },
        // {
        //   nft: require("@/assets/nft/monkey3.png"),
        //   name: "Secret Skellies Society",
        //   price: "636,861.42"
        // },
        // {
        //   nft: require("@/assets/nft/monkey4.png"),
        //   name: "The MunkyMonkey",
        //   price: "579,809.53"
        // },
        // {
        //   nft: require("@/assets/nft/monkey5.png"),
        //   name: "Near Kongz",
        //   price: "481,256.38",
        // },
      ],
    }
  },
  mounted() {
    this.collections()
  },
  methods: {
    async collections () {
      await axios.get('https://evienode.juanenriqueenr4.repl.co/api/near/mainnet/getMostSelledCollections?5').then(response => {
        console.log(response.data.data.results)
        this.resultsCollection = response.data.data.results
        this.dataMenuCollections = this.resultsCollection
        // this.resultsCollection.forEach(item => {
        //   this.dataMenuCollections.push({
        //     nft: item.media,
        //     name: item.collection,
        //     price: item.avg_price_usd.toFixed(2)
        //   })
        // })
      }).catch(err => console.log(err))
    },
    viewNft(item) {
      localStorage.collections = item.collection
      this.$router.push({
        name: 'buy',
        params:{
          id: item.creator_id,
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
