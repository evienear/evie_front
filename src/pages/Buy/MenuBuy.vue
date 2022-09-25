<template>
  <section id="menuBuy">
    <!-- menu buy -->
    <v-dialog
      id="dialogo"
      v-model="dialog"
      max-width="950px"
      :overlay-opacity="overlay_opacity"
      :overlay-color="overlay_color"
    >
      <!-- checkout dialog-->
      <!-- <section v-if="checkout" id="menuCheckout" class="colorCartas relative">
        <button class="buttonClose center">
          <img class="close" src="@/assets/icons/close.svg" alt="close" @click="dialog = false">
        </button>

        <v-col cols="11">
          <aside class="divrow" style="gap: 6px; margin-bottom: -2px">
            <button class="botonBack center" @click="dialog=false">
              <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
            </button>
            <h3 class="tituloBack p">CHECKOUT</h3>
          </aside>
          <span class="subtitleBack">SELECT MARKETPLACE</span>
        </v-col> -->

        <!-- <v-col class=" divrow containerMenuBuy">
          <v-slide-group
            v-model="sliderA"
            center-active
            :show-arrows="true"
            class="fill-w"
          >
            <v-slide-item v-for="(item, index) in nftCart" :key="index">
              <v-card
                color="transparent"
                style="display: flex"
                class="containerMarketplace relative"
              >
                <img class="images" :src="item.base_uri" alt="NFT Market Place">
                <aside class="buttons">
                  <v-btn v-show="item.marketplace.length > 4" icon class="btn3" :disabled="slider <= 0" @click="prev($event)">
                    <v-icon small>mdi-arrow-up</v-icon>
                  </v-btn>
                  <div class="buttons__wrapper" @scroll="scroll($event)">
                    <v-tooltip v-for="(item2,i) in item.marketplace" :key="i" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" icon @click="selectMarket(item2, item.token_id)">
                          <img :src="item2.icon" :alt="item2.marketplace">
                        </v-btn>
                      </template>
                    <span>{{ item2.marketplace }}</span>
                  </v-tooltip>
                  </div>
                  <v-btn v-show="item.marketplace.length > 4" icon class="btn3" :disabled="slider === 'disabled'" @click="next($event)">
                    <v-icon small>mdi-arrow-down</v-icon>
                  </v-btn>
                </aside>
                <span class="marketplaceId btn2">
                  # {{ item.token_id.substr(0,10) }} 
                  <i class="center" style="margin-inline: 0.3125rem">
                    &bullet;
                  </i> 
                  {{ item.precio}}
                  <img class="nearBalanceLogo" src="@/assets/logo/near.png" alt="near">
                </span>

                
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col> -->

        <!-- <v-col class="col-8 col-sm-6 containerMenuBottom mb-10">
          <aside class="divcol">
            <span class="h9 color">{{ accountId }}</span>
            <span class="desc h9 color">Balance: {{ balance }}</span>
          </aside>
          <aside class="divcol">
            <span class="h6 color">{{ cantCart }} IN CART</span>
            <span class="h9 color center">Total: {{ priceTotal }}
              <img class="nearBalanceLogo filter" src="@/assets/logo/near.png" alt="near">
            </span>
          </aside>

          <button class="button h9 btn2" @click="changeToReview()">
            REVIEW<v-icon medium>mdi-chevron-right</v-icon>
          </button>
        </v-col>
      </section> -->

      <!-- review dialog-->
      <section id="menuReview" class="colorCartas relative" style="min-height: 550.5px">
        <button class="buttonClose center">
          <img class="close" src="@/assets/icons/close.svg" alt="close" @click="dialog = false">
        </button>

        <v-col cols="11">
          <aside class="divrow" style="gap: 6px; margin-bottom: -2px">
            <!-- <button class="botonBack center" @click="checkout=true;review=false">
              <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
            </button> -->
            <h3 class="tituloBack p">REVIEW</h3>
          </aside>
          <span class="subtitleBack">SELECT MARKETPLACE</span>
        </v-col>

        <v-col class="containerMenuReview">
          <v-slide-group
            v-model="sliderB"
            center-active
            :show-arrows="true"
            style="width: 85%"
          >
            <v-slide-item v-for="(item, index) in nftCart" :key="index">
              <v-card
                color="transparent"
                style="display: flex"
                class="containerMarketplace relative"
              >
                <img class="images" :src="item.base_uri" alt="NFT">

                <span class="marketplaceNumber btn2">
                  # {{ item.token_id.substr(0,10) }}
                </span>

                <span class="marketplaceAmount btn2 center">
                  {{ item.precio}}
                  <img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near">
                </span>
                <aside class="buttons">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on">
                        <img :src="require('@/assets/markets/' + item.contract_market + '.svg')" :alt="item.contract_market">
                      </v-btn>
                    </template>
                    <span>{{ item.contract_market }}</span>
                  </v-tooltip>
                </aside>

                <aside class="actions">
                  <button class="btn2" @click="purchase(item)">
                    BUY
                  </button>
                  <button title="Delete item to cart" @click="removeCartItem(item)">
                    <v-icon color="red" class="btn2">mdi-trash-can-outline</v-icon>
                  </button>
                </aside>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>

        <v-col class="col-8 col-sm-6 containerMenuBottom">
          <aside class="divcol">
            <span class="h9 color">{{ accountId }}</span>
            <span class="desc h9 color">Balance: {{ balance }}</span>
          </aside>
          <aside class="divcol">
            <span class="h6 color">{{ cantCart }} IN CART</span>
            <span class="h9 color center">Total: {{ priceTotal }}
              <img class="nearBalanceLogo" src="@/assets/logo/near.png" alt="near">
            </span>
          </aside>

          <!-- <button class="button btn2" @click="purchase()">
            COMPLETE PURCHASE<v-icon medium>mdi-chevron-right</v-icon>
          </button> -->
          
        </v-col>
        <v-col class="center mt-5">
          <button class="button btn2" @click="clearCart()">
            Delete All Items
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
import axios from 'axios'
import * as nearApi from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract, utils, /*transactions*/ } = nearApi;
// const CONTRACT_NAME = 'backend.evie.testnet'
const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "MenuBuy",
  props: ['nftCart', 'cantCart', 'priceTotal'],
  data() {
    return {
      slider: 0,
      sliderA: "",
      sliderB: "",
      checkout: true,
      review: false,
      dialog: false,
      overlay_opacity: "0.2",
      overlay_color: "white",
      dataMenuBuy: [],
      dataMenuReview: [],
      totalPrice: 0,
      cantNft: this.nftCart.length,
      balance: 0,
      accountId: '',
      dialogMessage: false,
      titleDM: '',
      messageDM:'',
      dialogAdd: false,
      titleAdd: '',
      refreshCart: false,
      marketBuy: '',
      nftMarketSelect: [],
      marketplace: [],
    }
  },
  created() {
    const theme = localStorage.getItem("theme");
    this.OverlayMethod(theme);
  },
  mounted() {
    var price = 0
    this.dataMenuBuy = []
    this.nftCart.forEach(element => {
      price = utils.format.formatNearAmount((element.precio.toString()))
      price = parseFloat(price)
      element.price = price      
    });
    this.dataMenuBuy = this.nftCart
    this.getBalance()
    if (localStorage.refreshCart === 'true') {
      this.refreshCart = false
      localStorage.refreshCart = this.refreshCart
      setTimeout(() => {
        axios.post('https://evie.pro:3070/api/v1/refrescarcarrito').then(res => {
          console.log(res)
        }).catch(erro => {console.log(erro)})
      }, 35000)
    }
  },
  methods: {
    changeToReview() {
      this.checkout = false;
      this.review = true;
    },
    OverlayMethod(theme) {
      if (theme == "dark") {
        this.overlay_opacity = "0.5";
        this.overlay_color = "black"
      }
      if (theme == "light") {
        this.overlay_opacity = "0.2";
        this.overlay_color = "white"
      }
    },
    async getBalance() {
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);

      if (wallet.isSignedIn()) {
        var walletAccountId = wallet.getAccountId();
        this.accountId = walletAccountId
        var account = await wallet.account(walletAccountId)
        var balance = await account.getAccountBalance()
        var balanceYocto = balance.available
        var amountInNEAR = utils.format.formatNearAmount(balanceYocto)
        amountInNEAR = parseFloat(amountInNEAR)-parseFloat(0.05)
        this.balance =  amountInNEAR.toFixed(2)
      }
    },
    async removeCartItem(item) {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      if (wallet.isSignedIn()) {
        this.dialogAdd = true
        this.titleAdd = 'Removing item'
        var price = utils.format.parseNearAmount((item.precio).toString())
        var itemNft = {
          token_id: item.token_id,
          contract_id: item.contract_id,
          contract_market: item.contract_market,
          price: price,
          base_uri: item.base_uri,
        }

        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          changeMethods: ["remove_item"],
          sender: wallet.account(),
        })
        await contract.remove_item({
          item: itemNft
        }, '85000000000000',
        ).then((response) => {
          console.log(response);
          this.dialogAdd = false
          this.dialogMessage = true
          this.titleDM = 'Successful'
          this.messageDM = 'Delete item successful'
          this.refreshCart = true
          localStorage.refreshCart = this.refreshCart
          setTimeout(() => this.$router.go(0), 3000)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    async clearCart() {
      // connect to NEAR
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      if (wallet.isSignedIn()) {
        this.dialogAdd = true
        this.titleAdd = 'Removing all items'
        
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          changeMethods: ["clear_cart"],
          sender: wallet.account(),
        })
        await contract.clear_cart({}, '85000000000000',
        ).then((response) => {
          console.log(response)
          this.dialogAdd = false
          this.dialogMessage = true
          this.titleDM = 'Successful'
          this.messageDM = 'Delete all items successful'
          this.refreshCart = true
          localStorage.refreshCart = this.refreshCart
          setTimeout(() => this.$router.go(0), 3000)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    selectMarket (item, token_id) {
      this.dialogMessage = true
      this.titleDM = 'MarketPlace Selected'
      this.messageDM = 'You have selected ' +item.marketplace
      this.nftCart.forEach(element=> {
        if(element.token_id === token_id) {
          element.contract_market = item.marketplace
        }
      })
    },
    async purchase(item) {
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore())
      );
      const wallet = new WalletConnection(near);
      // const contract = new Contract(wallet.account(), item.contract_market, {
      const contract = new Contract(wallet.account(), item.contract_market, {
        changeMethods: ["buy"],
        sender: wallet.account(),
      })
      await contract.buy({
        nft_contract_id: item.contract_id ,
        token_id: item.token_id,
        ft_token_id: 'near',
        price: item.price
      },'300000000000000',
      item.price).then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err)
      })
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
  },
};
</script>

<style src="../pages.scss" lang="scss" />
