<template>
  <section id="buy">
    <MenuBuy ref="menu" :nftCart="nftCart" :cantCart="cantCart" :priceTotal="priceTotal"></MenuBuy>
    <h1 class="titulo h2mobile">BUY</h1>
    <v-row>
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
              <span class="resultsText">{{ totalNft }} RESULTS</span>
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
          <span class="resultsText eliminarmobile">{{ totalNft }} RESULTS</span>
        </aside>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col class="containerDown padd">
          <v-row>
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
                CART:{{ cantCart }}
                <span class="acenter">{{ priceTotal }}<img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near"></span>
              </button>
            </v-col>
          </v-row>
          <v-row>
            <v-col clas id="tableBuy" class="padd">
              <div v-for="(item, index) in dataBuyTable" v-bind:key="index"
                class="containerMarketplace" :class="{active: item.select}"
                @click="addCart(item)">

                <v-img class="images" :src="item.metadata.media" alt="NFT Market Place" />

                <span class="marketplaceId btn2" style="bottom: -5% !important">
                  # {{ item.token_id}}
                  <i class="center" style="margin-inline: 0.3125em">&bullet;</i>  
                  {{ item.price}}
                  <img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near">
                </span>

                <aside class="buttons">
                  <v-btn v-for="(item2,i) in item.market" :key="i" icon>
                    <img :src="require(`@/assets/buttons/${item2.name}.svg`)" alt="marketplace">
                  </v-btn>
                </aside>
              </div>
            </v-col>  
          </v-row>
          <v-row>
            <v-col class="containerPagination end">
              <v-btn v-for="(item,i) in dataPagination" :key="i"
                class="btn2" :class="{active: item.active}"
                @click="dataPagination.forEach(e=>{e.active=false});item.active=true">
                <v-icon large style="color:#58565b !important">mdi-chevron-{{item.icon}}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import MenuBuy from './MenuBuy.vue'
import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract } = nearAPI;
const CONTRACT_NAME = 'dev-1660244871256-92189441173983'

export default {
  name: "Buy",
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
      dataBuyTable: [],
      nftCart: [],
      dataPagination: [{ icon: 'left', active: false },{ icon: 'right', active: false },],
      cantCart: 0,
      priceTotal: 0,
      totalNft: 0,
      cartMenuBuy: [],
    }
  },
  mounted() {
    // console.log(this.$route.params.id)
    this.viewTokens()
    this.clearCart()
    this.getCartItems()
  },
  computed: {
    // DataBuyTable() {
    //   if (window.innerWidth <= 880) {return this.dataBuyTable.slice(0,4)}
    //   else {return this.dataBuyTable.slice(0,10)}
    // }
  },
  methods: {
    async viewTokens() {
      // console.log(this.collection)
      let params = ''
      if (this.ownerId !== '' || this.ownerId !== undefined) {
        params = '?account=' + this.ownerId
      }
      await axios.get('https://evienode.juanenriqueenr4.repl.co/api/near/mainnet/getMetadata' + params).then(response => {
      //console.log('aqui')
      //await axios.get('https://evienode.juanenriqueenr4.repl.co/api/near/testnet/getTokens?account=lindaley16.testnet&receivedContract=paras-token-v2.testnet').then(response => {
        // console.log(response.data)
        var data = response.data[0]
        data.forEach(item => {
          // console.log(item)
          // item.metadata.title = item.metadata.title.toLowerCase()
          // this.collection = this.collection.toLowerCase()
          // if(item.metadata.title.search(this.collection) != -1) {
            // console.log(item.metadata.title, 'titleNft', this.collection, 'title collection')
            item.metadata.media = 'https://ipfs.fleek.co/ipfs/' + item.metadata.media
            // console.log(item)
            item.select = false
            item.price = 1
            item.market = [
              {name: 'paras'},
              {name: 'mintbase'},
            ]
            this.dataBuyTable.push(item)
          // }
        });
        //console.log(this.dataBuyTable)
        this.totalNft = this.dataBuyTable.length
      }).catch(err => console.log(err))
    },
    addCart(item) {
      const index = this.nftCart.indexOf(item)
      if (index > -1) {
        this.nftCart.splice(index, 1);
        item.select = false
        // console.log(this.nftCart)
        this.cantCart = this.cantCart - 1
        this.priceTotal = this.priceTotal - item.price
        this.removeCartItem(item)
      } else {
        this.nftCart.push(item)
        item.select = true
        this.cantCart = this.nftCart.length
        this.priceTotal = this.priceTotal + item.price
        // console.log(this.nftCart)
        this.addCartItem(item)
      }
    },
    async addCartItem(item) {
      // connect to NEAR
      var itemNft = {
        token_id: item.token_id,
        contract_id: 'paras-token-v2.testnet',
      }

      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["add_item"],
        sender: wallet.account(),
      })
      await contract.add_item({
        user: wallet.getAccountId(),
        item: itemNft
      }, '85000000000000',
      ).then((response) => {
        console.log(response);
        this.getCartItems()
      }).catch(err => {
        console.log(err)
      })
    },
    async removeCartItem(item) {
      // connect to NEAR
      var itemNft = {
        token_id: item.token_id,
        contract_id: 'paras-token-v2.testnet',
      }

      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["remove_item"],
        sender: wallet.account(),
      })
      await contract.remove_item({
        user: wallet.getAccountId(),
        item: itemNft
      }, '85000000000000',
      ).then((response) => {
        console.log(response);
        this.getCartItems()
      }).catch(err => {
        console.log(err)
      })
    },
    async clearCart() {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["clear_cart"],
        sender: wallet.account(),
      })
      await contract.clear_cart({
        user: wallet.getAccountId(),
      }, '85000000000000',
      ).then((response) => {
        console.log(response);
        this.getCartItems()
      }).catch(err => {
        console.log(err)
      })
    },
    async getCartItems() {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["get_cart_items"],
        sender: wallet.account(),
      })
      await contract.get_cart_items({
        user: wallet.getAccountId(),
      }).then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err)
      })
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
