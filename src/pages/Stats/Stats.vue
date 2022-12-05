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
            @change="selectItem($event, index)"
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
      :currentMarketplace="dataFilter[0].selection"
      :filter="dataFilter[1].selection"
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
      dataFilter: [
        {
          selection: undefined,
          list: [
            'paras', 'apollo'
          ]
        },
        {
          selection: "stats by last week",
          list: [
            'stats by last day',
            'stats by last week',
            'stats by last month',
            'all',
          ]
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    selectItem(event, i) {
      if (i === 1) this.$refs.chart.updateData(event)
    }
  }
};
</script>

<style src="../pages.scss" lang="scss" />
