<template>
  <section id="education">
    <span class="titulo">EDUCATION</span>

    <v-col class="mainContainer">
      <a v-for="(item, index) in dataEducation" v-bind:key="index"
        :href="item.link"
      >
        <button>
          <span class="h4">{{ item.title }}</span>
        </button>
      </a>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Education",
  data() {
    return {
      dataEducation: [
        {
          title: "MARKETPLACE",
          link: "#/buy"
        },
        {
          title: "NTF PROJECTS",
          link: "#/nft-projects"
        },
        {
          title: "NFT UTILITIES"
        },
        {
          title: "MINT CALENDAR",
          link: "#/mint-calendar"
        }
      ]
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
