<template>
  <section id="education" class="nftProjects relative">
    <v-col class="padd">
      <aside class="divrow" style="gap: 20px">
        <button class="botonBack center" @click="$router.push('/education')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h1 class="tituloBack p">NFT PROJECTS</h1>
      </aside>
    </v-col>

    <v-col class="containerNFTProjects padd">
      <v-card v-for="(item,i) in collections" :key="i" color="transparent">
        <img class="images" :src="'https://ipfs.fleek.co/ipfs/'+item.media" alt="token" />
        <span>{{  item.collection }}</span>
      </v-card>
    </v-col>

    <button class="button h9 btn2" @click="$router.push('/project-proposal')">
      PROJECT PROPOSAL<v-icon medium>mdi-chevron-right</v-icon>
    </button>
  </section>
</template>

<script>
import ConsultasService from '../../ConsultasService';

export default {
  name: "NFTProjects",
  data() {
    return {
      collections: [],
      dataNFTProjects: [
        {
          nft: require("@/assets/nft/monkey1.png"),
          title: "Antisocial Ape Club"
        },
        {
          nft: require("@/assets/nft/monkey2.png"),
          title: "NearNauts"
        },
        {
          nft: require("@/assets/nft/monkey3.png"),
          title: "Secret Skellies Society"
        },
        {
          nft: require("@/assets/nft/monkey4.png"),
          title: "The MunkyMonkey"
        },
        {
          nft: require("@/assets/nft/monkey5.png"),
          title: "Near Kongz"
        },
        {
          nft: require("@/assets/nft/monkey1.png"),
          title: "Antisocial Ape Club"
        },
        {
          nft: require("@/assets/nft/monkey2.png"),
          title: "NearNauts"
        },
        {
          nft: require("@/assets/nft/monkey3.png"),
          title: "Secret Skellies Society"
        },
        {
          nft: require("@/assets/nft/monkey4.png"),
          title: "The MunkyMonkey"
        },
        {
          nft: require("@/assets/nft/monkey5.png"),
          title: "Near Kongz"
        },
        {
          nft: require("@/assets/nft/monkey1.png"),
          title: "Antisocial Ape Club"
        },
        {
          nft: require("@/assets/nft/monkey2.png"),
          title: "NearNauts"
        },
        {
          nft: require("@/assets/nft/monkey3.png"),
          title: "Secret Skellies Society"
        },
        {
          nft: require("@/assets/nft/monkey4.png"),
          title: "The MunkyMonkey"
        },
        {
          nft: require("@/assets/nft/monkey5.png"),
          title: "Near Kongz"
        },
        {
          nft: require("@/assets/nft/monkey1.png"),
          title: "Antisocial Ape Club"
        },
        {
          nft: require("@/assets/nft/monkey2.png"),
          title: "NearNauts"
        },
        {
          nft: require("@/assets/nft/monkey3.png"),
          title: "Secret Skellies Society"
        },
        {
          nft: require("@/assets/nft/monkey4.png"),
          title: "The MunkyMonkey"
        },
        {
          nft: require("@/assets/nft/monkey5.png"),
          title: "Near Kongz"
        },
        {
          nft: require("@/assets/nft/monkey1.png"),
          title: "Antisocial Ape Club"
        },
        {
          nft: require("@/assets/nft/monkey2.png"),
          title: "NearNauts"
        },
        {
          nft: require("@/assets/nft/monkey3.png"),
          title: "Secret Skellies Society"
        },
        {
          nft: require("@/assets/nft/monkey4.png"),
          title: "The MunkyMonkey"
        },
        {
          nft: require("@/assets/nft/monkey5.png"),
          title: "Near Kongz"
        },
      ],
    }
  },
  methods: {
     async getCollecions(){
      const response = await ConsultasService.getMostSelledCollections()
      console.log("Con servicio:")
      console.log(response.data.data.results)
      this.collections = response.data.data.results;
    },
  },
   created(){
    console.log("created")
    this.getCollecions()
  }
};
</script>

<style src="../pages.scss" lang="scss" />
