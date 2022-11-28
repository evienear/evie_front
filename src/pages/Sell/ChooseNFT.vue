<template>
  <section id="chooseNFT">
    <h1 class="titulo h2mobile">SELL</h1>

    <v-col class="padd" style="gap: 20px" >
      <aside class="divrow" style="gap: 20px; margin-bottom: 20px">
        <button class="botonBack center" @click="$router.push('/sell')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h3 class="tituloBack p">CHOOSE NFT's</h3>
      </aside>
      <aside class="end">
        <!-- <button class="button btn2" @click="dialog=true">
          Deposit
        </button> -->
        <!-- <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="button2" color="transparent" v-bind="attrs" v-on="on">
              <v-icon x-large>mdi-information-outline</v-icon>
            </v-btn>
          </template>
        <span>
          To be listed on a market first You have to 
        </span>
        <br>
        <span>
          deposit for storage in the corresponding market
        </span>
      </v-tooltip> -->
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
            #{{ item.token_id.cutString(4, 4) }}
          </span>
          <aside class="buttons" v-if="item.marketplace !== null">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on">
                  <img :src="require('@/assets/markets/' + item.marketplace + '.svg')" :alt="item.contract_market">
                </v-btn>
              </template>
              <span>{{ item.marketplace }}</span>
            </v-tooltip>
          </aside>
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
              
              <div class="center marginright" style="gap: 3px">
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
              @keypress="onlyNumber"
            >
              <template v-slot:prepend>
                <label>Amount in Near</label>
              </template>
            </v-text-field>
          </v-card>
        </section>

        <v-col class="center">
          <button class="button btn2" @click="listar_nft()">
            SELL
          </button>
        </v-col>
      </section>
    </section>

<!-- DIALOG DEPOSIT -->
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
    <!-- DIALOG DEPOSIT -->
    <!-- DIALOG MENSAJE -->
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
          <button  class="button h9 btn2" @click="dialogMessage = false, transactionHashes = ''">
            CLOSE
          </button>
        </v-col>
      </section>
    </v-dialog>
    <!-- DIALOG MENSAJE -->
  </section>
</template>

