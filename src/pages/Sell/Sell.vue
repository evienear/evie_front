<template>
  <section id="sell" class="center align">
    <span class="titulo">SELL</span>

    <button class="chooseNftBtn btn" @click="$router.push('/choose-nft')">
      CHOOSE NFT's
      <div class="decoration" />
      <v-icon medium>mdi-chevron-down</v-icon>
    </button>
  </section>
</template>

<script>
export default {
  name: "Sell",
  data() {
    return {
    }
  },
};
</script>

<style src="../pages.scss" lang="scss" />
