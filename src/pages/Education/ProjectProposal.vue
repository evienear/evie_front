<template>
  <section id="projectProposal" class="relative">
    <v-col class="padd">
      <aside class="divrow" style="gap: clamp(0.2em, 2.2vw, 1.25em)">
        <button class="botonBack center" @click="$router.push('/nft-projects')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h1 class="tituloBack p">PROJECT PROPOSAL</h1>
      </aside>

      <aside class="contenedor1 start">
        <span class="h9-em">BUY FROM:</span>
        <aside class="divrow">
          <v-btn v-for="(item,i) in dataMarketplace" :key="i" icon disabled>
            <img :src="item.market" alt="button">
          </v-btn>
        </aside>
      </aside>
    </v-col>

    <v-col class="container2">
      <ul>
        <li v-for="(item,i) in dataProjectProposal.lista" :key="i">
          <img class="marker" :src="require(`@/assets/buttons/${item.market}.svg`)" alt="marker list">

          <span>Listen: {{ item.listen }}</span>
          <span>Floor Price: {{ item.price }}
            <img class="nearBalanceLogo filter" src="@/assets/logo/near.svg" alt="near">
          </span>
          <span>Monthly Volume: $ {{ item.volume}}</span>
          <span>Total Volumen: $ {{ item.total }}</span>
        </li>
      </ul>

      <section class="contRight">
        <aside>
          <img class="images" :src="dataProjectProposal.description.nft" alt="nft">
          <div>
            <h3 class="Title">{{ dataProjectProposal.description.name }}</h3>
            <span><strong>Origianl Supply: </strong>{{ dataProjectProposal.description.supply }}</span>
            <span><strong>Website: </strong>{{ dataProjectProposal.description.website }}</span>
            <span><strong>Twitter: </strong>{{ dataProjectProposal.description.twitter }}</span>
            <span><strong>Instagram: </strong>{{ dataProjectProposal.description.instagram }}</span>
            <span><strong>Discord: </strong>{{ dataProjectProposal.description.discord }}</span>
          </div>
        </aside>

        <aside>
          <img v-if="dataProjectProposal.description.img" :src="dataProjectProposal.description.img"
            alt="image">
          <h3 class="Title">ABOUT:</h3>
          <span>{{ dataProjectProposal.description.about }}</span>
        </aside>
      </section>
    </v-col>

    <v-col cols="12" md="6" class="center">
      <button class="button h9 btn2">
        BUY NOW<v-icon medium>mdi-chevron-right</v-icon>
      </button>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "ProjectProposal",
  data() {
    return {
      dataMarketplace: [
        { market: require("@/assets/buttons/xdn.svg") },
        { market: require("@/assets/buttons/dlt.svg") },
      ],
      dataProjectProposal: {
        lista: [
          {
            listen: "9",
            price: "1068",
            volume: "50,000",
            total: "150,000",
            market: "doge"
          },
          {
            listen: "9",
            price: "1068",
            volume: "50,000",
            total: "150,000",
            market: "auto"
          },
          {
            listen: "9",
            price: "1068",
            volume: "50,000",
            total: "150,000",
            market: "dlt"
          },
        ],
        description: {
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
      }
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
