<template>
  <section id="education" class="relative">
    <span class="titulo">EDUCATION</span>
    
    <v-col>
      <aside class="divrow divcolmobile" style="gap: 20px">
        <a href="#/education">
          <button class="botonBack center colorCartasInverted">
            <v-icon medium class="colorInverted">mdi-chevron-left</v-icon>
          </button>
        </a>
        <div class="tituloBack h4 colorInverted colorCartasInverted">NFT PROJECTS</div>
      </aside>
    </v-col>

    <div class="divisorNFTProjects" />
    <v-col class="containerNFTProjects">
      <v-card v-for="(item, index) in dataNFTProjects" v-bind:key="index"
        color="transparent"
      >
        <img :src="item.nft" alt="token" />
        <span class="h7">{{ item.title }}</span>
      </v-card>
    </v-col>

    <a href="#/project-proposal" class="button colorCartasInverted">
      <span class="h9 colorInverted">PROJECT PROPOSAL </span>
      <v-icon small class="colorInverted">mdi-chevron-right</v-icon>
    </a>
  </section>
</template>

<script>
export default {
  name: "NFTProjects",
  data() {
    return {
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
  }
};
</script>

<style src="../pages.scss" lang="scss" />
