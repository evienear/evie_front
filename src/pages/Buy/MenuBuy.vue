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
      <section v-if="checkout" id="menuCheckout" class="colorCartas relative" style="min-height: 550.5px">
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
        </v-col>

        <v-col class="containerMenuBuy divrow containerMenuReview">
          <v-slide-group
            v-model="sliderA"
            center-active
            :show-arrows="true"
            class="fill-w"
          >
            <v-slide-item class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(item, index) in nftCart" :key="index">
              <v-card
                color="transparent"
                style="display: flex"
                class="containerMarketplace relative"
              >
                <img class="images" :src="item.base_uri" alt="NFT Market Place">

                <span class="marketplaceId btn2">
                  # {{ item.token_id }} 
                  <i class="center" style="margin-inline: 0.3125rem">
                    &bullet;
                  </i> 
                  {{ item.precio}}
                  <img class="nearBalanceLogo" src="@/assets/logo/near.png" alt="near">
                </span>

                <aside class="buttons">
                  <v-btn v-for="(item2,i) in item.market" :key="i" icon>
                    <img :src="require(`@/assets/buttons/${item2.name}.svg`)" alt="marketplace">
                  </v-btn>
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
              <img class="nearBalanceLogo filter" src="@/assets/logo/near.png" alt="near">
            </span>
          </aside>

          <button class="button h9 btn2" @click="changeToReview()">
            REVIEW<v-icon medium>mdi-chevron-right</v-icon>
          </button>
        </v-col>
      </section>

      <!-- review dialog-->
      <section v-if="review" id="menuReview" class="colorCartas relative" style="min-height: 550.5px">
        <button class="buttonClose center">
          <img class="close" src="@/assets/icons/close.svg" alt="close" @click="dialog = false">
        </button>

        <v-col cols="11">
          <aside class="divrow" style="gap: 6px; margin-bottom: -2px">
            <button class="botonBack center" @click="checkout=true;review=false">
              <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
            </button>
            <h3 class="tituloBack p">REVIEW</h3>
          </aside>
          <span class="subtitleBack">SELECT MARKETPLACE</span>
        </v-col>

        <v-col class="containerMenuReview">
          <v-slide-group
            v-model="sliderB"
            center-active
            :show-arrows="true"
            class="fill-w sliderReview"
          >
            <v-slide-item v-for="(item, index) in nftCart" :key="index">
              <v-card
                color="transparent"
                style="display: flex"
                class="containerMarketplace relative"
              >
                <img class="images" :src="item.base_uri" alt="NFT">

                <span class="marketplaceNumber btn2">
                  # {{ item.token_id }}
                </span>

                <span class="marketplaceAmount btn2 center">
                  {{ item.precio}}
                  <img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near">
                </span>

                <aside class="buttons">
                  <v-btn v-for="(item2,i) in item.market" :key="i" icon>
                    <img class="filter" :src="require(`@/assets/buttons/${item2.name}.svg`)" alt="marketplace">
                  </v-btn>
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

          <button class="button btn2" @click="purchase()">
            COMPLETE PURCHASE<v-icon medium>mdi-chevron-right</v-icon>
          </button>
        </v-col>
      </section>
    </v-dialog>
  </section>
</template>

<script>
// import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI;
const CONTRACT_NAME = 'backend.evie.testnet'
export default {
  name: "MenuBuy",
  props: ['nftCart', 'cantCart', 'priceTotal'],
  data() {
    return {
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
      console.log(element, 'element price')
      
    });
    this.dataMenuBuy = this.nftCart
    this.getBalance()
    //console.log(this.dataMenuBuy)
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
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
      );
      // create wallet connection
      const wallet = new WalletConnection(near);

      var walletAccountId = wallet.getAccountId();
      this.accountId = walletAccountId
      var account = await wallet.account(walletAccountId)
      var balance = await account.getAccountBalance()
      var balanceYocto = balance.available
      var amountInNEAR = utils.format.formatNearAmount(balanceYocto)
      amountInNEAR = parseFloat(amountInNEAR)-parseFloat(0.05)
      this.balance =  amountInNEAR.toFixed(2)
    },
    async buy_nft(item) {
      console.log(utils.format.parseNearAmount((this.priceTotal).toString()), 'precio total')
      // connect to NEAR
      localStorage.priceTotal
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), '')
      );
      // create wallet connection
      const wallet = new WalletConnection(near);
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ["buy_from_other_marketplaces"],
        sender: wallet.account(),
      })
      console.log(item.token_id)

      await contract.buy_from_other_marketplaces({

      },'300000000000000',
      utils.format.parseNearAmount((this.priceTotal).toString())).then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err)
      });
    },
    purchase() {
      console.log("purchase")
      // this.nftCart.forEach(item => {
      //   this.buy_nft(item)
      // });
      const key = localStorage.getItem("near-api-js:keystore:"+localStorage.walletAccountId+":testnet");
      console.log(key, localStorage.walletAccountId)
      //axios.post('http://157.230.2.213:3071/api/v1/buynft', {
      // axios.post('http://157.230.2.213:3072/api/v1/buynft', {
      //   "signerid": localStorage.walletAccountId,
      //   "signerprivateket": key,
      //   "ft_token": "near"
      // }).then(response => {
      //   console.log(response.data)
      // }).catch(err => {
      //   console.log(err)
      // })


      var request = new XMLHttpRequest();
      request.open(
          "POST",
            'http://157.230.2.213:3072/api/v1/buynft/' + localStorage.walletAccountId +'/ed25519:4y1TUBspFie5xnsUXojtmJDSDmcVkC9azToASfCAxUDqyaziJbLRpcnQ858ptTwwHu7ETqyRkzZNBjBWUFjZUhbL/near',
        );
      request.send();
    },
  },
};
</script>

<style src="../pages.scss" lang="scss" />
