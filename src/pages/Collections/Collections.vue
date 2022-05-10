<template>
  <section id="buy">
    <v-col class="containerUp divcol" style="gap: 20px">


      <div class="divrow" style="gap: 0.625rem">
        <!-- separador -->
        <button class="botonBack" style="visibility: hidden" />
        <!-- separador -->
       
      </div>
    </v-col>

    <v-col class="containerDown" style="padding-top: 0">
    

      <!-- <v-col v-for="(item, index) in dataBuyTable" v-bind:key="index"
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
      </v-col> -->

      <div id="tableBuy2">
        <div v-for="(item, index) in collections" v-bind:key="index"
        
                  class="containerMarketplace relative">
                

                <!-- <img src='@/assets/nft/monkeyA1.png' alt="NFT Market Place"> -->
                 <img :src="item.metadata.media" alt="NFT Market Place">

                  <span class="marketplaceId colorInverted colorCartasInverted">
                  # {{item.token_series_id}}
                    <i class="h7 center colorInverted" style="margin-inline: 0.3125rem">
                      &bullet;
                    </i>
                    {{item.metadata.title}}
                  
                  </span>

              
                </div>
      </div>

   
        
     


     
     
        
     

      <!-- <p>{{collections[0]}}</p> -->

      <v-col class="containerPagination end">
        <v-btn>
          <img class="filter" src="@/assets/buttons/arrow.png" alt="button">
        </v-btn>
        <v-btn>
          <img class="filterInverted img2" src="@/assets/buttons/arrow.png" alt="button">
        </v-btn>
      </v-col>
    
    </v-col>
    <MenuBuy ref="menu"></MenuBuy>
  </section>
</template>

<script>
import MenuBuy from '../Buy/MenuBuy.vue'
import axios from "axios";


export default {
  name: "Collections",
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
      axios.post('http://157.230.2.213:3080/api/near/getNftGetSeries', {
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
