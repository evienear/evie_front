<template>
  <section id="stats">
    <span class="titulo">STATS</span>

    <v-col style="gap: 20px">
      <div class="tituloBack h4 colorInverted colorCartasInverted">NFT's ACTIVITIES</div>

      <aside class="divrow" style="place-content: start">
        <v-col v-for="(item, index) in dataFilter" v-bind:key="index"
          cols="6" sm="4" md="3" lg="2" class="center">
          <v-select
            :items="item.selection"
            hide-details="true"
          >
            <template v-slot:label>
              <span class="titleAutocompleteBuy h8 color">{{ item.title }}</span>
            </template>

            <template v-slot:append>
              <v-icon medium class="color">mdi-chevron-down</v-icon>
            </template>
          </v-select>
        </v-col>
      </aside>
    </v-col>
    <Chart ref="chart"></Chart>
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
          title: "CHOOSE MARKETPLACE",
          selection: [
            'foo', 'bar', 'fizz', 'buzz'
          ]
        },
        {
          title: "STATS BY MONTH",
          selection: [
            'foo', 'bar', 'fizz', 'buzz'
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
