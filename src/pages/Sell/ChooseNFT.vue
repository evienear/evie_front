<template>
  <section id="chooseNFT">
    <span class="titulo">SELL</span>

    <v-col style="gap: 20px">
      <aside class="divrow divcolmobile" style="gap: 20px">
        <a href="#/sell">
          <button class="botonBack center colorCartasInverted">
            <v-icon medium class="colorInverted">mdi-chevron-left</v-icon>
          </button>
        </a>
        <div class="tituloBack h4 colorInverted colorCartasInverted">CHOOSE NFT's</div>
      </aside>

      <aside class="divrow" style="place-content: start">
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
      </aside>
    </v-col>

    <section class="divrow divcolmobile">
      <v-col cols="12" md="6" class="containerLeft" style="padding-top: 0">
        <div v-for="(item, index) in dataChooseNFTTable" v-bind:key="index"
          class="containerMarketplace relative">
          <div v-if="item.select" class="selectBox colorCartas" />

          <img :src="item.market" alt="NFT Market Place">

          <span class="marketplaceId h8 colorInverted colorCartasInverted">
            # {{ item.number }}
          </span>
        </div>
      </v-col>

      <v-col cols="12" md="6" lg="5" class="containerRight" style="padding-top: 0">
        <span class="h5 bold">SELL SETTINGS</span>

        <aside class="option divrow end">
          <span class="h7">SAME SELL PRICE</span>
          <button class="relative" @click="PriceSwitch()"
            style="width: 80px; border-radius: 30px; color: transparent">
            .
            <div class="containerSwitchPriceSelection"
              :class="{containerSwitchPriceSelectionActive: active}" />
            <div class="switchPriceSelection"
              :class="{switchPriceSelectionActive: active}" />
            <div />
          </button>
        </aside>

        <v-select
          v-model="selectedItem"
          :items="marketplace"
          multiple
          chips
          attach
        >
          <template v-slot:selection="slotProps">
            <v-chip class="colorCartasInverted">
              <img class="filter" :src="slotProps.item.img" alt="button">
            </v-chip>
          </template>

          <template v-slot:item="slotProps">
            <v-col :class="{ colActive: slotProps.item.active }"
              @click="activate(slotProps.item)"
            >
              <v-chip class="colorCartasInverted">
                <img class="filter" :src="slotProps.item.img" alt="button">
              </v-chip>
            </v-col>
          </template>
        </v-select>

        <section class="containerSellSettings">
          <v-card v-for="(item, index) in dataSellSettings" v-bind:key="index"
            color="transparent"
          >
            <div v-if="!item.divisor" class="divisor colorCartasInverted" />
            <aside class="divrow">
              <img src="@/assets/nft/monkeyA1.png" alt="nft">
              <div class="divcol center">
                <span class="h7" style="font-weight: 500">
                  {{ item.title}}
                </span>
                <span class="marketplaceId h7 colorInverted colorCartasInverted">
                  # {{ item.number }}
                </span>
              </div>
            </aside>
            <aside class="divrow center marginright" style="gap: 5px">
              <span class="h5 bold">{{ item.amount }}</span>
              <img class="nearBalanceLogo filter" src="@/assets/logo/near.png" alt="near">
            </aside>
          </v-card>
        </section>

        <v-col class="center">
          <a href="#/review-sell">
            <button class="button colorCartasInverted">
              <span class="h9 colorInverted">REVIEW </span>
              <v-icon small class="colorInverted">mdi-chevron-right</v-icon>
            </button>
          </a>
        </v-col>
      </v-col>
    </section>
  </section>
</template>

<script>
export default {
  name: "ChooseNFT",
  data() {
    return {
      dataFilter: [
        {
          title: "COLLECTIONS",
          selection: [
            'foo', 'bar', 'fizz', 'buzz'
          ]
        },
        {
          title: "CARD CREATED",
          selection: [
            'foo', 'bar', 'fizz', 'buzz'
          ]
        }
      ],
      dataChooseNFTTable: [
        {
          market: require("@/assets/nft/monkeyA1.png"),
          number: "3711",
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
      ],
      active: false,
      dataSellSettings: [
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00"
        },
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
          divisor: true
        },
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
          divisor: true
        },
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
          divisor: true
        }
      ],
      marketplace: [
        {img: require("@/assets/buttons/auto.png"), active: false},
        {img: require("@/assets/buttons/doge.png"), active: false},
        {img: require("@/assets/buttons/dlt.png"), active: false},
        {img: require("@/assets/buttons/xdn.png"), active: false}
      ],
      selectedItem: [],
    }
  },
  methods: {
    activate(item) {
      item.active = !item.active
    },
    PriceSwitch() {
      console.log(this.selection)
      this.active = !this.active
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
