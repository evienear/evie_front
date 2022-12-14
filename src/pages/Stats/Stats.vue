<template>
  <section id="stats">
    <v-col class="divcol paddlateralmobile" style="gap: clamp(0.2em, 2.2vw, 1.25em)">
      <aside class="divrow" style="gap: clamp(0.2em, 2.2vw, 1.25em)">
        <button class="botonBack center vermobile" @click="$router.push('/')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
        <h3 class="tituloBack p">NFT's ACTIVITIES</h3>
      </aside>

      <aside class="start gap">
        <v-col v-for="(item, index) in dataFilter" v-bind:key="index"
          cols="6" sm="4" md="4" lg="3" class="center padd">
          <v-select
            v-model="item.selection"
            :items="item.list"
            hide-details="true"
            :label="index === 0 ? 'choose marketplace' : ''"
            :menu-props="{ offsetY: true }"
            class="autocompleteBuy"
          >
            <template v-slot:append>
              <v-icon medium class="color">mdi-chevron-down</v-icon>
            </template>
          </v-select>
        </v-col>
      </aside>
    </v-col>

    <Chart
      ref="chart"
      :currentMarketplace="dataMarketplaces[dataFilter[0].selection]"
      :volumeFilter="dataVolumeFilter[dataFilter[1].selection]"
    ></Chart>
  </section>
</template>

<script>
import Chart from './Chart.vue'

export default {
  name: "Stats",
  components: {
    Chart
  },
  data() {
    return {
      dataMarketplaces: {
        all: "%",
        paras: "marketplace.paras.near",
        apollo: "marketplace.paras.near",
        tradeport: "market.tradeport.near",
      },
      dataVolumeFilter: {
        'stats by last week': 7,
        'stats by 20 days ago': 20,
        'stats by last month': 30.4167,
        'stats by 1 year ago': 365,
      },
      dataFilter: [
        {
          selection: "all",
          list: [
            'all', 'paras', 'apollo', 'tradeport'
          ]
        },
        {
          selection: "stats by 20 days ago",
          list: [
            'stats by last week',
            'stats by 20 days ago',
            'stats by last month',
            'stats by 1 year ago',
          ]
        }
      ]
    }
  },
  mounted() {
  },
};
</script>

<style src="../pages.scss" lang="scss" />
