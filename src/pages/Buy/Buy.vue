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
                v-model="priceFilter"
                :items="item.selection"
                :hide-details="true"
                @change="filterPrice()"
                multiple
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
            class="containerMarketplace" :class="{active: item.select}"
            @click="addCart(item)">

            <v-img class="images" :src="item.media" alt="NFT Market Place" />

            <span class="marketplaceId btn2" style="bottom: -5% !important">
              # {{ item.token_id.substr(0,10)}}
              <i class="center" v-show="item.price !== 0" style="margin-inline: 0.3125em">&bullet;</i>
              <span v-show="item.price !== 0">
                {{ item.price.toFixed(2) }}
              </span>
              <img class="nearBalanceLogo" v-show="item.price !== 0" src="@/assets/logo/near.svg" alt="near">
            </span>

            <aside class="buttons">
              <!-- <v-btn v-for="(item2,i) in item.market" :key="i" icon>
                <img :src="require(`@/assets/buttons/${item2.name}.svg`)" alt="marketplace">
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
          selection: [ 'Lowest Price', 'Highest Price', 'On sale', 'Not sale', 'All']
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
      dialogAdd: false,
      titleAdd: '',
      indexNftCollection: 0,
      priceFilter: '',
      filterSelect: '',
      sales: '%',
    }
  },
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.get("transactionHashes")
    this.hash = "https://explorer.mainnet.near.org/transactions/" + urlParams.get("transactionHashes")
    if (urlParams.get("transactionHashes") !== null) {
      console.log('aqui' + urlParams.get("transactionHashes"))
      axios.post('https://evie.pro:3070/api/v1/refrescarnft').then(response => {
        console.log(response)
        this.$router.go(0)
        history.replaceState(null, location.href.split("?")[0], '/#/buy/' + localStorage.nft_contract);
      }).catch(err => {
        console.log(err)
      })
    }
    if (urlParams.get("errorCode") !== null) {
      history.replaceState(null, location.href.split("?")[0], '/#/buy/'  + localStorage.nft_contract);
    }
    // console.log(this.collectionId)
    
    this.collection = JSON.parse(localStorage.collections)
    this.viewTokens()
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
      this.dataNftTokens = []
      // console.log(this.collectionId)
      axios.post('https://evie.pro:3070/api/v1/listnft', {
      // axios.post('http://157.230.2.213:3071/api/v1/listnft', {
      // axios.post('http://157.230.2.213:3072/api/v1/listnft', {
        'collection': this.collectionId,
        'limit': 10,
        'index': this.indexNftCollection,
        'sales': this.sales,
        'order': 'precio',
        'type_order': this.filterSelect
      }).then(response => {
        //console.log(response.data, 'respuesta nft')
        response.data.forEach(item => {
          // console.log(item)
          var price = ''
          if(item.precio !== null) {
            price = utils.format.formatNearAmount((item.precio.toString()))
          } else {
            price = 0
          }
          if (item.extra !== null) {
            item.metadata.extra = JSON.parse(item.metadata.extra)
            item.attributes = item.metadata.extra.atributos
          }
          if (item.extra == null && item.reference !== null) {
            // item.metadata.extra = base_uri + '/' + item.metadata.reference
            axios.get(item.base_uri + '/' + item.reference).then(res => {
              item.attributes = res.data.attributes
            }).catch(err => {
              console.log(err)
            })
          }
          item.price = parseFloat(price)
          item.select = false
          
          this.dataNftTokens.push(item)
        });
        // console.log(this.dataNftTokens)
        this.armarAtributos()
      }).catch(err => console.log(err))
    },
    // COMIENZAN LOS FILTROS
    async armarAtributos() {
      var attributes = []
      setTimeout(() => {
        // console.log(this.dataNftTokens)
        this.totalNft = this.dataNftTokens.length
        this.dataNftTokens2 = this.dataNftTokens
        this.dataNftTokens.forEach(item => {
          // console.log(item)
          if (item.attributes) {
            attributes.push(item.attributes)
          }
        })
        //console.log(attributes)
        this.dataAttributeNft(attributes)
      }, 1000)

    },
    dataAttributeNft(attributes) {
      const dataAttributes = []
      attributes.forEach(item => {
        // console.log(item, 'attributes')
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
      // console.log(this.dataAtt2)
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
      // console.log(index)
      if (index > -1) {
        this.dataAttr.splice(index, 1)
        // console.log(this.dataAttr.length)
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
          // console.log(this.dataNftTokens2)
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
      console.log(this.dataNftTokens)
    },
    //FIN DE FILTROS

    // COMIENZA EL CARRITO
    addCart(item) {
      const index = this.nftCart.findIndex(i =>
        i.token_id === item.token_id
      )
      if (index > -1) {
        this.dialogMessage = true
        this.titleDM = 'Already exists'
        this.messageDM = 'The token already exists in the cart'
      } else {
        this.addCartItem(item)
      }
    },
    async addCartItem(item) {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), 'mainnet')
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
          axios.post('https://evie.pro:3070/api/v1/refrescarcarrito').then(res => {
            console.log(res)
          }).catch(erro => {console.log(erro)})
          console.log(response, 'response addCart');
          this.getCartItems()
          item.select = true
          this.dialogAdd = false
        }).catch(err => {
          console.log(err)
        })
      }
    },
    
    async getCartItems() {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), 'mainnet')
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
                if (item.token_id === element.token_id) {
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
      this.indexNftCollection = this.indexNftCollection + 50
      this.viewTokens()
    },
    prevItems() {
      this.indexNftCollection = this.indexNftCollection - 50
      this.viewTokens()
    },
    filterPrice() {
      console.log(this.priceFilter.length)
      console.log(this.priceFilter)
      for (var i = 0; i < this.priceFilter.length; i++) {
        if (this.priceFilter[i] === 'Lowest Price') {
          this.filterSelect = 'asc'
        } else if (this.priceFilter[i] === 'Highest Price') {
          this.filterSelect = 'desc'
        } else {
          this.filterSelect = ''
        }
        
        if (this.priceFilter[i] === 'On sale') {
          this.sales = 'true'
        } else if (this.priceFilter[i] === 'Not sale') {
          this.sales = 'false'
        } else if (this.priceFilter[i] === 'All') {
          this.sales = '%'
        } else {
          this.sales = '%'
        }
      }
      if (this.priceFilter.length == 0) {
        this.filterSelect = ''
        this.sales = '%'
      }
      this.viewTokens()
    }
  }
};
</script>

<style src="../pages.scss" lang="scss" />
