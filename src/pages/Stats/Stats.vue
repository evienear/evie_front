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
