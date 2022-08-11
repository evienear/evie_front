<template>
  <section id="buy">
    <MenuBuy ref="menu"></MenuBuy>
    <h1 class="titulo h2mobile">BUY</h1>

    <v-col class="containerUp divcol padd marginbottom">
      <aside class="divrow" style="gap: 6px; margin-bottom: -5px">
        <button class="botonBack center" @click="$router.push('/')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>

        <img src="@/assets/nft/monkey1.png" class="images" alt="image nft collection">

        <div class="divcol jcenter" style="gap:.5em">
          <span class="tituloBack" style="max-width:max-content">NEARNUTS</span>
          <!-- desktop -->
          <div class="contenidoInfo divrow eliminarmobile">
            <template v-for="(item,i) in dataBuy">
              <p :key="i" class="p space">
                Minted 
                <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ item.minted }}</strong>
              <i class="center color">&bullet;</i>
              </p>
              <p :key="i" class="p space">
                Owners 
                <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ item.owners }}</strong>
              <i class="center color">&bullet;</i>
              </p>
              <p :key="i" class="p space">
                Floor Prince 
                <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ item.floor }}
                  <img class="nearBalanceLogo filter" src="@/assets/logo/near.svg" alt="near">
                </strong>
              <i class="center color">&bullet;</i>
              </p>
              <p :key="i" class="p space">
                Daily Volume 
                <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ item.daily }}</strong>
              </p>
            </template>
          </div>

          <!-- mobile -->
          <aside class="acenter vermobile" style="gap:1em">
            <h4 class="educationText p center btn2">EDUCATION</h4>
            <span class="resultsText">2.845 RESULTS</span>
          </aside>
        </div>
      </aside>

      <aside class="sectdown">
        <!-- mobile -->
        <div class="contenidoInfo divrow divwrapmobile vermobile">
          <template v-for="(item,i) in dataBuy">
            <p :key="i" class="p space">
              Minted 
              <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ item.minted }}</strong>
            <i class="center color">&bullet;</i>
            </p>
            <p :key="i" class="p space">
              Owners 
              <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ item.owners }}</strong>
            <i class="center color">&bullet;</i>
            </p>
            <p :key="i" class="p space">
              Floor Prince 
              <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ item.floor }}
                <img class="nearBalanceLogo filter" src="@/assets/logo/near.svg" alt="near">
              </strong>
            <i class="center color">&bullet;</i>
            </p>
            <p :key="i" class="p space">
              Daily Volume 
              <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ item.daily }}</strong>
            </p>
          </template>
        </div>

        <!-- desktop -->
        <h4 class="educationText p center btn2 eliminarmobile">EDUCATION</h4>
        <span class="resultsText eliminarmobile">2.845 RESULTS</span>
      </aside>
    </v-col>

    <v-col class="containerDown padd">
      <v-col class="space aendmobile divcolmobile" style="padding-block: 0 2em;gap: 1em">
        <div class="fill-w jend">
          <v-col v-for="(item,i) in dataFilter" :key="i" sm="6" md="4" lg="3"
            class="center paddvertical">
            <v-select
              :items="item.selection"
              :hide-details="true"
            >
              <template v-slot:label>
                <span class="titleAutocompleteBuy h8 color">{{ item.title }}</span>
              </template>

              <template v-slot:append>
                <v-icon large class="color">mdi-chevron-down</v-icon>
              </template>
            </v-select>
          </v-col>
        </div>

        <button class="rightButton btn2 fill-w paddleftmobile"
          @click="$refs.menu.dialog=true">
          CART:4 
          <span class="acenter">84<img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near"></span>
        </button>
      </v-col>

      <v-col id="tableBuy" class="padd">
        <div v-for="(item, index) in DataBuyTable" v-bind:key="index"
          class="containerMarketplace" :class="{active: item.select}"
          @click="item.select=!item.select">

          <img class="images" :src="item.img" alt="NFT Market Place">

          <span class="marketplaceId btn2" style="bottom: -5% !important">
            # {{ item.number }}
            <i class="center" style="margin-inline: 0.3125em">&bullet;</i>  
            {{ item.amount}}
            <img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near">
          </span>

          <aside class="buttons">
            <v-btn v-for="(item2,i) in item.market" :key="i" icon>
              <img :src="require(`@/assets/buttons/${item2.name}.svg`)" alt="marketplace">
            </v-btn>
          </aside>
        </div>
      </v-col>

      <v-col class="containerPagination end">
        <v-btn v-for="(item,i) in dataPagination" :key="i"
          class="btn2" :class="{active: item.active}"
          @click="dataPagination.forEach(e=>{e.active=false});item.active=true">
          <v-icon large style="color:#58565b !important">mdi-chevron-{{item.icon}}</v-icon>
        </v-btn>
      </v-col>
    </v-col>
  </section>
</template>

<script>
import MenuBuy from './MenuBuy.vue'
// import axios from 'axios'

export default {
  name: "Buy-Limit",
  components: { MenuBuy },
  data() {
    return {
      ownerId: this.$route.params.id,
      collection: localStorage.collections,
      dataBuy: [
        {
          minted: "8796",
          owners: "1987",
          floor: "20",
          daily: "$8,976",
        },
      ],
      dataFilter: [
        {
          title: "LOWEST PRICE",
          selection: [ 'foo', 'bar', 'fizz', 'buzz' ]
        },
        {
          title: "ATTRIBUTE",
          selection: [ 'foo', 'bar', 'fizz', 'buzz' ]
        }
      ],
      buyTable: 0,
      dataBuyTable: [
        {
          img: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'xdn' },
            { name: 'doge' },
          ]
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'xdn' },
            { name: 'doge' },
            { name: 'auto' },
          ]
        },
        {
          img: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'xdn' },
            { name: 'doge' },
            { name: 'dlt' },
            { name: 'auto' },
          ]
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'doge' },
            { name: 'auto' },
          ]
        },
        {
          img: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'doge' },
            { name: 'dlt' },
            { name: 'auto' },
          ]
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'xdn' },
            { name: 'doge' },
            { name: 'dlt' },
            { name: 'auto' },
          ]
        },
        {
          img: require("@/assets/nft/monkeyA5.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'doge' },
            { name: 'dlt' },
            { name: 'auto' },
          ]
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'xdn' },
            { name: 'auto' },
          ]
        },
        {
          img: require("@/assets/nft/monkeyA4.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'xdn' },
            { name: 'dlt' },
            { name: 'auto' },
          ]
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: 'xdn' },
            { name: 'doge' },
          ]
        },
      ],
      dataPagination: [{ icon: 'left', active: false },{ icon: 'right', active: false },]
    }
  },
  mounted() {
    // console.log(this.$route.params.id)
    // this.viewTokens()
  },
  computed: {
    DataBuyTable() {
      if (window.innerWidth <= 880) {return this.dataBuyTable.slice(0,4)}
      else {return this.dataBuyTable.slice(0,10)}
    }
  },
  methods: {
    // async viewTokens() {
      // let params = ''
      // if (this.ownerId !== '' || this.ownerId !== undefined) {
      //   params = '?account=' + this.ownerId
      // }
      // await axios.get('https://evienode.juanenriqueenr4.repl.co/api/near/mainnet/getMetadata' + params).then(response => {
      //   console.log(response.data[0])
      // }).catch(err => console.log(err))
    // }
  }
};
</script>

<style src="../pages.scss" lang="scss" />
