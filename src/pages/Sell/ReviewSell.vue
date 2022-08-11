<template>
  <section id="reviewSell">
    <v-col style="gap: 20px" class="padd">
      <aside class="divrow" style="gap: 20px">
        <button class="botonBack center" @click="$router.push('/choose-nft')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h3 class="tituloBack p">REVIEW</h3>
      </aside>

      <aside class="contenedor1 start">
        <span class="h9">MARKETPLACE</span>
        <aside class="divrow" style="gap:.5em">
          <v-btn v-for="(item,i) in dataMarketplace" :key="i" icon disabled
            class="reviewMarketBtn">
            <img :src="item.boton" alt="button">
          </v-btn>
        </aside>
      </aside>
    </v-col>

    <v-col class="containerReviewSell padd">
      <v-slide-group
        v-model="slider"
        center-active
        show-arrows
        class="fill-w sliderReview"
      >
        <v-slide-item v-for="(item, index) in dataReviewSell" v-bind:key="index">
          <v-card
            color="transparent"
            style="display: flex"
            class="containerMarketplace relative marginright"
          >
            <img class="images" :src="item.market" alt="NFT Market Place">

            <span class="marketplaceNumber btn2">#{{ item.number }}</span>

            <span class="marketplaceAmount center btn2">{{ item.amount}}
              <img class="nearBalanceLogo" src="@/assets/logo/near.svg" alt="near">
            </span>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-col>

    <v-col class="containerReviewBottom">
      <aside class="divcol">
        <span class="h4-em" style="line-height: 1.5ch">EVIE.NEAR</span>
        <span class="desc h6-em color light">Balance: 100</span>
      </aside>

      <aside class="divcol">
        <span class="h4-em" style="line-height: 1.5ch">LIST: 2</span>
        <span class="h6-em color center">Total: 62
          <img class="filter" src="@/assets/logo/near.svg" alt="near"
            style="width:1.2em;height:1.2em">
        </span>
      </aside>

      <button class="button h9 btn2" @click="purchase()">
        COMPLETE SELL<v-icon medium>mdi-chevron-right</v-icon>
      </button>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "ReviewSell",
  data() {
    return {
      slider: "",
      dataMarketplace: [
        { boton: require("@/assets/buttons/xdn.svg") },
        { boton: require("@/assets/buttons/doge.svg") },
        { boton: require("@/assets/buttons/dlt.svg") },
        { boton: require("@/assets/buttons/auto.svg") }
      ],
      dataReviewSell: [
        {
          market: require("@/assets/nft/monkeyA1.png"),
          number: "3711",
          amount: "16",
        },
        {
          market: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
        },
        {
          market: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
        },
        {
          market: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
        },
        {
          market: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
        },
      ],
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
