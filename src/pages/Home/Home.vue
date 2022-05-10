<template>
  <section id="home" class="center align">
    <span class="titulo">BUY &amp; SELL</span>
    <span class="subTitulo h5">NFT HUB MARKETPLACE AGGREGATOR</span>

    <div class="containerBalance">
      <aside class="containerCartaHero">
        <div class="triangulo2 colorCartasInverted" />
        <div class="cartaHero colorCartasInverted divcol center">
          <span class="h5 colorInverted">TOTAL COST</span>
          <span class="h5 colorInverted"> {{getBalance}}
            <img class="filterInverted" src="@/assets/logo/near.png" alt="near">
          </span>
        </div>
      </aside>

      <aside class="divcol start">
        <span class="h5" style="font-weight: bold">EVIE.NEAR</span>
        <span class="h9 center" style="font-weight: 500">Balance:  {{getBalance}}
          <img class="nearBalanceLogo filter" src="@/assets/logo/near.png" alt="near">
        </span>
      </aside>
    </div>
  </section>
</template>

<script>
const ONE_NEAR = 1000000000000000000000000;
export default {
  name: "Home",
  data() {
    return {
    }
  },
    asyncComputed: {
     getBalance(){
      return window.contractBalance.then(balance => parseFloat(balance.total / ONE_NEAR).toFixed(2))
    },
  },
  // mounted() {
  //   // window.addEventListener('resize', this.getDimensions);
  //   this.responsive();
  // },
  // // unmounted() {
  // //   window.removeEventListener('resize', this.getDimensions)
  // // },
  // methods: {
  //   // getDimensions() {
  //   //   this.responsive();
  //   // },
  //   responsive() {
  //     if (window.innerWidth <= 880) {
  //       this.leftCard = false;
  //       this.centerCard = true;
  //       this.rightCard = false;
  //     } else {
  //       this.leftCard = true;
  //       this.centerCard = true;
  //       this.rightCard = true;
  //     }
  //   }
  // },
};
</script>

<style src="../pages.scss" lang="scss" />
