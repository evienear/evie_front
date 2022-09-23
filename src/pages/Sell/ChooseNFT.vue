<template>
  <section id="chooseNFT">
    <h1 class="titulo h2mobile">SELL</h1>

    <v-col class="padd" style="gap: 20px">
      <aside class="divrow" style="gap: 20px">
        <button class="botonBack center" @click="$router.push('/sell')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h3 class="tituloBack p">CHOOSE NFT's</h3>
      </aside>
      <aside class="end">
        <button class="button btn2" @click="dialog=true">
          Deposit
        </button>
      </aside>

      <!-- <aside class="start">
        <v-col v-for="(item, index) in dataFilter" v-bind:key="index"
          cols="6" sm="4" md="3" lg="2" class="center">
          <v-select
            :items="item.selection"
            hide-details="true"
          >
            <template v-slot:label>
              <span class="titleAutocompleteBuy h8 color">{{ item.title }}</span>
            </template>

            <template v-slot:append>
              <v-icon medium class="color">mdi-chevron-down</v-icon>
            </template>
          </v-select>
        </v-col>
      </aside> -->
      
    </v-col>
    <!-- AQUI COMIENZAN LOD NFT -->
    
    <section class="wrapperContent">
      <section class="containerLeft">
        <v-card v-for="(item,i) in dataChooseNFTTable" :key="i" color="transparent"
          class="containerMarketplace relative" :class="{active: item.selected}">

          <img class="images" :src="item.metadata.media" alt="NFT Market Place" @click="item.selected=!item.selected, viewMarketplace(item), dataNftSell(item)">

          <span class="marketplaceId btn2 h8">
            #{{ item.token_id }}
          </span>
        </v-card>
      </section>

      <!-- HASTA AQUI -->
      <section class="containerRight">
        <aside class="option space divwrap">
          <span class="h5">SELL SETTINGS</span>

          <div class="acenter" style="margin-left:auto; gap:.5em">
            <span class="h8 light">SAME SELL PRICE</span>
            <button class="sellPriceSwitcher" :class="{active:sameSellPrice}"
              @click="sameSellPrice=!sameSellPrice">
              <div class="switch" />
            </button>
          </div>
        </aside>

        <v-select
            v-model="selectedItem"
            :items="marketplace"
          >
            <template v-slot:label>
              <span class="titleAutocompleteBuy h8 color">Select Marketplace</span>
            </template>

            <template v-slot:append>
              <v-icon medium class="color">mdi-chevron-down</v-icon>
            </template>
          </v-select>

        <section class="containerSellSettings mt-2">
          <v-card v-for="(item, i) in dataSellSettings" :key="i" color="transparent">
            <aside class="space fill-w" style="gap:clamp(.5em, 1vw, 1em)">
              <div class="acenter" style="gap:clamp(.5em, 1vw, 1em)">
                <v-img class="images" width="clamp(5.5em, 7vw, 7em)" height="clamp(5.5em, 7vw, 7em)" :src="item.metadata.media" alt="nft" style="--border-size: 4px" />
                <div class="divcol astart jcenter" style="gap:.5em">
                  <span class="name h8-em" style="font-weight: 500">{{ item.metadata.title}}</span>
                  <span class="marketplaceId btn2 h8-em">#{{ item.token_id }}</span>
                </div>
              </div>
              
              <div v-show="!sameSellPrice" class="center marginright" style="gap: 3px">
                <span style="font-size: clamp(1.2em, 1.5vw, 1.5em)">{{ item.price.toFixed(2) }}</span>
                <img class="filter" src="@/assets/logo/near.svg" alt="near"
                  style="width:1.5em; height:1.5em">
              </div>
            </aside>
            
            <v-text-field
              v-show="!sameSellPrice && dataSellSettings.length"
              v-model="price"
              class="custome"
              solo dense
            >
              <template v-slot:prepend>
                <label>Amount in Near</label>
              </template>
            </v-text-field>
          </v-card>
        </section>

        <v-col class="center">
          <button class="button btn2" @click="approve()">
            SELL
          </button>
        </v-col>
      </section>
    </section>


    <v-dialog
      id="dialog"
      v-model="dialog"
      max-width="832.49px"
      :overlay-opacity="$store.state.overlay.opacity"
      :overlay-color="$store.state.overlay.color"
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <span>Desposit</span>
        </v-col>
        <v-col cols="6" class="center">
          <v-select
            v-model="marketplaceDeposit"
            :items="selectionMarket"
            hide-details="true"
          >
            <template v-slot:label>
              <span class="titleAutocompleteBuy h8 color">Select Marketplace</span>
            </template>

            <template v-slot:append>
              <v-icon medium class="color">mdi-chevron-down</v-icon>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" class="center">
          <v-text-field
            v-model="amountStorage"
            class="custome"
            solo dense
            @keypress="onlyNumber"
          >
            <template v-slot:prepend>
              <label>Amount in Near</label>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" class="center">
          <button class="button btn2" @click="storage()">
            save
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
        <v-col v-show="transactionHashes !== ''" cols="12" class="center">
          <a :href="'https://explorer.mainnet.near.org/transactions/' + transactionHashes">
            {{ transactionHashes }}
          </a>
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
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI;
// const CONTRACT_NAME = 'backend.evie.testnet'
// const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "ChooseNFT",
  data() {
    return {
      marketplaceDeposit: '',
      price: '',
      dialog: false,
      amountStorage: 0,
      dataFilter: [
        {
          title: "COLLECTIONS",
          selection: [ 'foo', 'bar', 'fizz', 'buzz' ]
        },
        {
          title: "CARD CREATED",
          selection: [ 'foo', 'bar', 'fizz', 'buzz' ]
        }
      ],
      selectionMarket: [],
      dataChooseNFTTable: [],
      sameSellPrice: false,
      dataSellSettings: [
        // {
        //   nft: require("@/assets/nft/monkeyA1.png"),
        //   title: "NEARNAUT",
        //   number: "3706",
        //   amount: "0,00",
        // },
        // {
        //   nft: require("@/assets/nft/monkeyA1.png"),
        //   title: "NEARNAUT",
        //   number: "3706",
        //   amount: "0,00",
        // },
        // {
        //   nft: require("@/assets/nft/monkeyA1.png"),
        //   title: "NEARNAUT",
        //   number: "3706",
        //   amount: "0,00",
        // },
        // {
        //   nft: require("@/assets/nft/monkeyA1.png"),
        //   title: "NEARNAUT",
        //   number: "3706",
        //   amount: "0,00",
        // }
      ],
      marketplace: [
        // {img: require("@/assets/buttons/auto.svg"), active: false},
        // {img: require("@/assets/buttons/doge.svg"), active: false},
        // {img: require("@/assets/buttons/dlt.svg"), active: false},
        // {img: require("@/assets/buttons/xdn.svg"), active: false}
      ],
      selectedItem: '',
      data: [],
      dialogMessage: false,
      titleDM: '',
      messageDM:'',
      transactionHashes: '',
    }
  },
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.get("transactionHashes")
    this.hash = "https://explorer.mainnet.near.org/transactions/" + urlParams.get("transactionHashes")
    if (urlParams.get("transactionHashes") !== null) {
      // console.log('aqui' + urlParams.get("transactionHashes"))
      setTimeout(() => {
        axios.post('https://evie.pro:3070/api/v1/refrescarnft').then(response => { console.log(response) }).catch(err => { console.log(err) })
      }, 35000)
      this.dialogMessage = true
      this.titleDM = 'Successful'
      this.messageDM = 'Successful listing'
      this.transactionHashes = urlParams.get("transactionHashes")
      // this.$router.go(0)
      history.replaceState(null, location.href.split("?")[0], '/#/sell');
      
    }
    if (urlParams.get("errorCode") !== null) {
      history.replaceState(null, location.href.split("?")[0], '/#/sell');
    }
    this.viewTokens()
    this.listMarkets()
  },
  methods: {
    async viewTokens() {
      axios.post('https://evie.pro:3070/api/v1/listnftowner', {
      // axios.post('http://157.230.2.213:3071/api/v1/listnftowner', {
      // axios.post('http://157.230.2.213:3072/api/v1/listnftowner', {
        "owner": localStorage.walletAccountId,
        "limit": 1000,
        "index": 0
      }).then(response => {
        // console.log(response.data)
        response.data.forEach(item => {
          this.market(item.token_id, item.precio, item.base_uri, item.marketplace, item.collection)
        });
        // this.totalNft = this.dataNftTokens.length
        // this.armarAtributos()
        // console.log(this.dataChooseNFTTable)
      }).catch(err => console.log(err))
    },
    async market(token_id, precio, base_uri, marketplace, collection) {
      // console.log(token_id, 'token id')
      this.dataNftTokens = []
      var price = ''
      if(precio !== null) {
        price = utils.format.formatNearAmount((precio.toString()))
      } else {
        price = 0
      }
      var responseData = []
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), collection, {
        viewMethods: ["nft_token"],
        sender: wallet.account(),
      });
      await contract.nft_token({
        token_id: token_id
      }).then((response) => {
        responseData[0] = response
        // console.log(responseData)
        responseData.forEach(item => {
          if (item.metadata.extra !== null) {
            item.metadata.extra = JSON.parse(item.metadata.extra)
            item.attributes = item.metadata.extra.atributos
          } 
          if (item.metadata.extra == null) {
            // item.metadata.extra = base_uri + '/' + item.metadata.reference
            axios.get(base_uri + '/' + item.metadata.reference).then(res => {
              // console.log(res.data.attributes)
              item.attributes = res.data.attributes
            }).catch(err => {
              console.log(err)
            })
          }
          if (base_uri !== null) {
            item.metadata.media = base_uri + '/' + item.metadata.media
          }
          item.marketplace = marketplace
          item.price = parseFloat(price)
          item.precio = precio
          item.collection = collection
          // console.log(item)
          this.dataChooseNFTTable.push(item)
        });
      }).catch(err => {
        console.log(err)
      });
    },
    async listMarkets() {
      axios.post('https://evie.pro:3070/api/v1/listmarketplace').then(response => {
      // axios.post('http://157.230.2.213:3071/api/v1/listmarketplace').then(response => {
      // axios.post('http://157.230.2.213:3072/api/v1/listmarketplace').then(response => {
        response.data.forEach(item => {
          this.selectionMarket.push(item.marketplace)
        });
      }).catch(err => console.log(err))
    },
    async storage() {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), this.marketplaceDeposit, {
        changeMethods: ["storage_deposit"],
        sender: wallet.account(),
      })
      await contract.storage_deposit({
        account_id: wallet.getAccountId()
      },
      '85000000000000',
      utils.format.parseNearAmount((this.amountStorage).toString())
      ).then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err)
      });
    },
    dataNftSell(item) {
      this.dataSellSettings.push(item)
    },
    async approve() {
      // console.log(this.selectedItem, 'market a vender')
      var msg = ''
      var price = 0
      if(!this.sameSellPrice) {
        price = utils.format.parseNearAmount((this.price).toString())
        msg = JSON.stringify({
          market_type: "sale", price: price, ft_token_id: "near"
        })
      } else if(this.sameSellPrice) {
        msg = JSON.stringify({
          market_type: "sale", price: this.dataSellSettings[0].precio, ft_token_id: "near"
        })
      }
      // console.log(msg)
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), this.dataSellSettings[0].collection, {
        changeMethods: ["nft_approve"],
        sender: wallet.account(),
      })
      await contract.nft_approve({
        token_id: this.dataSellSettings[0].token_id,
        account_id: this.selectedItem,
        msg: msg,
      },
      '85000000000000',
      '350000000000000000000'
      ).then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err)
      });
    },
    async viewMarketplace(item) {
      console.log(item.collection)
      axios.post('https://evie.pro:3070/api/v1/listmarketplacecollection', {
      // axios.post('http://157.230.2.213:3071/api/v1/listmarketplacecollection', {
      // axios.post('http://157.230.2.213:3072/api/v1/listmarketplacecollection', {
        "collection": item.collection
      }).then(response => {
        // console.log(response.data)
        response.data.forEach(item => {
          this.marketplace.push(item.marketplace)
        });
      }).catch(err => console.log(err))
      // this.data.push(item)
      // console.log(this.data)
    },
    onlyNumber ($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
      }
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
