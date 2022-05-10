<template>
  <section id="projectProposal" class="relative">
    <span class="titulo">EDUCATION</span>
    
    <v-col>
      <aside class="divrow divcolmobile" style="gap: 20px">
        <a href="#/nft-projects">
          <button class="botonBack center colorCartasInverted">
            <v-icon medium class="colorInverted">mdi-chevron-left</v-icon>
          </button>
        </a>
        <div class="tituloBack h4 colorInverted colorCartasInverted">PROJECT PROPOSAL</div>
      </aside>

      <aside class="contenedor1 divrow" style="justify-content: start; align-items: center">
        <span class="h9">BUY FROM:</span>
        <aside class="divrow">
          <v-btn v-for="(item, index) in dataMarketplace" v-bind:key="index"
            icon disabled>
            <img class="filter" :src="item.boton" alt="button">
          </v-btn>
        </aside>
        <div class="linea colorCartasInverted" />
      </aside>
    </v-col>

    <v-col v-for="(item, index) in dataProjectProposal" v-bind:key="index"
      class="container2">
      <ul>
        <div />
        <li v-for="(item2, index) in item.lista" v-bind:key="index"
          :class="{doge: item2.doge, auto: item2.auto, dlt: item2.dlt, xdn: item2.xdn}"
        >
          <span>Listen: {{ item2.listen }}</span>
          <span>Floor Price: {{ item2.price }}
            <img class="nearBalanceLogo filter" src="@/assets/logo/near.png" alt="near">
          </span>
          <span>Monthly Volume: $ {{ item2.volume}}</span>
          <span>Total Volumen: $ {{ item2.total }}</span>
        </li>
      </ul>

      <section v-for="(item3, index) in item.description" v-bind:key="index">
        <aside>
          <img :src="item3.nft" alt="nft">
          <div>
            <span class="title">
              {{ item3.name }}
            </span>
            <span>
              Origianl Supply: {{ item3.supply }}
            </span>
            <span>
              Website: {{ item3.website }}
            </span>
            <span>
              Twitter: {{ item3.twitter }}
            </span>
            <span>
              Instagram: {{ item3.instagram }}
            </span>
            <span>
              Discord: {{ item3.discord }}
            </span>
          </div>
        </aside>

        <aside>
          <img :src="item3.img" alt="image">
          <span class="title">ABOUT:</span>
          <span>{{ item3.about }}</span>
        </aside>
      </section>
    </v-col>

    <v-col cols="12" md="6" style="display: flex; place-content: center">
      <a href="#" class="button colorCartasInverted">
        <span class="h9 colorInverted">BUY NOW </span>
        <v-icon small class="colorInverted">mdi-chevron-right</v-icon>
      </a>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "ProjectProposal",
  data() {
    return {
      dataMarketplace: [
        {
          boton: require("@/assets/buttons/xdn.png")
        },
      ],
      dataProjectProposal: [
        {
          lista: [
            {
              listen: "9",
              price: "1068",
              volume: "50,000",
              total: "150,000",
              doge: true,
              auto: false,
              dlt: false,
              xdn: false,
            },
            {
              listen: "9",
              price: "1068",
              volume: "50,000",
              total: "150,000",
              doge: false,
              auto: true,
              dlt: false,
              xdn: false,
            },
            {
              listen: "9",
              price: "1068",
              volume: "50,000",
              total: "150,000",
              doge: false,
              auto: false,
              dlt: true,
              xdn: false,
            },
          ],
          description: [
            {
              nft: require("@/assets/nft/monkeyA2.png"),
              name: "MARA GEN 0",
              supply: "101",
              website: "maranft.art/",
              twitter: "twitter.com/MaraNFT_DAO",
              instagram: "instagram.com/mara_mtp",
              discord: "discord:discord.gg/prT5pxKv",
              about: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt ad quae ipsam qui debitis excepturi explicabo quas dolor, repellat itaque. In mollitia asperiores voluptate placeat ratione. Voluptas ipsum quibusdam quisquam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas ipsum quibusdam quisquam.Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
              img: require("@/assets/image1.png")
            }
          ]
        }
      ]
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
