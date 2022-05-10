<template>
  <section id="buy">
    <span class="titulo">BUY</span>

    <v-col class="containerUp divcol" style="gap: 20px">
      <div class="divrow divcolmobile" style="gap: 20px">
        <aside class="divrow" style="gap: 6px; margin-bottom: -5px">
          <a href="#/">
            <button class="botonBack center colorCartasInverted">
              <v-icon medium class="colorInverted">mdi-chevron-left</v-icon>
            </button>
          </a>
          <img src="@/assets/nft/monkey1.png" alt="image nft collection">
          <span class="tituloBack h4 colorInverted colorCartasInverted">NEARNUTS</span>
        </aside>

        <aside class="divrow">
          <span class="h7 center">EDUCATION</span>
          <span class="h7">2.845<br>
            RESULTS
          </span>
        </aside>
      </div>

      <div class="divrow" style="gap: 0.625rem">
        <!-- separador -->
        <button class="botonBack" style="visibility: hidden" />
        <!-- separador -->
        <template v-for="(item, index) in dataBuy">
          <p v-bind:key="index"
            class="h8 p space"
          >
            {{ item.title }} 
            <strong class="divrow" style="align-items: center; margin-left: 0.3125rem">{{ item.value }}
              <img v-if="item.icon"
                class="nearBalanceLogo filter" src="@/assets/logo/near.png" alt="near">
            </strong>
          </p>
          <i v-bind:key="index" v-if="!item.divider"
            class="h7 center color">
            &bullet;
          </i>
        </template>
      </div>
    </v-col>

    <v-col class="containerDown" style="padding-top: 0">
      <v-col class="space" style="padding-top: 0; place-content: end">
        <v-col v-for="(item, index) in dataFilter" v-bind:key="index"
          cols="4" sm="4" md="3" lg="2" class="center">
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

        <v-col cols="4" sm="4" md="3" lg="2">
          <span class="rightButton h8 colorInverted colorCartasInverted">
            CART:4 <div>84</div> 
            <v-icon medium class="colorInverted">mdi-chevron-right</v-icon>
          </span>
        </v-col>
      </v-col>

      <v-col v-for="(item, index) in dataBuyTable" v-bind:key="index"
        id="tableBuy" class="padd">
        <div v-for="(item2, index) in item.table" v-bind:key="index"
          class="containerMarketplace relative">
          <div v-if="item2.select" class="selectBox colorCartas" />

          <img :src="item2.market" alt="NFT Market Place">

          <span class="marketplaceId colorInverted colorCartasInverted">
            # {{ item2.number }}
            <i class="h7 center colorInverted" style="margin-inline: 0.3125rem">
              &bullet;
            </i>
            {{ item2.amount}}
            <img class="nearBalanceLogo filterInverted" src="@/assets/logo/near.png" alt="near">
          </span>

          <aside class="buttons">
            <v-btn v-for="(item3, index) in item2.button" v-bind:key="index"
              icon @click="OpenMenuBuy(item3)"
            >
              <img class="filter" :src="item3.boton" alt="button">
            </v-btn>
          </aside>
        </div>
      </v-col>
      <p>{{collections[0]}}</p>

      <v-col class="containerPagination end">
        <v-btn>
          <img class="filter" src="@/assets/buttons/arrow.png" alt="button">
        </v-btn>
        <v-btn>
          <img class="filterInverted img2" src="@/assets/buttons/arrow.png" alt="button">
        </v-btn>
      </v-col>
      <!-- <v-data-table
        id="tableBuy"
        :headers="headers"
        :items="dataTableBuy"
        :search="search"
        item-key="name"
        items-per-page="2"
        mobile-breakpoint="-1"
      >
        <template v-slot:top>
          <v-col class="space" style="padding-top: 0; place-content: end">
            <v-col v-for="(item, index) in dataFilter" v-bind:key="index"
              cols="2" class="center">
              <v-autocomplete
                :items="item.selection"
                hide-details="true"
              >
                <template v-slot:label>
                  <span class="titleAutocompleteBuy h8 color">{{ item.title }}</span>
                </template>

                <template v-slot:append>
                  <v-icon medium class="color">mdi-chevron-down</v-icon>
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="2">
              <span class="rightButton h8 colorInverted colorCartasInverted">
                CART:4 <div>84</div> 
                <v-icon medium class="colorInverted">mdi-chevron-right</v-icon>
              </span>
            </v-col>
          </v-col>
        </template>

        <template v-slot:[`item.col1`]="{ item }">
          <div>
            <img :src="item.col1.nft" alt="Image NFT Collection">
            <span>{{ item.col1.title}}</span>
          </div>
        </template>
      </v-data-table> -->
    </v-col>
    <MenuBuy ref="menu"></MenuBuy>
  </section>
