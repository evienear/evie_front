<template>
  <section id="home2">
     <div id="home" class="center align">
    <span class="titulo">BUY &amp; SELL</span>
    <span class="subTitulo h5">NFT HUB MARKETPLACE AGGREGATOR</span>

    <div class="containerBalance">
      <aside class="containerCartaHero">
        <div class="triangulo2 colorCartasInverted" />
        <div class="cartaHero colorCartasInverted divcol center">
          <span class="h5 colorInverted">TOTAL COST</span>
          <span class="h5 colorInverted"> {{getBalance}}
            <img class="filterInverted" src="@/assets/logo/near.png" alt="near">
          </span>
        </div>
      </aside>
      </div>

      </div>
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
        <div v-for="(item, index) in landingCollections" v-bind:key="index"
        
                  class="containerMarketplace relative">
                

                 <!-- <img src='@/assets/nft/monkeyA1.png' alt="NFT Market Place">  -->
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

      <!-- <v-col class="containerPagination end">
        <v-btn>
          <img class="filter" src="@/assets/buttons/arrow.png" alt="button">
        </v-btn>
        <v-btn>
          <img class="filterInverted img2" src="@/assets/buttons/arrow.png" alt="button">
        </v-btn>
      </v-col> -->
    
    </v-col>
    <MenuBuy ref="menu"></MenuBuy>
  </section>
</template>

<script>
const ONE_NEAR = 1000000000000000000000000;
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
       landingCollections: [],
    }
  },
    asyncComputed: {
     getBalance(){
      return window.contractBalance.then(balance => parseFloat(balance.total / ONE_NEAR).toFixed(2))
    },
  },
   methods: {
    getLanding(){
      axios.post('http://157.230.2.213:3080/api/near/getLandingPage', {
      listReceivedContract: ['paras-token-v2.testnet']
    })
    .then( response => {
      console.log(response.data);
      this.landingCollections = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    }
  },
  beforeMount(){
    this.getLanding()
  }
  // mounted() {
  //   // window.addEventListener('resize', this.getDimensions);
  //   this.responsive();
  // },
  // // unmounted() {
  // //   window.removeEventListener('resize', this.getDimensions)
  // // },
  // methods: {
  //   // getDimensions() {
  //   //   this.responsive();
  //   // },
  //   responsive() {
  //     if (window.innerWidth <= 880) {
  //       this.leftCard = false;
  //       this.centerCard = true;
  //       this.rightCard = false;
  //     } else {
  //       this.leftCard = true;
  //       this.centerCard = true;
  //       this.rightCard = true;
  //     }
  //   }
  // },
};
</script>

<style src="../pages.scss" lang="scss" />
