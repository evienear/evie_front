<template>
  <v-col class="containerChart divcolmobile">
    <apexchart width="100%" type="line" :options="dataDay" :series="series"></apexchart>
    <apexchart width="100%" type="area" :options="options" :series="series"></apexchart>
  </v-col>
</template>

<script>
import axios from 'axios'
export default {
  name: "Chart",
  data() {
    return {
      options: {
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }],
      dataDay: {
        xaxis: {
          categories: []
        }
      },
      dataSerie: [{
        name:'Serie-1',
      }],
    }
  },
  mounted() {
    this.dataChart()
  },
  methods: {
    dataChart() {
      var categoria = []
      axios.post('http://157.230.2.213:3072/api/v1/volumendiario', {
      // axios.post('http://157.230.2.213:3071/api/v1/volumendiario', {
         "limit": "30"
      }).then(response => {
        console.log(response.data)
        
        response.data.forEach(item => {
          categoria.push(item.dia)
        })
        this.dataDay.xaxis.categories = categoria.sort(function(a, b){return a - b})
        console.log(this.dataDay.xaxis.categories)
      }).catch(err => console.log(err))
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
