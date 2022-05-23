<template>
  <section id="menuHeader">
    <!-- menu collections -->
    <v-dialog
      id="dialogo"
      v-model="dialog"
      max-width="832.49px"
      :overlay-opacity="overlay_opacity"
      :overlay-color="overlay_color"
      activator=".openMenuCollections"
    >
    <section class="colorCartas">
      <div class="end paddtop paddright paddleft">
        <button class="buttonClose center relative">
          <img class="close" :src="`${$store.state.baseURL}themes/${$store.state.theme}/close.png`"
            alt="close" @click="dialog = false"
          >
        </button>
      </div>
      
      <v-col cols="11">
        <v-data-table
          id="tableCollections" 
          :headers="headers"
          :items="filterOf"
          :search="collections"
          item-key="name"
          hide-default-footer
          mobile-breakpoint="-1"
          class="colorCartas"
        >
          <template v-slot:top>
            <v-col class="space" style="padding-top: 0">
              <v-col class="center">
                <v-text-field
                  id="search"
                  v-model="search"
                  append-icon="mdi-magnify"
                  solo
                  hide-details="true"
                  
                >
                  <template v-slot:label>
                    <span class="h8-em" style="font-weight: 600">SEARCH BY COLLECTIONS</span>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="4" class="center">
                <v-select
                  :items="filter"
                  hide-details="true"
                >
                  <template v-slot:label>
                    <span class="h8-em" style="font-weight: 600">ALL TIME VOLUME</span>
                    <span>{{search}}</span>
                  </template>

                  <template v-slot:append>
                    <div id="botonSelection">
                      <v-icon medium class="iconoSelcetion">mdi-chevron-down</v-icon>
                    </div>
                  </template>
                </v-select>
              </v-col>
            </v-col>
          </template>

          <!-- desserts -->
          <template v-slot:[`item.title`]="{ item }" >
            <div class="linea3 lineas" />
          
                <button
            
              class="space marginbottom margintop"
              style="width: 100%; height: 100%"
              @click="SelectNFT(item.metadata.title)"
            >
              <aside class="divrow center" style="gap: 10px">
                <img class="nft" :src="item.metadata.media" alt="token" />
                <span class="h8" style="font-weight: 400"> <a   href="#/collections"> {{ item.metadata.title }}</a></span>
              </aside>
                <span class="h8">
                  <strong> <a   href="#/collections"> series {{ item.token_series_id }}</a></strong>
                </span>
            </button>
            
          
          </template>
        </v-data-table>
        </v-col>
      </section>
    </v-dialog>

    <!-- menu header -->
    <v-menu
      bottom
      transition="scroll-y-transition"
      offset-y
      activator=".openMenuHeader"
    >
      <v-list color="transparent" class="containerMenuHeader">
        <div class="triangulo colorCartas" />
        <section class="cardMenuHeader colorCartas">
          <v-list-item
            class="cardItems"
            v-for="(item, i) in dataMenuHeader"
            :key="i"
            :href="item.link"
          >
          <div v-if="!item.linea" class="linea colorCartasInverted" />
            <v-list-item-title>
              <aside class="divrow space" v-if="item.logout">
                <div class="divrow center" style="gap: 10px" v-on:click="logout" >
                  <v-icon large>{{ item.icon }}</v-icon>
                   <button class="h8-em" style="font-weight: 600">
                      {{ item.title }}
                   </button>
                </div>
                <v-icon medium>mdi-chevron-right</v-icon>
              </aside>
               <aside class="divrow space" v-else>
                <div class="divrow center" style="gap: 10px">
                  <v-icon large>{{ item.icon }}</v-icon>
                  <a :href="item.link" class="h8-em" style="font-weight: 600">
                    {{ item.title }}
                  </a>
                </div>
                <v-icon medium>mdi-chevron-right</v-icon>
              </aside>
            </v-list-item-title>
          </v-list-item>
        </section>
      </v-list>
    </v-menu>
  </section>
</template>

<script>
import {logout } from "../../utils";
import axios from "axios";

export default {
  name: "HeaderMenu",
  i18n: require("./i18n"),
  computed: {
     accountId() {
      console.log(window.accountId)
     // console.log(this.contractBalance)
     
      return window.accountId;
    },
    signedIn() {
      return window.walletConnection.isSignedIn();
    },
    contractBalance(){
      
      
      return window.contractBalance;
    },
    headers() {
      return [
        {
          sortable: false,
          value: "title",
        },
      ];
    },
     filterOf() {
      if (this.search) {
        return this.collections.filter(item => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(v => item.metadata.title.toLowerCase().includes(v));
        });
      } else {
        return this.collections;
      }
    }
  },
  data() {
    return {
      dialog: false,
      overlay_opacity: "0.2",
      overlay_color: "white",
      search: '',
      collections: [],
      filter: [
        'foo', 'bar', 'fizz', 'buzz'
      ],
      dataMenuCollections: [
        {
          nft: require("@/assets/nft/monkey1.png"),
          title: "Antisocial Ape Club",
          price: "1,953,504.15"
        },
        {
          nft: require("@/assets/nft/monkey2.png"),
          title: "NearNauts",
          price: "9960,472.42"
        },
        {
          nft: require("@/assets/nft/monkey3.png"),
          title: "Secret Skellies Society",
          price: "636,861.42"
        },
        {
          nft: require("@/assets/nft/monkey4.png"),
          title: "The MunkyMonkey",
          price: "579,809.53"
        },
        {
          nft: require("@/assets/nft/monkey5.png"),
          title: "Near Kongz",
          price: "481,256.38",
          linea: true
        },
      ],
      dataMenuHeader: [
        {
          icon: "mdi-cart-minus",
          title: "BUY",
          link: "#/buy",
          logout: false
        },
        {
          icon: "mdi-currency-usd",
          title: "SELL",
          link: "#/sell",
          logout: false
        },
        {
          icon: "mdi-chart-timeline-variant",
          title: "STATS",
          link: "#/stats",
          logout: false
        },
        {
          icon: "mdi-book-open-blank-variant",
          title: "EDUCATION",
          link: "#/education",
          logout: false
        },
        {
          icon: "mdi-calendar-month-outline",
          title: "MINT CALENDAR",
          link: "#/mint-calendar",
          logout: false
        },
        {
          icon: "mdi-help",
          title: "FAQ",
          link: "#",
          logout: false
         
        },
         {
          icon: "mdi-logout",
          title: "Log out",
          logout: true,
          linea: true
        },
      ],
    };
  },
  created() {
    const theme = localStorage.getItem("theme");
    this.OverlayMethod(theme);
  },
  methods: {
     getNftGetSeries(){
      axios.post('http://157.230.2.213:3080/api/near/getNftGetSeries', {
      receivedAccount: this.accountId
    })
    .then( response => {
      console.log(response.data);
      this.collections = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    },
    SelectNFT() {
      console.log("funcion")
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
    logout: logout
  },
   beforeMount(){
    this.getNftGetSeries()
  }
};
</script>

<style src="./layout.scss" lang="scss"></style>
