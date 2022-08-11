<template>
  <section id="chooseNFT">
    <h1 class="titulo h2mobile">SELL</h1>

    <v-col class="padd" style="gap: 20px">
      <aside class="divrow" style="gap: 20px">
        <button class="botonBack center" @click="$router.push('/sell')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h3 class="tituloBack p">CHOOSE NFT's</h3>
      </aside>

      <aside class="start">
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

    <section class="wrapperContent gapmobile">
      <v-col class="containerLeft" style="padding-top: 0">
        <v-card v-for="(item,i) in dataChooseNFTTable" :key="i" color="transparent"
          class="containerMarketplace relative" :class="{active: item.selected}">

          <img class="images" :src="item.market" alt="NFT Market Place" @click="item.selected=!item.selected">

          <span class="marketplaceId btn2 h8">
            #{{ item.number }}
          </span>
        </v-card>
      </v-col>

      <v-col class="containerRight" style="padding-top: 0">
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
          multiple attach
        >
          <template v-slot:selection="slotProps">
            <img :src="slotProps.item.img" alt="button">
          </template>

          <template v-slot:item="slotProps">
            <v-col :class="{ colActive: slotProps.item.active }"
              @click="slotProps.item.active=!slotProps.item.active">
              <img :src="slotProps.item.img" alt="button">
            </v-col>
          </template>
        </v-select>

        <section class="containerSellSettings">
          <v-card v-for="(item,i) in dataSellSettings" :key="i" color="transparent">
            <aside class="divrow" style="gap:clamp(.5em, 1vw, 1em)">
              <img class="images" src="@/assets/nft/monkeyA2.png" alt="nft" style="--border-size: 4px">
              <div class="divcol astart jcenter">
                <span class="h7" style="font-weight: 500">{{ item.title}}</span>
                <span class="marketplaceId btn2 h7">#{{ item.number }}</span>
              </div>
            </aside>

            <aside class="center marginright" style="gap: 3px">
              <span style="font-size: clamp(1.2em, 1.5vw, 1.5em)">{{ item.amount }}</span>
              <img class="filter" src="@/assets/logo/near.svg" alt="near"
                style="width:1.5em; height:1.5em">
            </aside>
          </v-card>
        </section>

        <v-col class="center">
          <button class="button btn2" @click="$router.push('/review-sell')">
            REVIEW<v-icon medium>mdi-chevron-right</v-icon>
          </button>
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
          selection: [ 'foo', 'bar', 'fizz', 'buzz' ]
        },
        {
          title: "CARD CREATED",
          selection: [ 'foo', 'bar', 'fizz', 'buzz' ]
        }
      ],
      dataChooseNFTTable: [
        {
          market: require("@/assets/nft/monkeyA1.png"),
          number: "3711",
          selected: false,
        },
        {
          market: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          selected: false,
        },
        {
          market: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          selected: false,
        },
        {
          market: require("@/assets/nft/monkeyA4.png"),
          number: "3711",
          selected: false,
        },
        {
          market: require("@/assets/nft/monkeyA5.png"),
          number: "3711",
          selected: false,
        }
      ],
      sameSellPrice: false,
      dataSellSettings: [
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
        },
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
        },
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
        },
        {
          nft: require("@/assets/nft/monkeyA1.png"),
          title: "NEARNAUT",
          number: "3706",
          amount: "0,00",
        }
      ],
      marketplace: [
        {img: require("@/assets/buttons/auto.svg"), active: false},
        {img: require("@/assets/buttons/doge.svg"), active: false},
        {img: require("@/assets/buttons/dlt.svg"), active: false},
        {img: require("@/assets/buttons/xdn.svg"), active: false}
      ],
      selectedItem: [],
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
