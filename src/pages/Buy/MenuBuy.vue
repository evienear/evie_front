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

        <v-col class="containerMenuBuy divrow">
          <v-slide-group
            v-model="sliderA"
            center-active
            :show-arrows="true"
            class="fill-w"
          >
            <v-slide-item v-for="(item, index) in dataMenuBuy" :key="index">
              <v-card
                color="transparent"
                style="display: flex"
                class="containerMarketplace relative"
              >
                <img class="images" :src="item.nft" alt="NFT Market Place">

                <span class="marketplaceId btn2">
                  #{{ item.number }}
                  <i class="center" style="margin-inline: 0.3125rem">
                    &bullet;
                  </i>
                  {{ item.amount}}
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

        <v-col cols="8" sm="6" md="5" class="containerMenuBottom">
          <aside class="divcol">
            <span class="h6 color">EVIE.NEAR</span>
            <span class="desc h9 color">Balance: 100</span>
          </aside>
          <aside class="divcol">
            <span class="h6 color">4 IN CART</span>
            <span class="h9 color center">Total: 84
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
            <v-slide-item v-for="(item, index) in dataMenuReview" :key="index">
              <v-card
                color="transparent"
                style="display: flex"
                class="containerMarketplace relative"
              >
                <img class="images" :src="item.nft" alt="NFT">

                <span class="marketplaceNumber btn2">
                  # {{ item.number }}
                </span>

                <span class="marketplaceAmount btn2 center">
                  {{ item.amount}}
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

        <v-col cols="8" sm="6" md="5" class="containerMenuBottom">
          <aside class="divcol">
            <span class="h6 color">EVIE.NEAR</span>
            <span class="desc h9 color">Balance: 100</span>
          </aside>
          <aside class="divcol">
            <span class="h6 color">4 IN CART</span>
            <span class="h9 color center">Total: 84
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
export default {
  name: "MenuBuy",
  data() {
    return {
      sliderA: "",
      sliderB: "",
      checkout: true,
      review: false,
      dialog: false,
      overlay_opacity: "0.2",
      overlay_color: "white",
      dataMenuBuy: [
        {
          nft: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          market: [
            { name: 'xdn' },
            { name: 'doge' },
          ]
        },
        {
          nft: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          market: [
            { name: 'doge' },
            { name: 'dlt' },
            { name: 'auto' },
          ]
        },
        {
          nft: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          market: [
            { name: 'xdn' },
            { name: 'doge' },
            { name: 'auto' },
          ]
        },
        {
          nft: require("@/assets/nft/monkeyA4.png"),
          number: "3711",
          amount: "16",
          market: [
            { name: 'xdn' },
            { name: 'doge' },
            { name: 'dlt' },
            { name: 'auto' },
          ]
        },
      ],
      dataMenuReview: [
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          number: "3711",
          amount: "16",
          market: [
            { name: 'xdn' },
            { name: 'doge' },
          ]
        },
        {
          nft: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          market: [
            { name: 'doge' }
          ]
        },
        {
          nft: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          market: [
            { name: 'dlt' }
          ]
        },
        {
          nft: require("@/assets/nft/monkeyA4.png"),
          number: "3711",
          amount: "16",
          market: [
            { name: 'auto' }
          ]
        },
      ]
    }
  },
  created() {
    const theme = localStorage.getItem("theme");
    this.OverlayMethod(theme);
  },
  methods: {
    changeToReview() {
      this.checkout = false;
      this.review = true;
    },
    purchase() {
      console.log("purchase")
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
  },
};
</script>

<style src="../pages.scss" lang="scss" />
