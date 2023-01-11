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
      <section id="menuReview" class="colorCartas relative pt-2" style="min-height: 550.5px">
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

        <v-col class="containerMenuReview mt-0">
          <v-slide-group
            v-model="sliderB"
            center-active
            :show-arrows="true"
          >
            <v-slide-item v-for="(item, index) in nftCart" :key="index">
              <v-card
                color="transparent"
                style="display: flex; margin-top: 10px"
                class="containerMarketplace relative"
              >
                <img class="images" :src="item.icon" alt="NFT">

                <span class="marketplaceNumber btn2">
                  # {{ item.token_id.substr(0,10) }}
                </span>

                <span class="marketplaceAmount btn2 center">
                  {{ parseFloat(item.lower_price).toFixed(2)}}
                  <img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near">
                </span>
                <aside id="buttons-menubuy" class="buttons">
                  <template v-for="(item2, i) in item.marketplaces.filter(data => data.select)">
                    <v-tooltip :key="i" right v-if="item2.marketplace">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs" v-on="on" :class="{active: item2.selectBuy}"
                          @click="selectMarketplaceToBuy(item, item2)"
                        >
                          <img :src="require('@/assets/markets/' + item2.marketplace + '.svg')" :alt="item2.marketplace">
                        </v-btn>
                      </template>
                      <span>{{ item2.marketplace }}</span>
                    </v-tooltip>
                  </template>
                </aside>

                <aside class="actions">
                  <button class="btn2" @click="purchase(item)">
                    BUY
                  </button>
                  <button title="Delete item to cart"
                    @click="$parent.dataNftTokens.find(e => e === item).marketplaces.forEach(e => e.select = false);
                      $parent.nftCart.splice(index, 1);
                      $parent.doggySlider > 0 ? $parent.doggySlider-- : undefined
                    "
                  >
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
            <span class="h6 color">{{ cartLength }} IN CART</span>
            <span class="h9 color center">Total: {{ parseFloat(totalPrice).toFixed(2) }}
              <img class="nearBalanceLogo" src="@/assets/logo/near.png" alt="near">
            </span>
          </aside>
          
        </v-col>
        <v-col class="center mt-5">
          <button class="button btn2" @click="buyAll()">
            Buy All Items<v-icon medium>mdi-chevron-right</v-icon>
          </button>
          <button
            class="button btn2"
            @click="
              $parent.dataNftTokens.forEach(e => e.marketplaces.forEach(e2 => e2.select = false));
              $parent.nftCart = [];
              $parent.doggySlider = 0
            "
          >
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
// import axios from 'axios'
import * as nearApi from "near-api-js";
import { CONFIG } from "@/services/api";
const { connect, keyStores, WalletConnection, Contract, utils, /*transactions*/ } = nearApi;
import {/*Action,*/ createTransaction, functionCall} from 'near-api-js/lib/transaction'
import { base_decode } from 'near-api-js/lib/utils/serialize'
import { PublicKey } from 'near-api-js/lib/utils'
// const CONTRACT_NAME = 'backend.evie.testnet'
const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "MenuBuy",
  props: ['nftCart', 'cantCart', 'priceTotal'],
  data() {
    return {
      slider: 0,
      sliderA: "",
      sliderB: 0,
      checkout: true,
      review: false,
      dialog: false,
      overlay_opacity: "0.2",
      overlay_color: "white",
      dataMenuBuy: [],
      dataMenuReview: [],
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
    // var price = 0
    // this.dataMenuBuy = []
    // this.nftCart.forEach(element => {
    //   price = utils.format.formatNearAmount((element.precio.toString()))
    //   price = parseFloat(price)
    //   element.price = price      
    // });
    // this.dataMenuBuy = this.nftCart
    // this.getBalance()
    // if (localStorage.refreshCart === 'true') {
    //   this.refreshCart = false
    //   localStorage.refreshCart = this.refreshCart
    //   setTimeout(() => {
    //     axios.post('https://evie.pro:3070/api/v1/refrescarcarrito').then(res => {
    //       console.log(res)
    //     }).catch(erro => {console.log(erro)})
    //   }, 35000)
    // }
  },
  watch: {
    dialog(current) {
      if (current) {
        this.nftCart.forEach(e => e.marketplaces.forEach(e2 => {
          if (e2.select && String(e.lower_price) === e2.precio_near && e.marketplaces.length > 1) e.marketplaces[0].selectBuy = true
          else if (e2.select && String(e.lower_price) === e2.precio_near) e2.selectBuy = true
        }))
      }
    },
  },
  computed: {
    cartLength() {
      return this.nftCart.length
    },
    totalPrice() {
      const prices = []
      for (const item of this.nftCart) {
        prices.push(
          Number(item.lower_price || item.precio_near)
        )
      }

      if (this.nftCart.length > 1) return prices.reduce((a, b) => a + b)
      return prices[0] ?? 0
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
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), localStorage.network)
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
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), localStorage.network)
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
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), localStorage.network)
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
      const selectedMarketplace = item.marketplaces.find(data => data.selectBuy)
      const near = await connect(
        CONFIG(new keyStores.BrowserLocalStorageKeyStore(), localStorage.network)
      );
      const wallet = new WalletConnection(near);
      // const contract = new Contract(wallet.account(), item.contract_market, {
      const contract = new Contract(wallet.account(), selectedMarketplace.marketplace, {
        changeMethods: ["buy"],
        sender: wallet.account(),
      })
      await contract.buy({
        nft_contract_id: item.contract_id ,
        token_id: item.token_id,
        ft_token_id: 'near',
        price: item.lower_price
      },'300000000000000',
      item.price).then((response) => {
        console.log(response);
      }).catch(err => {
        console.error(err)
      })
    },
    //INICIA EL BACHT
    async buyAll () {
      var txs = []
      //console.log(this.nftCart)
      this.nftCart.forEach(item => {
        const selectedMarketplace = item.marketplaces.find(data => data.selectBuy)
        txs.push({
          receiverId: selectedMarketplace.marketplace,
          functionCalls: [
            {
              methodName: "buy",
              receiverId: selectedMarketplace.marketplace,
              gas: "300000000000000",
              args: {
                nft_contract_id: item.contract_id ,
                token_id: item.token_id,
                ft_token_id: 'near',
                price: item.lower_price
              },
              deposit: item.lower_price,
            },
          ],
        })
      })
      // let txs = [
      //   {
      //     receiverId: item.contract_market,
      //     functionCalls: [
      //       {
      //         methodName: "nft_approve",
      //         receiverId: item.contract_market,
      //         gas: "300000000000000",
      //         args: {
      //           nft_contract_id: item.contract_id ,
      //           token_id: item.token_id,
      //           ft_token_id: 'near',
      //           price: item.price
      //         },
      //         deposit: item.price,
      //       },
      //     ],
      //   },
      // ]
      //console.log(txs, 'compra masiva')
      await this.batchTransaction(
        txs,
        {
          meta: "list",
        },
      );
    },
    async batchTransactions() {
      await this.batchTransaction(
        this.txs,
        {
          meta: "list",
        },
      );
    },
    async createTransactionFn(
      receiverId,
      actions
    ){
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore(), localStorage.network));
      const wallet = new WalletConnection(near);

      if (!wallet || !near) {
        throw new Error(`No active wallet or NEAR connection.`)
      }

      const localKey =
        await near?.connection.signer.getPublicKey(
          wallet?.account().accountId,
          near.connection.networkId
        )

      const accessKey = await wallet
        ?.account()
        .accessKeyForTransaction(receiverId, actions, localKey)

      if (!accessKey) {
        throw new Error(
          `Cannot find matching key for transaction sent to ${receiverId}`
        )
      }

      const block = await near?.connection.provider.block({
        finality: 'final',
      })

      if (!block) {
        throw new Error(`Cannot find block for transaction sent to ${receiverId}`)
      }

      const blockHash = base_decode(block?.header?.hash)
      //const blockHash = nearAPI.utils.serialize.base_decode(accessKey.block_hash);

      const publicKey = PublicKey.from(accessKey.public_key)
      //const nonce = accessKey.access_key.nonce + nonceOffset
      const nonce = ++accessKey.access_key.nonce;

      return createTransaction(
        wallet?.account().accountId,
        publicKey,
        receiverId,
        nonce,
        actions,
        blockHash
      )
    },

    async batchTransaction(transactions, options) {
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore(), localStorage.network));
      const wallet = new WalletConnection(near);

      const nearTransactions = await Promise.all(
        transactions.map(async (tx) => {
          return await this.createTransactionFn(
            tx.receiverId,
            tx.functionCalls.map((fc) => {
              return functionCall(fc.methodName, fc.args, fc.gas, fc.deposit)
            })
          )
        })
      )
      wallet.requestSignTransactions({
        transactions: nearTransactions,
        callbackUrl: options?.callbackUrl,
        meta: options?.meta,
      }).then(res => {
        console.log(res)
      }).catch(err => console.error(err))
    },
    //TERMINA EL BACHT
    prev(e) {
      const slide = e.path[3].querySelector('.buttons__wrapper')
      if (slide.scrollTop >= 0) {
        slide.scrollTop -= 80;
        this.slider = slide.scrollTop -= 80;
        // console.log(this.slider)
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
      //console.log(this.slider)
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
    selectMarketplaceToBuy(item, item2) {
      console.log(item, item2)
      item.marketplaces.forEach(e => e.selectBuy = false)
      item2.selectBuy = true
      item.lower_price = item2.precio_near

      this.sliderB = 0
      this.sliderB = 1
    },
  },
};
</script>

<style src="../pages.scss" lang="scss" />
