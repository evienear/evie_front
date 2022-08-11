<template>
  <v-col class="containerChart divcolmobile">
    <apexchart width="100%" type="line" :options="options" :series="series"></apexchart>
    <apexchart width="100%" type="area" :options="options" :series="series"></apexchart>
  </v-col>
</template>

<script>
export default {
  name: "Chart",
  data() {
    return {
      options: {
        chart: {
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