</template>

<script>
import MenuBuy from './MenuBuy.vue'
import axios from "axios";


export default {
  name: "Buy",
  components: {
    MenuBuy
  },
  data() {
    return {
      collections: [],
      dataBuy: [
        {
          title: "Minted",
          value: "8796"
        },
        {
          title: "Owners",
          value: "1987"
        },
        {
          title: "Floor Prince",
          value: "20",
          icon: true
        },
        {
          title: "Daily Bolume",
          value: "$8,976",
          divider: true
        },
      ],
      dataFilter: [
        {
          title: "LOWEST PRICE",
          selection: [
            'foo', 'bar', 'fizz', 'buzz'
          ]
        },
        {
          title: "ATTRIBUTE",
          selection: [
            'foo', 'bar', 'fizz', 'buzz'
          ]
        }
      ],
      dataBuyTable: [
        {
          table: [
            {
              market: require("@/assets/nft/monkeyA1.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            },
            {
              market: require("@/assets/nft/monkeyA2.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            },
            {
              market: require("@/assets/nft/monkeyA3.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            },
            {
              market: require("@/assets/nft/monkeyA4.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            },
            {
              market: require("@/assets/nft/monkeyA5.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            },
            {
              market: require("@/assets/nft/monkeyA1.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            },
            {
              market: require("@/assets/nft/monkeyA2.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            },
            {
              market: require("@/assets/nft/monkeyA3.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            },
            {
              market: require("@/assets/nft/monkeyA4.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            },
            {
              market: require("@/assets/nft/monkeyA5.png"),
              number: "3711",
              amount: "16",
              select: true,
              button: [
                {
                  boton: require("@/assets/buttons/xdn.png")
                },
                {
                  boton: require("@/assets/buttons/doge.png")
                },
                {
                  boton: require("@/assets/buttons/dlt.png")
                },
                {
                  boton: require("@/assets/buttons/auto.png")
                }
              ]
            }
          ]
        },
      ],
      // dataTableBuy: [
      //   {
      //     col1: [
      //       {
      //         title: "22",
      //         nft: require("@/assets/nft/monkey1.png")
      //       }
      //     ],
      //     col2: "2",
      //     col3: "3",
      //     col4: "4",
      //     col5: "5"
      //   },
      //   {
      //     col1: "1",
      //     col2: "2",
      //     col3: "3",
      //     col4: "4",
      //     col5: "5"
      //   },
      // ]
    }
  },
  // computed: {
  //   headers() {
  //     return [
  //       {
  //         sortable: false,
  //         value: "col1",
  //       },
  //       {
  //         sortable: false,
  //         value: "col2",
  //       },
  //       {
  //         sortable: false,
  //         value: "col3",
  //       },
  //       {
  //         sortable: false,
  //         value: "col4",
  //       },
  //       {
  //         sortable: false,
  //         value: "col5",
  //       },
  //     ];
  //   },
  // },
    computed: {
    accountId() {
      console.log(window.accountId)
      return window.accountId;
    },
    signedIn() {
      return window.walletConnection.isSignedIn();
    },
    contractBalance(){
      return window.contractBalance;
    }
  },
  methods: {
    OpenMenuBuy(item) {
      console.log(item)
      this.$refs.menu.dialog = true;
    },
    getCollections(){
      axios.post('http://localhost:3000/api/near/getNftGetSeries', {
      receivedAccount: 'jeph.testnet'
    })
    .then( response => {
      console.log(response.data);
      this.collections = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    }
  },
  beforeMount(){
    this.getCollections()
  }
  
};
</script>

<style src="../pages.scss" lang="scss" />
