<template>
  <section id="reviewSell">
    <span class="titulo">SELL</span>

    <v-col style="gap: 20px">
      <aside class="divrow divcolmobile" style="gap: 20px">
        <a href="#/choose-nft">
          <button class="botonBack center colorCartasInverted">
            <v-icon medium class="colorInverted">mdi-chevron-left</v-icon>
          </button>
        </a>
        <div class="tituloBack h4 colorInverted colorCartasInverted">REVIEW</div>
      </aside>

      <aside class="contenedor1 divrow" style="justify-content: start; align-items: center">
        <span class="h9">MARKETPLACE</span>
        <aside class="divrow">
          <v-btn v-for="(item, index) in dataMarketplace" v-bind:key="index"
            icon disabled>
            <img class="filter" :src="item.boton" alt="button">
          </v-btn>
        </aside>
        <div class="linea colorCartasInverted" />
      </aside>
    </v-col>

    <v-col class="containerReviewSell">
      <div v-for="(item, index) in dataReviewSell" v-bind:key="index"
        class="containerMarketplace relative">
        <img :src="item.market" alt="NFT Market Place">

        <span class="marketplaceNumber colorInverted colorCartasInverted">
          # {{ item.number }}
        </span>

        <span class="marketplaceAmount colorInverted colorCartasInverted">
          {{ item.amount}}
          <img class="nearBalanceLogo filterInverted" src="@/assets/logo/near.png" alt="near">
        </span>
      </div>
    </v-col>

    <v-col cols="5" class="containerReviewBottom">
      <div class="divider colorCartasInverted" />
      <aside class="divcol">
        <span class="h4 bold" style="line-height: 1.5ch">
          EVIE.NEAR
        </span>
        <span class="desc h6 color">Balance: 100</span>
      </aside>
      <aside class="divcol">
        <span class="h4 bold" style="line-height: 1.5ch">
          LIST: 2
        </span>
        <span class="h6 color center">Total: 62
          <img class="nearBalanceLogo filter" src="@/assets/logo/near.png" alt="near">
        </span>
      </aside>

      <button class="button colorCartasInverted" @click="purchase()">
        <span class="h9 colorInverted">COMPLETE SELL </span>
        <v-icon small class="colorInverted">mdi-chevron-right</v-icon>
      </button>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "ReviewSell",
  data() {
    return {
      dataMarketplace: [
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
      ],
      dataReviewSell: [
        {
          market: require("@/assets/nft/monkeyA1.png"),
          number: "3711",
          amount: "16",
          button: [
            {
              boton: require("@/assets/buttons/xdn.png")
            },
          ]
        },
        {
          market: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          button: [
            {
              boton: require("@/assets/buttons/doge.png")
            },
          ]
        },
      ],
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
