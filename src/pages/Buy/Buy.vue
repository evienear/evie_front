<template>
  <section id="buy">
    <MenuBuy ref="menu"></MenuBuy>
    <h1 class="titulo h2mobile">BUY</h1>

    <v-col class="containerUp divcol padd marginbottom">
      <aside class="divrow" style="gap: 6px; margin-bottom: -5px">
        <button class="botonBack center" @click="$router.push('/')">
          <img
            :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`"
            alt="back icon"
          />
        </button>

        <img src="@/assets/nft/monkey1.png" class="images" alt="image" />

        <div class="divcol jcenter" style="gap: 0.5em">
          <span class="tituloBack" style="max-width: max-content"> {{collectionDetail.collection}}</span>
          <!-- desktop -->
          <div class="contenidoInfo divrow eliminarmobile">
            <template>
              <p class="p space">
                Minted
                <strong
                  class="divrow"
                  style="align-items: center; margin-left: 0.3125rem"
                >
                  {{collectionDetail.total_cards}}</strong
                >
                <i class="center color">&bullet;</i>
              </p>
              <p class="p space">
                Owners
                <strong
                  class="divrow"
                  style="align-items: center; margin-left: 0.3125rem"
                  > {{collectionDetail.total_owners}}</strong
                >
                <i class="center color">&bullet;</i>
              </p>
              <!-- <p class="p space">
                Floor Prince
                <strong
                  class="divrow"
                  style="align-items: center; margin-left: 0.3125rem"
                >
                  <img
                    class="nearBalanceLogo filter"
                    src="@/assets/logo/near.svg"
                    alt="near"
                  />
                </strong>
                <i class="center color">&bullet;</i>
              </p> -->
              <p class="p space">
                Daily Volume
                <strong
                  class="divrow"
                  style="align-items: center; margin-left: 0.3125rem"
                >
                 {{ ((collectionDetail.volume)/ONE_NEAR).toFixed(2)}} </strong
                >
              </p>
               <strong
                  class="divrow"
                  style="align-items: center; margin-left: 0.3125rem"
                >
                  <img
                    class="nearBalanceLogo filter"
                    src="@/assets/logo/near.svg"
                    alt="near"
                  />
                </strong>
            </template>
          </div>

          <!-- mobile -->
          <aside class="acenter vermobile" style="gap: 1em">
            <h4 class="educationText p center btn2">EDUCATION</h4>
            <span class="resultsText">2.845 RESULTS</span>
          </aside>
        </div>
      </aside>

      <aside class="sectdown">
        <!-- mobile -->
        <div class="contenidoInfo divrow divwrapmobile vermobile">
          <template>
            <p class="p space">
              Minted
              <strong
                class="divrow"
                style="align-items: center; margin-left: 0.3125rem"
                >sds</strong
              >
              <i class="center color">&bullet;</i>
            </p>
            <p class="p space">
              Owners
              <strong
                class="divrow"
                style="align-items: center; margin-left: 0.3125rem"
                >23423</strong
              >
              <i class="center color">&bullet;</i>
            </p>
            <p class="p space">
              Floor Prince
              <strong
                class="divrow"
                style="align-items: center; margin-left: 0.3125rem"
                >234
                <img
                  class="nearBalanceLogo filter"
                  src="@/assets/logo/near.svg"
                  alt="near"
                />
              </strong>
              <i class="center color">&bullet;</i>
            </p>
            <p class="p space">
              Daily Volume
              <strong
                class="divrow"
                style="align-items: center; margin-left: 0.3125rem"
                >32424</strong
              >
            </p>
          </template>
        </div>

        <!-- desktop -->
        <h4 class="educationText p center btn2 eliminarmobile">EDUCATION </h4>
        <span class="resultsText eliminarmobile">2.845 RESULTS</span>
      </aside>
    </v-col>

    <v-col class="containerDown padd">
      <v-col
        class="space aendmobile divcolmobile"
        style="padding-block: 0 2em; gap: 1em"
      >
        <div class="fill-w jend">
          <v-col
            v-for="(item, i) in dataFilter"
            :key="i"
            sm="6"
            md="4"
            lg="3"
            class="center paddvertical"
          >
            <v-select :items="item.selection" :hide-details="true">
              <template v-slot:label>
                <span class="titleAutocompleteBuy h8 color">{{
                  item.title
                }}</span>
              </template>

              <template v-slot:append>
                <v-icon large class="color">mdi-chevron-down</v-icon>
              </template>
            </v-select>
          </v-col>
        </div>

        <button
          class="rightButton btn2 fill-w paddleftmobile"
          @click="$refs.menu.dialog = true"
        >
          CART:4
          <span class="acenter"
            >84<img
              class="nearBalanceLogo"
              src="@/assets/logo/near.svg"
              alt="near"
          /></span>
        </button>
      </v-col>

      <v-col id="tableBuy" class="padd">
        <div
          v-for="(item, index) in Collections"
          v-bind:key="index"
          class="containerMarketplace"
          :class="{ active: item.select }"
          @click="item.select = !item.select"
        >
        <div v-if="item.price != null">
             <img class="images" :src="item.metadata.media" alt="NFT Market Place" />

          <span class="marketplaceId btn2" style="bottom: -5% !important">
            # {{ item.name }}
            <i class="center" style="margin-inline: 0.3125em">&bullet;</i>
            {{ ((item.price)/ONE_NEAR).toFixed(2) }}
            <img
              class="nearBalanceLogo"
              src="@/assets/logo/near.svg"
              alt="near" 
            />
          </span>

        </div>
       
          <!-- <aside class="buttons">
            <v-btn v-for="(item2, i) in item.market" :key="i" icon>
              <img
                :src="require(`@/assets/buttons/${item2.name}.svg`)"
                alt="marketplace"
              />
            </v-btn>
          </aside> -->
        </div>
      </v-col>

      <v-col class="containerPagination end">
        <v-btn
          v-for="(item, i) in dataPagination"
          :key="i"
          class="btn2"
          :class="{ active: item.active }"
          @click="
            dataPagination.forEach((e) => {
              e.active = false;
            });
            item.active = true;
          "
        >
          <v-icon large style="color: #58565b !important"
            >mdi-chevron-{{ item.icon }}</v-icon
          >
        </v-btn>
      </v-col>
    </v-col>
  </section>
</template>

<script>
import MenuBuy from "./MenuBuy.vue";
//import axios from "axios";
import ConsultasService from "../../ConsultasService";
console.log("Buy")

export default {
  name: "Buy",
  components: { MenuBuy },
  data() {
    return {
      collectionDetail: [],
      Collections: [],
      ONE_NEAR: 1000000000000000000000000,
      url_data: this.$route.params.id,
      dataBuy: [
        {
          minted: "8796",
          owners: "1987",
          floor: "20",
          daily: "$8,976",
        },
      ],
      dataFilter: [
        {
          title: "LOWEST PRICE",
          selection: ["foo", "bar", "fizz", "buzz"],
        },
        {
          title: "ATTRIBUTE",
          selection: ["foo", "bar", "fizz", "buzz"],
        },
      ],
      buyTable: 0,
      dataBuyTable: [
        {
          img: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [{ name: "xdn" }, { name: "doge" }],
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [{ name: "xdn" }, { name: "doge" }, { name: "auto" }],
        },
        {
          img: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: "xdn" },
            { name: "doge" },
            { name: "dlt" },
            { name: "auto" },
          ],
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [{ name: "doge" }, { name: "auto" }],
        },
        {
          img: require("@/assets/nft/monkeyA3.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [{ name: "doge" }, { name: "dlt" }, { name: "auto" }],
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [
            { name: "xdn" },
            { name: "doge" },
            { name: "dlt" },
            { name: "auto" },
          ],
        },
        {
          img: require("@/assets/nft/monkeyA5.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [{ name: "doge" }, { name: "dlt" }, { name: "auto" }],
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [{ name: "xdn" }, { name: "auto" }],
        },
        {
          img: require("@/assets/nft/monkeyA4.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [{ name: "xdn" }, { name: "dlt" }, { name: "auto" }],
        },
        {
          img: require("@/assets/nft/monkeyA2.png"),
          number: "3711",
          amount: "16",
          select: false,
          market: [{ name: "xdn" }, { name: "doge" }],
        },
      ],
      dataPagination: [
        { icon: "left", active: false },
        { icon: "right", active: false },
      ],
    };
  },
  computed: {
    DataBuyTable() {
      if (window.innerWidth <= 880) {
        return this.dataBuyTable.slice(0, 4);
      } else {
        return this.dataBuyTable.slice(0, 10);
      }
    },
  },
  mounted() {
    //  this.url_data=this.$route.params.id;
    //  this.url_data.substr(1);
    //  this.url_data = this.url_data.substr(1);
    //   console.log(this.url_data)
  },
  methods: {
    //  getCollections(){
    //   axios.get('https://api-v2-mainnet.paras.id/collections?collection_id='+this.url_data)
    // .then( response => {
    //   console.log("getCollections")
    //   console.log(response.data);
    //   this.collections = response.data.data.results;
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    // },
    // async getCollectionsDetails() {
    //   console.log("here")
    //   await ConsultasService.getCollectionsDetails("asac.near")
    //     .then((response) => {
    //       console.log(response.data);
    //       this.collections = response.data.data
    //       alert(response.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     }); .
    // },

      async getCollecionsDetails(){
        console.log(this.$route.params.id)
      const response = await ConsultasService.getCollectionsDetails(this.$route.params.id)
      console.log("Detalles de colección")
      console.log(response.data.data.results[0])
      this.collectionDetail = response.data.data.results[0]
     
    },

      async getCollections(){
        console.log(this.$route.params.id)
      const response = await ConsultasService.getCollectionsFromCreator(50,this.$route.params.id)
      console.log("NFTs de Colecciones:")
      console.log(response.data.data.results)
      this.Collections = response.data.data.results;
      console.log((response.data.data.results).length)
     
    },

    // async getColleciones() {
      
    //    await ConsultasService.getMostSelledCollections()
    //     .then( response => {
    //     console.log(response.data);
     
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
        
     
    // },
    //  getMetadata(){
    //   axios.get('https://api-v2-mainnet.paras.id/token?__sort=_id%3A%3A1&__limit=50&collection_id='+this.url_data)

    // .then( response => {
    //   console.log("getNftTokensBySeries");
    //   console.log(response.data.data.results);
    //   this.listcollections = response.data.data.results

    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    // }
    },
    beforeMount() {
     // this.getCollectionsDetails();
      console.log("before")
    },
    created() {
     // this.getCollectionsDetails();
     console.log("created")
     this.getCollections();
     this.getCollecionsDetails();
    },
  
};
</script>

<style src="../pages.scss" lang="scss" />