<script>
import axios from 'axios'
import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/api";
import {/*Action,*/ createTransaction, functionCall} from 'near-api-js/lib/transaction'
import { base_decode } from 'near-api-js/lib/utils/serialize'
import { PublicKey } from 'near-api-js/lib/utils'
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI;
// const CONTRACT_NAME = 'backend.evie.testnet'
// const CONTRACT_NAME = 'backend.eviepro.near'
export default {
  name: "ChooseNFT",
  data() {
    return {
      marketplaceDeposit: '',
      price: null,
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
      dataSellSettings: [],
      marketplace: [],
      selectedItem: null,
      data: [],
      dialogMessage: false,
      titleDM: '',
      messageDM:'',
      transactionHashes: '',
      storageBalance: 0,
      minimumStorage: 0,
      txs: [],
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
      this.messageDM = 'Successful listing'
      this.transactionHashes = urlParams.get("transactionHashes")
      history.replaceState(null, location.href.split("?")[0], '/#/choose-nft');
      
    }
    if (urlParams.get("errorCode") !== null) {
      history.replaceState(null, location.href.split("?")[0], '/#/choose-nft');
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
        response.data.forEach(item => {
          console.log(item)
          this.market(item.token_id, item.precio, item.base_uri, item.marketplace, item.collection)
        });
      }).catch(err => console.log(err))
    },
    async market(token_id, precio, base_uri, marketplace, collection) {
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
        responseData.forEach(item => {
          if(base_uri !== '' || base_uri !== null) {
            if(!item.metadata.media.includes('https://')) {
              item.metadata.media = base_uri + '/' + item.metadata.media
            }
          }
          item.marketplace = marketplace
          item.price = parseFloat(price)
          item.precio = precio
          item.collection = collection
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
      this.dataSellSettings = []
      this.dataSellSettings.push(item)
    },
    async approve() {
      var msg = ''
      var price = 0
      if(!this.sameSellPrice) {
        if(!this.selectedItem) {
          this.dialogMessage = true
          this.titleDM = 'Empty fields'
          this.messageDM = 'You must select the marketplace'
          return
        } else if(!this.price) {
          this.dialogMessage = true
          this.titleDM = 'Empty fields'
          this.messageDM = 'the amount field must not be empty'
          return
        } else {
          price = utils.format.parseNearAmount((this.price).toString())
          msg = JSON.stringify({
            market_type: "sale", price: price, ft_token_id: "near"
          })
        }
        
      } else if(this.sameSellPrice) {
        if(!this.selectedItem) {
          this.dialogMessage = true
          this.titleDM = 'Empty fields'
          this.messageDM = 'You must select the marketplace'
          return
        } else {
          msg = JSON.stringify({
            market_type: "sale", price: this.dataSellSettings[0].precio, ft_token_id: "near"
          })
        }
        
      }
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
      this.marketplace = []
      axios.post('https://evie.pro:3070/api/v1/listmarketplacecollection', {
      // axios.post('http://157.230.2.213:3071/api/v1/listmarketplacecollection', {
      // axios.post('http://157.230.2.213:3072/api/v1/listmarketplacecollection', {
        "collection": item.collection
      }).then(response => {
        response.data.forEach(item => {
          this.marketplace.push(item.marketplace)
        });
      }).catch(err => console.log(err))
    },
    onlyNumber ($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
      }
    },
   
   // FUNCIONES DEL BATCH

   async storage_minimum() {
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()));
      const wallet = new WalletConnection(near);

      const contract = new Contract(wallet.account(), this.selectedItem, {
        viewMethods: ["storage_minimum_balance"],
        sender: wallet.account(),
      })
      await contract.storage_minimum_balance()
      .then((response) => {
        this.minimumStorage = utils.format.formatNearAmount(response)
      }).catch(err => {
        console.log(err)
      })
    },
    async storage_balance() {
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()));
      const wallet = new WalletConnection(near);

      const contract = new Contract(wallet.account(), this.selectedItem, {
        viewMethods: ["storage_balance_of"],
        sender: wallet.account(),
      })
      await contract.storage_balance_of({
        account_id: wallet.getAccountId(),
      }).then((response) => {
        this.storageBalance = utils.format.formatNearAmount(response)
      }).catch(err => {
        console.log(err)
      })
    },

    async listar_nft() {
      await this.storage_minimum()
      await this.storage_balance()
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()));
      const wallet = new WalletConnection(near);
      if(!this.selectedItem) {
        this.dialogMessage = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'You must select the marketplace'
        return
      } else if(!this.price) {
        this.dialogMessage = true
        this.titleDM = 'Empty fields'
        this.messageDM = 'the amount field must not be empty'
        return
      }

      if (this.storageBalance > this.minimumStorage) {
        this.approve()
      } else {
        let msgs = {
          price: utils.format.parseNearAmount((this.price).toString()),
          market_type: "sale",
          ft_token_id: "near"
        }
        let txs = [
          {
            receiverId: this.selectedItem,
            functionCalls: [
              {
                methodName: "storage_deposit",
                receiverId: this.selectedItem,
                gas: "200000000000000",
                args: {
                  receiverId: wallet.getAccountId(),
                },
                deposit: utils.format.parseNearAmount(this.minimumStorage),
              },
            ],
          },
          {
            receiverId: this.dataSellSettings[0].collection,
            functionCalls: [
              {
                methodName: "nft_approve",
                receiverId: this.dataSellSettings[0].collection,
                gas: "200000000000000",
                args: {
                  token_id: this.dataSellSettings[0].token_id,
                  account_id: this.selectedItem,
                  msg: JSON.stringify(msgs),
                },
                deposit: "350000000000000000000",
              },
            ],
          },
        ]
        await this.batchTransaction(
          txs,
          {
            meta: "list",
          },
        );
      }
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
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()));
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
      const near = await connect(CONFIG(new keyStores.BrowserLocalStorageKeyStore()));
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
      }).catch(err => console.log(err))
    }
  }
};
</script>

<style src="../pages.scss" lang="scss" />
