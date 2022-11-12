<template>
  <section id="buy">
    <MenuBuy ref="menu" :nftCart="nftCart" :cantCart="cantCart" :priceTotal="priceTotal"></MenuBuy>
    
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
              <template>
                <p class="p space">
                  Minted
                  <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ parseFloat(collection.minted) }}</strong>
                <i class="center color">&bullet;</i>
                </p>
                <p class="p space">
                  Owners
                  <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ parseFloat(collection.owners) }}</strong>
                <i class="center color">&bullet;</i>
                </p>
                <p class="p space">
                  Floor Prince
                  <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ parseFloat(collection.floor_price).toFixed(2) }}
                    <img class="nearBalanceLogo filter" src="@/assets/logo/near.svg" alt="near">
                  </strong>
                <i class="center color">&bullet;</i>
                </p>
                <p class="p space">
                  Daily Volume
                  <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ parseFloat(collection.daily_volumen).toFixed(2) }}</strong>
                </p>
              </template>
            </div>

            <!-- mobile -->
            <aside class="acenter vermobile" style="gap:1em">
              <h4 class="educationText p center btn2" @click="viewFormEducation()" style="cursor: pointer">EDUCATION</h4>
              <span class="resultsText">{{ totalNft }} RESULTS</span>
            </aside>
          </div>
        </aside>

        <aside class="sectdown">
          <!-- mobile -->
          <div class="contenidoInfo divrow divwrapmobile vermobile">
            <template>
              <p class="p space">
                Minted
                <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ parseFloat(collection.minted) }}</strong>
              <i class="center color">&bullet;</i>
              </p>
              <p class="p space">
                Owners
                <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ parseFloat(collection.owners) }}</strong>
              <i class="center color">&bullet;</i>
              </p>
              <p class="p space">
                Floor Prince
                <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ parseFloat(collection.floor_price).toFixed(2) }}
                  <img class="nearBalanceLogo filter" src="@/assets/logo/near.svg" alt="near">
                </strong>
              <i class="center color">&bullet;</i>
              </p>
              <p class="p space">
                Daily Volume
                <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ parseFloat(collection.daily_volumen).toFixed(2) }}</strong>
              </p>
            </template>
          </div>

          <!-- desktop -->
          <h4 class="educationText p center btn2 eliminarmobile" @click="viewFormEducation()" style="cursor: pointer">EDUCATION</h4>
          <span class="resultsText eliminarmobile">{{ totalNft }} RESULTS</span>
        </aside>
      </v-col>
    </v-row>

    <v-col class="containerDown padd">
      <v-row>
        <v-col class="space aendmobile divcolmobile" style="padding-block: 0 2em;gap: 50px">
          <div class="fill-w jend">
            <v-col v-for="(item,i) in dataFilter" :key="i" sm="6" md="4" lg="3"
              class="center paddvertical">
              <v-select
                v-model="priceFilter"
                :items="item.selection"
                :hide-details="true"
                @change="filterPrice()"
                multiple
              >
                <template v-slot:label>
                  <span class="titleAutocompleteBuy h8 color">{{ item.title }}</span>
                </template>
                <template v-slot:[`item`]="{ item }">
                  <v-list-item @click="clickValueFilter=item.value">
                    
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.text }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>

                  <!-- <button class="rightButton btn2 fill-w paddleftmobile"
                    @click="$refs.menu.dialog=true, priceTotalNft()">
                    CART:{{ cantCart }}
                    <span class="acenter">{{ priceTotal }}<img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near"></span>
                  </button> -->
                <template v-slot:append>
                  <v-icon large class="color">mdi-chevron-down</v-icon>
                </template>
              </v-select>
            </v-col>
          </div>

          <div class="end gap">
            <!-- <button class="vermobile" @click="$refs.drawer.drawer=true">
              <v-icon style="color: var(--color) !important">mdi-filter</v-icon>
            </button> -->
            
            <div class="divcol" style="gap: 40px">
              <button class="rightButton btn2 fill-w paddleftmobile" style="--corner-size: 3.5px"
                @click="openCart()">
                CART:{{ nftCart.length }}
                <span class="acenter">{{ parseFloat(totalPrice).toFixed(2) }}<img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near"></span>
              </button>
              
              <v-slider
                v-model="doggySlider"
                :max="dataNftTokens.length"
                hide-details
                class="doggy-slider"
                @input="sliderSelect($event)"
                @change="sliderPush()"
                @mousedown="playDoggy()"
                @mouseup="stopDoggy()"
                :style="`--clip: ${doggySlider === dataNftTokens.length ? 'var(--clip-path2)' : 'var(--clip-path2-left)'}`"
              ></v-slider>
            </div>
          </div>
        </v-col>
      </v-row>

      <section class="containerDown-content">
        <aside v-show="menuFilter" class="container-filter-left eliminarmobile">
          <div class="container-filter-left-head">
            <div class="space gap">
              <h5 class="p h10-em">Atribute filter</h5>
              <a class="h11-em" @click="dataAtt2.forEach(e=>e.list.forEach(e2=>e2.selected=false));dataChips=[];dataAttr=[];dataNftTokens = dataNftTokens2">Clear all</a>
            </div>

            <div>
              <v-chip v-for="(item,i) in dataChips" :key="i" close close-icon="mdi-close" @click:close="
                dataChips.splice(dataChips.indexOf(item),1);
                dataAtt2.forEach(e=>{e.list.findIndex(data=>data==item)!==-1?e.list[e.list.findIndex(data=>data==item)].selected=false:null});filterAttr('', item.name)
                
              ">
                <span>{{item.name}}</span>
              </v-chip>
            </div>
          </div>

          <v-expansion-panels class="container-filter-left-body">
            <v-expansion-panel v-for="(item,i) in dataAtt2" :key="i">
              <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-list color="transparent">
                  <v-list-item v-for="(item2,i2) in item.list" :key="i2" :class="{selected: item2.selected}" @click="
                    item2.selected=!item2.selected; item2.selected?dataChips.push(item2):dataChips.splice(dataChips.indexOf(item2),1);filterAttr(item.title, item2.name)
                  ">
                    <v-list-item-title>{{item2.name}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </aside>

        <v-navigation-drawer v-model="drawer" fixed id="filterDrawer" width="300px">
          <aside class="container-filter-left">
            <div class="container-filter-left-head">
              <div class="space gap">
                <h5 class="p h10-em">Atribute filter</h5>
                <a class="h11-em" @click="dataAtt2.forEach(e=>e.list.forEach(e2=>e2.selected=false));dataChips=[];dataAttr=[];dataNftTokens = dataNftTokens2">Clear all</a>
              </div>
            
              <div>
                <v-chip v-for="(item,i) in dataChips" :key="i" close close-icon="mdi-close" @click:close="
                  dataChips.splice(dataChips.indexOf(item),1);
                  dataAtt2.forEach(e=>{e.list.findIndex(data=>data==item)!==-1?e.list[e.list.findIndex(data=>data==item)].selected=false:null});filterAttr('', item.name)
                ">
                  <span>{{item.name}}</span>
                </v-chip>
              </div>
            </div>

            <v-expansion-panels class="container-filter-left-body">
              <v-expansion-panel v-for="(item,i) in dataAtt2" :key="i">
                <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-list color="transparent">
                    <v-list-item v-for="(item2,i2) in item.list" :key="i2" :class="{selected: item2.selected}" @click="
                      item2.selected=!item2.selected;item2.selected?dataChips.push(item2):dataChips.splice(dataChips.indexOf(item2),1);filterAttr(item.title, item2.name)
                    ">
                      <v-list-item-title>{{item2.name}}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </aside>
        </v-navigation-drawer>

        <v-col clas id="tableBuy" class="padd">
          <div v-for="(item, index) in dataNftTokens" v-bind:key="index"
            class="containerMarketplace" :class="{active: item.select}">

            <v-img class="images" :src="item.icon" alt="NFT Market Place" @click="nftSelect(item)" />

            <span class="marketplaceId btn2" style="bottom: -5% !important">
              # {{ item.token_id.substr(0,10)}}
              <i class="center" v-show="item.price !== 0" style="margin-inline: 0.3125em">&bullet;</i>
              <span v-show="item.price !== 0">
                {{ item.price.toFixed(2) }}
              </span>
              <img class="nearBalanceLogo" v-show="item.price !== 0" src="@/assets/logo/near.svg" alt="near">
            </span>

            <aside class="buttons" >
              <v-btn v-show="markets.length > 4" icon class="btn3" :disabled="slider <= 0" @click="prev($event)">
                <v-icon small>mdi-arrow-up</v-icon>
              </v-btn>
              <div class="buttons__wrapper" @scroll="scroll($event)">
                <!-- <v-tooltip v-for="(item2,i) in markets" :key="i" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on">
                      <img :src="item2.icon" :alt="item2.marketplace">
                    </v-btn>
                  </template>
                  <span>{{ item2.marketplace }}</span>
                </v-tooltip> -->
                <v-tooltip v-if="item.marketplace !== null" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on">
                      <img :src="require('@/assets/markets/' + item.marketplace + '.svg')" :alt="item.marketplace">
                    </v-btn>
                  </template>
                  <span>{{ item.marketplace }}</span>
                </v-tooltip>
              </div>
              <!-- <v-btn v-show="markets.length > 4" icon class="btn3" :disabled="slider === 'disabled'" @click="next($event)">
                <v-icon small>mdi-arrow-down</v-icon>
              </v-btn> -->
            </aside>
          </div>
        </v-col>
      </section>

      <v-row>
        <v-col class="containerPagination end">
          <v-btn class="btn2" :disabled="indexNftCollection == 0" @click="prevItems()">
            <v-icon large style="color:#58565b !important">mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn class="btn2" @click="nextItems()">
            <v-icon large style="color:#58565b !important">mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
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
        <v-col v-show="transactionHashes !== ''" cols="12" class="center">
          <a :href="'https://explorer.mainnet.near.org/transactions/' + transactionHashes" target="_blank">
            View Transaction
          </a>
        </v-col>
        <v-col cols="12">
          <button  class="button h9 btn2" @click="dialogMessage = false">
            CLOSE
          </button>
        </v-col>
      </section>
    </v-dialog>
    <v-dialog
      id="dialogo"
      v-model="dialogAdd"
      max-width="400"
      persistent
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <h5>
            <span>
              {{ titleAdd }}
            </span>
          </h5>
        </v-col>
        <v-col cols="12" class="center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </section>
    </v-dialog>
  </section>
</template>

<script>
import MenuBuy from './MenuBuy.vue'
import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI;
// const CONTRACT_NAME = 'backend.evie.testnet'
const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "Buy",
  components: { MenuBuy },
  data() {
    return {
      clickValueFilter: '',
      menuFilter: false,
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
          title: "FILTER",
          // selection: [ 'Lowest Price', 'Highest Price', 'On sale', 'Not sale', 'All']
          selection: [
            {value: 'asc', text: 'Lowest Price' },
            {value: 'desc', text: 'Highest Price' },
            {value: true, text: 'On sale' },
            {value: false, text: 'Not sale' },
          ]
        },
        // {
        //   title: "ATTRIBUTE",
        //   selection: [ 'foo', 'bar', 'fizz', 'buzz' ]
        // }
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
      dataAttr: [],
      dialogMessage: false,
      titleDM: '',
      messageDM:'',
      transactionHashes: '',
      dialogAdd: false,
      titleAdd: '',
      indexNftCollection: 0,
      priceFilter: [true,'asc'],
      filterSelect: 'asc',
      sales: true,
      markets: [],
      marketplaceCart: [],
      slider: 0,
      filterGeneral: [],
      excess: null,
      doggySlider: undefined,
    }
  },
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.get("transactionHashes")
    this.hash = "https://explorer.mainnet.near.org/transactions/" + urlParams.get("transactionHashes")
    if (urlParams.get("transactionHashes") !== null) {
      setTimeout(() => {
        axios.post('https://evie.pro:3070/api/v1/refrescarnft').then(response => { console.log(response) }).catch(err => { console.log(err) })
      }, 35000)
      this.dialogMessage = true
      this.titleDM = 'Successful'
      this.messageDM = 'Purchase successful'
      this.transactionHashes = urlParams.get("transactionHashes")
      history.replaceState(null, location.href.split("?")[0], '/#/buy/' + localStorage.nft_contract);
    }
    if (urlParams.get("errorCode") !== null) {
      history.replaceState(null, location.href.split("?")[0], '/#/buy/'  + localStorage.nft_contract);
    }
    
    this.collection = JSON.parse(localStorage.collections)
    this.viewTokens()
    this.getCartItems()


    // slider thumb
    const containerThumb = document.querySelector(".doggy-slider .v-slider__thumb-container");
    const imgThumb = document.createElement("img");

    imgThumb.src = require("@/assets/doggy-slider/thumb.svg")
    imgThumb.className = "doggy-slider-thumb"
    
    containerThumb.querySelector(".v-slider__thumb").remove()
    containerThumb.appendChild(imgThumb)
  },
  computed: {
    // DataBuyTable() {
    //   if (window.innerWidth <= 880) {return this.dataBuyTable.slice(0,4)}
    //   else {return this.dataBuyTable.slice(0,10)}
    // }
    totalPrice() {
      const prices = []
      for (const item of this.nftCart) {
        prices.push(Number(item.precio_near))
      }

      if (this.nftCart.length > 1) return prices.reduce((a, b) => a + b)
      return this.nftCart[0]?.precio_near ?? 0
    }
  },
  methods: {
    viewTokens() {
      this.$store.commit('Load', true)
      axios.post('https://evie.pro:3070/api/v1/listnft', {
        'collection': this.collectionId,
        'limit': 50,
        'index': this.indexNftCollection,
        'sales': this.sales,
        'order': 'precio',
        'type_order': this.filterSelect
      }).then(response => {
        this.dataAtt = [],
        this.dataAtt2 = []
        this.dataChips = []
        this.dataAttr = []
        this.dataNftTokens = []
        this.dataNftTokens2 = []
        var referenceJson = ''
        this.excess = response.data.excess
        response.data.data.forEach(async item => {
          var price = ''
          if(item.precio !== null) {
            price = item.precio_near
          } else {
            price = 0
          }
          if (item.extra !== null && item.extra !== '') {
            if(JSON.parse(item.extra)) {
              item.extra = JSON.parse(item.extra)
              if (item.extra.attributes) {
                item.attributes = item.extra.attributes
              }
              if (item.extra.atributos) {
                item.attributes = item.extra.atributos
              }
            }
          } else if ((item.extra == null || item.extra === '') && (item.reference !== null || item.reference !== 'Pinata')) {
            if(item.base_uri !== null  && !item.reference.includes('https://')) {
              referenceJson = item.base_uri + '/' + item.reference
            }
            if(item.reference.includes('https://')) {
              referenceJson = item.reference
            }
            if (item.base_uri == null) {
              referenceJson = item.reference
            }
            axios.get(referenceJson).then(res => {
              item.attributes = res.data.attributes
            }).catch(err => {
              console.log(err)
            })
            if(item.media_pinata == null || item.media_pinata === '') {
              item.icon = item.media
            } else {
              item.icon = item.media_pinata
            }
          } 
          //console.log(item)
          item.price = parseFloat(price)
          item.select = false
          // if(item.attributes == undefined) {}
          this.dataNftTokens2.push(item)
          this.dataNftTokens = this.dataNftTokens2
        });
        this.armarAtributos()
        this.$store.commit('Load', false)
      }).catch(err => console.log(err))
    },
    // COMIENZAN LOS FILTROS
    async armarAtributos() {
      var attributes = []
      setTimeout(() => {
        this.totalNft = this.dataNftTokens.length
        this.dataNftTokens.forEach(item => {
          if (item.attributes !== undefined) {
            attributes.push(item.attributes)
          }
        })
        if(attributes.length) {
          this.dataAttributeNft(attributes)
        }
      }, 1000)

    },
    dataAttributeNft(attributes) {
      const dataAttributes = []
      attributes.forEach(item => {
        item.forEach(data => {
          dataAttributes.push(data)
        })
      })
      const datos = []
      dataAttributes.forEach(item => {
        datos.push({
          title: item.trait_type,
        });
      });
      this.dataAtt2 = Object.values(datos.reduce((prev,next)=>Object.assign(prev,{[next.title]:next}),{}))
      this.dataAtt = this.groupBy(dataAttributes)
      this.dataAtt2.forEach(element => {
        element.list = this.dataAtt[element.title]
      });
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
          name: item.value,
          selected: false,
        })
        result[item['trait_type']] = Object.values(result[item['trait_type']].reduce((prev,next)=>Object.assign(prev,{[next.name]:next}),{}))
      })
      this.menuFilter = true
      return result
    },
    filterAttr(filter, name) {
      var data = []
      var index = null
      if (filter !== '') {
        index = this.dataAttr.findIndex(i =>
          i.filter === filter && i.name === name
        )
      }
      if (filter === '') {
        index = this.dataAttr.findIndex(i =>
          i.name === name
        )
      }
      if (index > -1) {
        this.dataAttr.splice(index, 1)
        this.dataNftTokens = []
        try {
          this.dataAttr.forEach(filter => {
            this.dataNftTokens2.forEach(nft => {
              if (nft.attributes) {
                nft.attributes.forEach(tag => {
                  if (filter.filter === tag.trait_type && filter.name === tag.value){
                    data.push(nft)
                  }
                })
              }
            })
          })
        } catch (e) {
          console.log(e)
        }
        this.dataNftTokens = Object.values(data.reduce((prev,next)=>Object.assign(prev,{[next.token_id]:next}),{}))

        if (this.dataAttr.length == 0) {
          this.dataAttr = []
          this.dataNftTokens = this.dataNftTokens2
        }
      } else {
        this.dataAttr.push({
          filter: filter,
          name: name,
        })
        this.dataNftTokens = []
        try {
          this.dataAttr.forEach(filter => {
            this.dataNftTokens2.forEach(nft => {
              if (nft.attributes) {
                nft.attributes.forEach(tag => {
                  if (filter.filter === tag.trait_type && filter.name === tag.value){
                    data.push(nft)
                  }
                })
              }
            })
          })
        } catch (e) {
          console.log(e)
        }
        this.dataNftTokens = Object.values(data.reduce((prev,next)=>Object.assign(prev,{[next.token_id]:next}),{}))
      }
    },
    //FIN DE FILTROS

    // COMIENZA EL CARRITO
    // addCart(item) {
    //   const index = this.nftCart.findIndex(i =>
    //     i.token_id === item.token_id && item.marketplace === i.contract_market
    //   )
    //   if (index > -1) {
    //     this.dialogMessage = true
    //     this.titleDM = 'Already exists'
    //     this.messageDM = 'The token already exists in the cart'
    //   } else {
    //     if(item.precio !== null) {
    //       this.$store.commit('Load', true)
    //       this.addCartItem(item)
    //     } else {
    //       this.dialogMessage = true
    //       this.titleDM = 'Not for sale'
    //       this.messageDM = 'This NFT is not for sale'
    //     }
    //   }
    // },
    async addCartItem(item) {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      if (wallet.isSignedIn()) {
        item.select = true
        this.dialogAdd = true
        this.titleAdd = 'Adding NFT to cart'
        var price = utils.format.parseNearAmount((item.price).toString())
        var itemNft = {
          token_id: item.token_id,
          contract_id: this.collectionId,
          contract_market: item.marketplace,
          price: price,
          base_uri: item.media,
        }
        
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          changeMethods: ["add_item"],
          sender: wallet.account(),
        })
        await contract.add_item({
          item: itemNft,
        }, '85000000000000').then((response) => {
          setTimeout(() => {
            axios.post('https://evie.pro:3070/api/v1/refrescarcarrito').then(res => {
              console.log(res)
            }).catch(erro => {console.log(erro)})
          }, 35000)
          this.$store.commit('Load', false)
          console.log(response);
          this.getCartItems()
          item.select = true
          this.dialogAdd = false
        }).catch(err => {
          console.log(err)
          this.$store.commit('Load', false )
        })
      } else {
        this.dialogMessage = true
        this.titleDM = 'Session error'
        this.messageDM = 'You are not logged in to add to cart'
      }
    },
    
    async getCartItems() {
      console.log('pasando por getcart')
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      if (wallet.isSignedIn()) {
        this.$store.commit('Load', true)
      
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          changeMethods: ["get_cart_items"],
          sender: wallet.account(),
        })
        await contract.get_cart_items({
          user: wallet.getAccountId(),
        }).then((response) => {
          if (response.length) {
            var precio = 0
            this.nftCart = response
            this.priceTotal = 0
            this.nftCart.forEach(element => {
              precio = utils.format.formatNearAmount((element.price.toString()))
              element.precio = parseFloat(precio)
              this.priceTotal = this.priceTotal + element.precio
              this.dataNftTokens.forEach(item => {
                if (item.token_id === element.token_id && item.marketplace === element.contract_market) {
                  item.select = true
                }
              })
            });
            this.cantCart = this.nftCart.length
          }
          this.$store.commit('Load', false)
        }).catch(err => {
          this.$store.commit('Load', false)
          console.log(err)
        })
      }
    },
    //TERMINA EL CARRITO
    priceTotalNft() {
      localStorage.priceTotal = this.priceTotal.toString()
    },
    nextItems() {
      this.indexNftCollection = this.indexNftCollection + 50 + this.excess
      window.scrollTo(0,0)
      this.viewTokens()

    },
    prevItems() {
      this.indexNftCollection = this.indexNftCollection - 50 - this.excess
      window.scrollTo(0,0)
      this.viewTokens()
    },
    filterPrice() {
      var index = null
      //var filter = []
      if(this.clickValueFilter !== '%') {
        index = this.priceFilter.findIndex(i => i === '%')
        if(index > -1) {
          this.priceFilter.splice(index, 1)
        }
      } 
      if(this.clickValueFilter === 'asc') {
        index = this.priceFilter.findIndex(i => i === 'desc')
        if(index > -1) {
          this.priceFilter.splice(index, 1)
        }
        this.filterSelect = 'asc'
      } 
      if(this.clickValueFilter === 'desc') {
        index = this.priceFilter.findIndex(i => i === 'asc')
        if(index > -1) {
          this.priceFilter.splice(index, 1)
        }
        this.filterSelect = 'desc'
        console.log(this.priceFilter)
      }
      if(this.clickValueFilter === true) {
        index = this.priceFilter.findIndex(i => i === 'false')
        if(index > -1) {
          this.priceFilter.splice(index, 1)
        }
        this.sales = true
      }
      if(this.clickValueFilter === false) {
        index = this.priceFilter.findIndex(i => i === 'true')
        console.log(index, 'index')
        if(index > -1) {
          this.priceFilter.splice(index, 1)
        }
        this.sales = false
      }
      // if(this.clickValueFilter === '%') {
      //   this.priceFilter.forEach(i => {
      //     this.priceFilter.splice(i, 1)
      //   });
      //   this.sales = '%'
      //   this.filterSelect = ''
      // } 

      

      if (this.priceFilter.length == 0) {
        this.filterSelect = ''
        this.sales = true
      } 
      console.log(this.priceFilter, 'variable del select')
      this.viewTokens()
    },
    viewFormEducation() {
      axios.post('https://evie.pro:3070/api/v1/ListFormEdu').then(response => {
        response.data.forEach(item => {
          if (item.title === this.collection.name) {
            localStorage.vieneDe = 'buy'
            localStorage.idCollectionForm = item.id
            this.$router.push('/project-proposal')
          }
        });
      }).catch(err => { console.log(err) })
    },
    prev(e) {
      const slide = e.path[3].querySelector('.buttons__wrapper')
      if (slide.scrollTop >= 0) {
        slide.scrollTop -= 80;
        this.slider = slide.scrollTop -= 80;
        console.log(this.slider)
      }
    },
    next(e) {
      const wrapper = e.path[3]
      const slide = wrapper.querySelector('.buttons__wrapper');
      if (slide.getBoundingClientRect().height + slide.scrollTop <= wrapper.getBoundingClientRect().height) {
        slide.scrollTop += 80;
        this.slider = slide.scrollTop += 80;
      } else {
        this.slider = 'disabled'
      }
      console.log(this.slider)
    },
    scroll(e) {
      const wrapper = e.path[1];
      const slide = e.target;
      if (slide.getBoundingClientRect().height + slide.scrollTop <= wrapper.getBoundingClientRect().height) {
        this.slider = slide.scrollTop
      } else {
        this.slider = 'disabled'
      }
    },
    nftSelect(item) {
      if (item.select) {
        item.select = false
        this.doggySlider--
      } else {
        item.select = true
        this.doggySlider++
      }
      this.nftCart = this.dataNftTokens.filter(data => data.select)
    },
    sliderSelect(value) {
      for (let i = 0; i < this.dataNftTokens.length; i++) {
        const item = this.dataNftTokens[i];
        if (i < this.dataNftTokens.slice(0, value).length) {
          item.select = true
          continue;
        }
        item.select = false
      }
    },
    sliderPush() {
      this.nftCart = this.dataNftTokens.filter(data => data.select)
    },
    async openCart() {
      if (!localStorage.sesion) {
        this.dialogMessage = true
        this.titleDM = 'Session error'
        this.messageDM = 'You are not logged in to add to cart'
      }
      // else if (!this.dataNftTokens.some(data => data.select)) {
      //   this.dialogMessage = true
      //   this.titleDM = 'Select someone NFT'
      //   this.messageDM = 'You must select NFT to open cart'
      // }
      else {
        this.nftCart = this.dataNftTokens.filter(data => data.select)
        this.$refs.menu.dialog=true
      }
    },
    playDoggy() {
      const imgThumb = document.querySelector(".doggy-slider .doggy-slider-thumb");
      imgThumb.src = require("@/assets/doggy-slider/thumb.gif")
    },
    stopDoggy() {
      const imgThumb = document.querySelector(".doggy-slider .doggy-slider-thumb");
      imgThumb.src = require("@/assets/doggy-slider/thumb.svg")
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
