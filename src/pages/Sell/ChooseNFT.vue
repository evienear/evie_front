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

      <aside class="start">
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
      </aside>
    </v-col>
    <!-- AQUI COMIENZAN LOD NFT -->
    <section class="wrapperContent gapmobile">
      <v-col class="containerLeft" style="padding-top: 0">
        <v-card v-for="(item,i) in dataChooseNFTTable" :key="i" color="transparent"
          class="containerMarketplace relative" :class="{active: item.selected}">

          <img class="images" :src="item.metadata.media" alt="NFT Market Place" @click="item.selected=!item.selected, viewMarketplace(item)">

          <span class="marketplaceId btn2 h8">
            #{{ item.token_id }}
          </span>
        </v-card>
      </v-col>
      <!-- HASTA AQUI -->
      <v-col class="containerRight" style="padding-top: 0">
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
          <template v-slot:selection="slotProps">
            <img :src="slotProps.item.img" :alt="item.marketplace">
          </template>

          <template v-slot:item="slotProps">
            <v-col :class="{ colActive: slotProps.item.active }"
              @click="slotProps.item.active=!slotProps.item.active">
              <img :src="slotProps.item.img">
              <span>
                {{ slotProps.item.marketplace }}
              </span>
            </v-col>
          </template>
        </v-select>

        <section class="containerSellSettings">
          <v-card v-for="(item,i) in dataSellSettings" :key="i" color="transparent">
            <aside class="divrow" style="gap:clamp(.5em, 1vw, 1em)">
              <img class="images" src="@/assets/nft/monkeyA2.png" alt="nft" style="--border-size: 4px">
              <div class="divcol astart jcenter">
                <span class="h7" style="font-weight: 500">{{ item.title}}</span>
                <span class="marketplaceId btn2 h7">#{{ item.number }}</span>
              </div>
            </aside>

            <aside class="center marginright" style="gap: 3px">
              <span style="font-size: clamp(1.2em, 1.5vw, 1.5em)">{{ item.amount }}</span>
              <img class="filter" src="@/assets/logo/near.svg" alt="near"
                style="width:1.5em; height:1.5em">
            </aside>
          </v-card>
        </section>

        <v-col class="center">
          <button class="button btn2" @click="$router.push('/review-sell')">
            REVIEW<v-icon medium>mdi-chevron-right</v-icon>
          </button>
        </v-col>
      </v-col>
    </section>
  </section>
</template>

<script>
import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI;
//const CONTRACT_NAME = 'backend.evie.testnet'
export default {
  name: "ChooseNFT",
  data() {
    return {
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
      dataChooseNFTTable: [],
      sameSellPrice: false,
      dataSellSettings: [
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
        },
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
        },
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
        },
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
        }
      ],
      marketplace: [
        // {img: require("@/assets/buttons/auto.svg"), active: false},
        // {img: require("@/assets/buttons/doge.svg"), active: false},
        // {img: require("@/assets/buttons/dlt.svg"), active: false},
        // {img: require("@/assets/buttons/xdn.svg"), active: false}
      ],
      selectedItem: [],
      data: [],
    }
  },
  mounted() {
    this.viewTokens()
  },
  methods: {
    async viewTokens() {
      // console.log(this.collectionId)
      // axios.post('http://157.230.2.213:3071/api/v1/listnftowner', {
      axios.post('http://157.230.2.213:3072/api/v1/listnftowner', {
        "owner": localStorage.walletAccountId,
        "limit": 1000,
        "index": 0
      }).then(response => {
        console.log(response.data)
        response.data.forEach(item => {
          this.market(item.token_id, item.precio, item.base_uri, item.marketplace, item.collection)
        });
        // this.totalNft = this.dataNftTokens.length
        // this.armarAtributos()
        console.log(this.dataChooseNFTTable)
      }).catch(err => console.log(err))
    },
    async market(token_id, precio, base_uri, marketplace, collection) {
      console.log(token_id)
      this.dataNftTokens = []
      var price = ''
      if(precio !== null) {
        price = utils.format.formatNearAmount((precio.toString()))
      } else {
        price = 0
      }
      
      var responseData = []
      // const CONTRACT = this.ownerId.toString();
      // connect to NEAR
      const near = await connect(
        //CONFIG(new keyStores.BrowserLocalStorageKeyStore(), 'mainnet')
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
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
        responseData.forEach(item => {
          if(marketplace !== null) {
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
            item.collection = collection
            this.dataChooseNFTTable.push(item)
          }
        });
      }).catch(err => {
        console.log(err)
      });
    },
    async storageDeposit(contractName) {
      // connect to NEAR
      const near = await connect(
          CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const walletId = wallet.getAccountId()
      const contract = new Contract(wallet.account(), contractName, {
          changeMethods: ["storage_deposit"],
          sender: wallet.account(),
      })
      await contract.storage_deposit({
          account_id: walletId,
      }, "300000000000000", // attached GAS (optional)
      "8590000000000000000000").then((response) => {
        console.log(response)
          this.approval(contractName)
      });
    },
    async approval (contractName) {
      // connect to NEAR
      const near = await connect(
          CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), contractName, {
          changeMethods: ["add_approved_nft_contract_ids"],
          sender: wallet.account(),
      })
      await contract.add_approved_nft_contract_ids({
          nft_contract_ids: [this.collections.contract]
      }, "300000000000000", // attached GAS (optional)
      "1").then((response) => {
          console.log(response);
      });
    },
    async viewMarketplace(item) {
      // axios.post('http://157.230.2.213:3071/api/v1/listmarketplacecollection', {
      axios.post('http://157.230.2.213:3072/api/v1/listmarketplacecollection', {
        "collection": item.collection
      }).then(response => {
        console.log(response.data)
        response.data.forEach(item => {
          this.marketplace.push({
          marketplace: item.marketplace,
          img: '',
          active: false,
        })
        });
      }).catch(err => console.log(err))
      this.data.push(item)
      console.log(this.data)
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
