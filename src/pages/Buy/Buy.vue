<template>
  <section id="buy">
    <MenuBuy ref="menu" :nftCart="nftCart" :cantCart="cantCart" :priceTotal="priceTotal"></MenuBuy>
    <!-- <DrawerFilterMobile :DataChips="dataChips" :DataFilterAtribute="dataAtt2" ref="drawer"></DrawerFilterMobile> -->
    
    <h1 class="titulo h2mobile">BUY</h1>
    <v-row class="mt-3">
      <v-col class="containerUp divcol padd marginbottom">
        <aside class="divrow" style="gap: 6px; margin-bottom: -5px">
          <button class="botonBack center" @click="$router.push('/')">
            <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
          </button>
          <img :src="collection.icon" class="images" alt="image nft collection">

          <div class="divcol jcenter" style="gap:.5em">
            <span class="tituloBack" style="max-width:max-content">{{ collection.name }}</span>
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

              <button class="rightButton btn2 fill-w paddleftmobile"
                @click="$refs.menu.dialog=true, priceTotalNft()">
                CART:{{ cantCart }}
                <span class="acenter">{{ priceTotal }}<img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near"></span>
              </button>
                <template v-slot:append>
                  <v-icon large class="color">mdi-chevron-down</v-icon>
                </template>
              </v-select>
            </v-col>
          </div>

          <div class="end gap">
            <button class="vermobile" @click="$refs.drawer.drawer=true">
              <v-icon style="color: var(--color) !important">mdi-filter</v-icon>
            </button>

            <button class="rightButton btn2 fill-w paddleftmobile"
              @click="$refs.menu.dialog=true">
              CART:{{ cantCart }}
              <span class="acenter">{{ priceTotal }}<img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near"></span>
            </button>
          </div>
        </v-col>
      </v-row>

      <section class="containerDown-content">
        <aside class="container-filter-left eliminarmobile">
          <div class="container-filter-left-head">
            <div class="space gap">
              <h5 class="p h10-em">Atribute filter</h5>
              <a class="h11-em" @click="dataFilterAtribute.forEach(e=>e.list.forEach(e2=>e2.selected=false));dataChips=[]">Clear all</a>
            </div>

            <div>
              <v-chip v-for="(item,i) in dataChips" :key="i" close close-icon="mdi-close" @click:close="
                dataChips.splice(dataChips.indexOf(item),1);
                dataFilterAtribute.forEach(e=>{e.list.findIndex(data=>data==item)!==-1?e.list[e.list.findIndex(data=>data==item)].selected=false:null});
              ">
                {{item.name}}
              </v-chip>
            </div>
          </div>

          <v-expansion-panels class="container-filter-left-body">
            <v-expansion-panel v-for="(item,i) in dataFilterAtribute" :key="i">
              <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-list color="transparent">
                  <v-list-item v-for="(item2,i2) in item.list" :key="i2" :class="{selected: item2.selected}" @click="
                    item2.selected=!item2.selected; item2.selected?dataChips.push(item2):dataChips.splice(dataChips.indexOf(item2),1)
                  ">
                    <v-list-item-title>{{item2.name}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </aside>

        <v-col clas id="tableBuy" class="padd">
          <div v-for="(item, index) in dataNftTokens" v-bind:key="index"
            class="containerMarketplace" :class="{active: item.select}"
            @click="addCart(item)">

            <v-img class="images" :src="item.metadata.media" alt="NFT Market Place" />

            <span class="marketplaceId btn2" style="bottom: -5% !important">
              # {{ item.token_id}}
              <i class="center" v-show="item.price !== 0" style="margin-inline: 0.3125em">&bullet;</i>
              <span v-show="item.price !== 0">
                {{ item.price.toFixed(2) }}
              </span>
              <img class="nearBalanceLogo" v-show="item.price !== 0" src="@/assets/logo/near.svg" alt="near">
            </span>

            <aside class="buttons">
              <v-btn v-for="(item2,i) in item.market" :key="i" icon>
                <img :src="require(`@/assets/buttons/${item2.name}.svg`)" alt="marketplace">
              </v-btn>
            </aside>
          </div>
        </v-col>
      </section>

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


    <v-navigation-drawer v-model="drawer" fixed id="filterDrawer" width="300px">
    <aside class="container-filter-left">
      <div class="container-filter-left-head">
        <div class="space gap">
          <h5 class="p h10-em">Atribute filter</h5>
          <!-- <a class="h11-em" @click="$parent.dataAtt2.forEach(e=>e.list.forEach(e2=>e2.selected=false));$parent.dataChips=[]">Clear all</a> -->
          <a class="h11-em" @click="console.log(dataAtt2)">Clear all</a>
        </div>
      
        <div>
          <v-chip v-for="(item,i) in DataChips" :key="i" close close-icon="mdi-close" @click:close="
            $parent.dataChips.splice($parent.dataChips.indexOf(item),1);
            $parent.dataFilterAtribute.forEach(e=>{e.list.findIndex(data=>data==item)!==-1?e.list[e.list.findIndex(data=>data==item)].selected=false:null});
          ">
            {{item.name}}
          </v-chip>
        </div>
      </div>

      <v-expansion-panels class="container-filter-left-body">
        <v-expansion-panel v-for="(item, i) in dataAtt2" :key="i">
          <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-list color="transparent">
              <v-list-item v-for="(item2,i2) in dataAtt[item.name]" :key="i2" :class="{selected: item2.check}" @click="
                item2.check=!item2.check; item2.check?$parent.dataChips.push(item2):$parent.dataChips.splice($parent.dataChips.indexOf(item2),1)
              ">
                <v-list-item-title>{{item2.name}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </aside>
  </v-navigation-drawer>
  </section>
</template>

<script>
import MenuBuy from './MenuBuy.vue'
//import DrawerFilterMobile from './DrawerFilterMobile.vue'
import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI;
const CONTRACT_NAME = 'backend.evie.testnet'
export default {
  name: "Buy",
  components: { MenuBuy, /*DrawerFilterMobile*/ },
  data() {
    return {
      drawer: false,
      collectionId: this.$route.params.id,
      collection: [],
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
      dataNftTokens: [],
      dataNftTokens2: [],
      nftCart: [],
      dataPagination: [{ icon: 'left', active: false },{ icon: 'right', active: false },],
      cantCart: 0,
      priceTotal: 0,
      totalNft: 0,
      cartMenuBuy: [],
      base_uri_null: '',
      dataAtt: [],
      dataAtt2: [],
      dataChips: [],
      dataFilterAtribute2: [],
      dataFilterAtribute: [
        // {
        //   title: "atribute",
        //   list: [
        //     {name: "value", selected: false},
        //     {name: "value", selected: false},
        //     {name: "value", selected: false},
        //   ],
        // },
        // {
        //   title: "atribute",
        //   list: [
        //     {name: "value", selected: false},
        //     {name: "value", selected: false},
        //     {name: "value", selected: false},
        //   ],
        // },
        // {
        //   title: "atribute",
        //   list: [
        //     {name: "value", selected: false},
        //     {name: "value", selected: false},
        //     {name: "value", selected: false},
        //   ],
        // },
      ],
    }
  },
  mounted() {
    this.collection = JSON.parse(localStorage.collections)
    this.viewTokens()
    this.clearCart()
    //this.removeCartItem()
    this.getCartItems()
    // setTimeout(this.armarAtributos(), 10000)
  },
  computed: {
    // DataBuyTable() {
    //   if (window.innerWidth <= 880) {return this.dataBuyTable.slice(0,4)}
    //   else {return this.dataBuyTable.slice(0,10)}
    // }
  },
  methods: {
    async viewTokens() {
      console.log(this.collectionId)
      // axios.post('http://157.230.2.213:3071/api/v1/listnft', {
      axios.post('http://157.230.2.213:3072/api/v1/listnft', {
        'collection': this.collectionId,
        'limit': 500,
        'index': 0,
        'sales': 'true',
        'order': 'precio',
        'type_order': 'asc'
      }).then(response => {
        //console.log(response.data)
        response.data.forEach(item => {
          if(item.precio !== null && item.marketplace !== null) {
            this.market(item.token_id, item.precio, item.base_uri, item.marketplace)
          }
        });
        
        this.armarAtributos()
        // setTimeout(this.armarAtributos(), 10000)

      }).catch(err => console.log(err))
    },
    // ver nft
    async market(token_id, precio, base_uri, marketplace) {
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
        // CONFIG(new keyStores.BrowserLocalStorageKeyStore(), 'mainnet')
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), this.collectionId, {
        viewMethods: ["nft_token"],
        sender: wallet.account(),
      });
      await contract.nft_token({
        token_id: token_id
      }).then((response) => {
        responseData[0] = response
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
          var object = item
          this.dataNftTokens.push(object)
        });
      }).catch(err => {
        console.log(err)
      });
    },
    async armarAtributos() {
      // this.dataNftTokens2.push(item)
      var attributes = []
      setTimeout(() => {
        this.totalNft = this.dataNftTokens.length
        this.dataNftTokens.forEach(item => {
          console.log(item)
          attributes.push(item.attributes)
        })
        this.dataAttributeNft(attributes)
      }, 1000)

    },
    dataAttributeNft(attributes) {
      const dataAttributes = []
      attributes.forEach(item => {
        item.forEach(data => {
          dataAttributes.push(data)
        })
      })
      console.log(dataAttributes, 'data atributos')

      const datos = []
      dataAttributes.forEach(item => {
        datos.push({
          name: item.trait_type,
          open: false,
        });
      });
      console.log(datos, 'datos')
      this.dataAtt2 = Object.values(datos.reduce((prev,next)=>Object.assign(prev,{[next.name]:next}),{}))
      this.dataAtt = this.groupBy(dataAttributes)
      console.log(this.dataAtt, 'attributes format')
      console.log(this.dataAtt2, 'attributes format')
    },
    groupBy(array) {
      const result = {}
      array.forEach(item => {
        if (!result[item['trait_type']]){
          result[item['trait_type']] = []
        }
        if(result[item['value']]) {
          result[item['trait_type']] = []
        }

        result[item['trait_type']].push({
          check: false,
          name: item.value,
        })
        result[item['trait_type']] = Object.values(result[item['trait_type']].reduce((prev,next)=>Object.assign(prev,{[next.name]:next}),{}))
      })
      // console.log(result, 'result')
      return result
    },
    addCart(item) {
      console.log(this.nftCart, 'en addCart options')
      const index = this.nftCart.indexOf(item.token_id)
      if (index > -1) {
        console.log(item, 'para eliminar')
        this.nftCart.splice(index, 1);
        item.select = false
        // console.log(this.nftCart)
        this.cantCart = this.cantCart - 1
        this.priceTotal = this.priceTotal - item.price
        this.removeCartItem(item)
      } else {
        // this.nftCart.push(item)
        item.select = true
        this.cantCart = this.nftCart.length
        // console.log(this.nftCart)
        this.addCartItem(item)
      }
    },
    async addCartItem(item) {
      // connect to NEAR
      var price = utils.format.parseNearAmount((item.price).toString())
      var itemNft = {
        token_id: item.token_id,
        contract_id: this.collectionId,
        contract_market: item.marketplace,
        price: price,
        base_uri: item.metadata.media,
      }
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["add_item"],
        sender: wallet.account(),
      })
      await contract.add_item({
        item: itemNft,
      }, '85000000000000').then((response) => {
        console.log(response, 'response addCart');
        //console.log(this.nftCart)
        this.getCartItems()
      }).catch(err => {
        console.log(err)
      })
    },
    async removeCartItem(item) {
      // connect to NEAR
      var price = utils.format.parseNearAmount((item.price).toString())
      var itemNft = {
        token_id: item.token_id,
        contract_id: this.collectionId,
        contract_market: item.marketplace,
        price: price,
        base_uri: item.media,
      }

      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["remove_item"],
        sender: wallet.account(),
      })
      await contract.remove_item({
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
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["clear_cart"],
        sender: wallet.account(),
      })
      await contract.clear_cart({}, '85000000000000',
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
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
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
        var precio = 0
        //console.log(response, 'getCartItems');
        this.nftCart = response
        this.priceTotal = 0
        this.nftCart.forEach(element => {
          precio = utils.format.formatNearAmount((element.price.toString()))
          element.precio = parseFloat(precio)
          this.priceTotal = this.priceTotal + element.precio
        });
        // console.log(this.nftCart, 'nftCartr getCartItems')
        this.cantCart = this.nftCart.length
      }).catch(err => {
        console.log(err)
      })
    },
    priceTotalNft() {
      localStorage.priceTotal = this.priceTotal.toString()
    }
  }
};
</script>

<style src="../pages.scss" lang="scss" />
