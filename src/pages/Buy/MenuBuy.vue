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
    <section v-if="checkout" class="colorCartas" style="min-height: 550.5px">
      <div class="end paddtop paddright paddleft">
        <button class="buttonClose center relative">
          <img class="close" :src="`${$store.state.baseURL}themes/${$store.state.theme}/close.png`"
            alt="close" @click="dialog = false"
          >
        </button>
      </div>
      <v-col cols="11">
        <aside class="divrow" style="gap: 6px; margin-bottom: -2px">
          <button class="botonBack center colorCartasInverted" @click="goBack()">
            <v-icon medium class="colorInverted">mdi-chevron-left</v-icon>
          </button>
          <span class="tituloBack h4 colorInverted colorCartasInverted">CHECKOUT</span>
        </aside>
        <div class="divrow">
          <!-- spacer -->
          <button class="botonBack" style="visibility: hidden" />
          <!-- spacer -->
          <span class="h9 subtitleBack color">SELECT MARKETPLACE</span>
        </div>
        </v-col>

        <v-col class="containerMenuBuy divrow">
          <div v-for="(item, index) in dataMenuBuy" v-bind:key="index"
            class="containerMarketplace relative">
            <img :src="item.market" alt="NFT Market Place">

            <span class="marketplaceId colorInverted colorCartasInverted">
              # {{ item.number }}
              <i class="h7 center colorInverted" style="margin-inline: 0.3125rem">
                &bullet;
              </i>
              {{ item.amount}}
              <img class="nearBalanceLogo filterInverted" src="@/assets/logo/near.png" alt="near">
            </span>

            <aside class="buttons">
              <v-btn v-for="(item2, index) in item.button" v-bind:key="index"
                icon>
                <img class="filter" :src="item2.boton" alt="button">
              </v-btn>
            </aside>
          </div>
        </v-col>

        <v-col cols="5" class="containerMenuBottom">
          <div class="divider colorCartasInverted" />
          <aside class="divcol">
            <span class="h6 color" style="font-weight: bold">
              EVIE.NEAR
            </span>
            <span class="desc h9 color">Balance: 100</span>
          </aside>
          <aside class="divcol">
            <span class="h6 color" style="font-weight: bold">
              4 IN CART
            </span>
            <span class="h9 color center">Total: 84
              <img class="nearBalanceLogo filter" src="@/assets/logo/near.png" alt="near">
            </span>
          </aside>

          <button class="button colorCartasInverted" @click="changeToReview()">
            <span class="h9 colorInverted">REVIEW </span>
            <v-icon small class="colorInverted">mdi-chevron-right</v-icon>
          </button>
        </v-col>
      </section>

      <!-- review dialog-->
      <section v-if="review" class="colorCartas" style="min-height: 550.5px">
      <div class="end paddtop paddright paddleft">
        <button class="buttonClose center relative">
          <img class="close" :src="`${$store.state.baseURL}themes/${$store.state.theme}/close.png`"
            alt="close" @click="dialog = false"
          >
        </button>
      </div>
      <v-col cols="11">
        <aside class="divrow" style="gap: 6px; margin-bottom: -2px">
          <button class="botonBack center colorCartasInverted" @click="goBack()">
            <v-icon medium class="colorInverted">mdi-chevron-left</v-icon>
          </button>
          <span class="tituloBack h4 colorInverted colorCartasInverted">REVIEW</span>
        </aside>
        <!-- spacer -->
        <div class="divrow" style="visibility: hidden">
          <span class="h9 subtitleBack">SELECT MARKETPLACE</span>
        </div>
        <!-- spacer -->
        </v-col>

        <v-col class="containerMenuReview divrow">
          <div v-for="(item, index) in dataMenuReview" v-bind:key="index"
            class="containerMarketplace relative">
            <img :src="item.market" alt="NFT Market Place">

            <span class="marketplaceNumber colorInverted colorCartasInverted">
              # {{ item.number }}
            </span>

            <span class="marketplaceAmount colorInverted colorCartasInverted">
              {{ item.amount}}
              <img class="nearBalanceLogo filterInverted" src="@/assets/logo/near.png" alt="near">
            </span>

            <aside class="buttons">
              <v-btn v-for="(item2, index) in item.button" v-bind:key="index"
                icon>
                <img class="filter" :src="item2.boton" alt="button">
              </v-btn>
            </aside>
          </div>
        </v-col>

        <v-col cols="5" class="containerMenuBottom">
          <div class="divider colorCartasInverted" />
          <aside class="divcol">
            <span class="h6 color" style="font-weight: bold">
              EVIE.NEAR
            </span>
            <span class="desc h9 color">Balance: 100</span>
          </aside>
          <aside class="divcol">
            <span class="h6 color" style="font-weight: bold">
              4 IN CART
            </span>
            <span class="h9 color center">Total: 84
              <img class="nearBalanceLogo filter" src="@/assets/logo/near.png" alt="near">
            </span>
          </aside>

          <button class="button colorCartasInverted" @click="purchase()">
            <span class="h9 colorInverted">COMPLETE PURCHASE </span>
            <v-icon small class="colorInverted">mdi-chevron-right</v-icon>
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
      checkout: true,
      review: false,
      dialog: false,
      overlay_opacity: "0.2",
      overlay_color: "white",
      dataMenuBuy: [
        {
          market: require("@/assets/nft/monkeyA1.png"),
          number: "3711",
          amount: "16",
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
      ],
      dataMenuReview: [
        {
          market: require("@/assets/nft/monkeyA1.png"),
          number: "3711",
          amount: "16",
          button: [
            {
              boton: require("@/assets/buttons/xdn.png")
            }
          ]
        },
        {
          market: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          button: [
            {
              boton: require("@/assets/buttons/doge.png")
            }
          ]
        },
        {
          market: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          button: [
            {
              boton: require("@/assets/buttons/dlt.png")
            }
          ]
        },
        {
          market: require("@/assets/nft/monkeyA4.png"),
          number: "3711",
          amount: "16",
          button: [
            {
              boton: require("@/assets/buttons/auto.png")
            }
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
    // SelectMarket() {
    //   console.log("funcion")
    // },
    goBack() {
      if (this.checkout == false) {
        this.checkout = true;
        this.review = false;
      } else {
        this.checkout = false;
        this.review = true;
      }
    },
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
