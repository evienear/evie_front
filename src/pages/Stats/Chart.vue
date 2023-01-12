<template>
  <v-col class="container-chart">
    <div class="container-chart--wrapper divcol">
      <aside class="container-chart--header divcol">
        <span>VOLUME</span>
        <span>{{volume_price}} USD</span>
        <span>{{volume_date}}</span>
      </aside>
      
      <VueApexchart
        ref="volumeChart"
        style="width: 100%"
        height="400"
        type="area"
        :options="chartAreaOptions"
        :series="volumeSeries"
      ></VueApexchart>
    </div>

    <div
      class="container-chart--wrapper divcol"
      :style="`--c-primary: ${chartBarOptions.colors[0]}; --c-secondary: ${chartBarOptions.colors[1]}`"
    >
      <aside class="container-chart--header acenter" style="display: flex; gap: 30px">
        <div class="divcol" style="display: flex; max-width: max-content">
          <span>TRANSACTIONS</span>
          <span>{{transactions_price}} TXs</span>
          <span>{{transactions_date}}</span>
        </div>
        
        <!-- <div class="container-chart--header-legend divcol" style="display: flex">
          <span style="color: var(--c-primary)">Primary: {{transactions_price_primary}}</span>
          <span style="color: var(--c-secondary)">Secondary: {{transactions_price_secondary}}</span>
        </div> -->
      </aside>
      
      <VueApexchart
        ref="transactionsChart"
        style="width: 100%"
        height="400"
        type="bar"
        :options="chartBarOptions"
        :series="transactionsSeries"
      ></VueApexchart>
    </div>
  </v-col>
</template>

<script>
import axios from 'axios'
import * as nearAPI from "near-api-js";
const { utils } = nearAPI;

// autogenerate series functioin for style test
// function generateDayWiseTimeSeries(baseval, count, yrange) {
//   let i = 0;
//   const series = [];
//   while (i < count) {
//     const
//       x = baseval,
//       y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

//     series.push([x, y]);
//     baseval += 86400000;
//     i++;
//   }
//   return series;
// }
// autogenerate series functioin for style test

export default {
  name: "Chart",
  props: {
    currentMarketplace: {
      type: String,
      default: "paras"
    },
    volumeFilter: {
      type: Number,
      default: 20
    },
  },
  data() {
    return {
      volume_price: undefined,
      volume_date: undefined,
      transactions_price: undefined,
      // transactions_price_primary: undefined,
      // transactions_price_secondary: undefined,
      transactions_date: undefined,


      volumeSeries: [
        {
          data: []
        }
      ],
      
      transactionsSeries: [
        {
          data: []
        },
        // {
        //   data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        //     min: 10,
        //     max: 60
        //   })
        // }
      ],


      // volume chart options
      chartAreaOptions: {
        defaultLocale: 'en',
        grid: {
          show: false,
        },
        colors: ["#eb92ca", "#28c4dc"],
        chart: {
          toolbar: {
            show: false,
            autoSelected: "zoom",
          },
          events: {
            mouseMove: (event, chartContext, config) => {
              const points = this.volumeData[config.dataPointIndex];
              
              if (points) {
                const
                  price = points[1],
                  dateEpoch = points[0],
                  date = new Date(dateEpoch),
                  day = date.getDate(),
                  month = date.toLocaleString('en-US', { month: 'short' }),
                  year = date.getFullYear();

                this.volume_price = parseFloat(price).toFixed(2)
                this.volume_date = `${month} ${day}, ${year}`
              }
            },
            mouseLeave: () => {
              const
                price = this.volumeData[this.volumeData.length-1][1],
                dateEpoch = this.volumeData[this.volumeData.length-1][0],
                date = new Date(dateEpoch),
                day = date.getDate(),
                month = date.toLocaleString('en-US', { month: 'short' }),
                yer = date.getFullYear();

              this.volume_price = parseFloat(price).toFixed(2)
              this.volume_date = `${month} ${day}, ${yer}`
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
              {
                offset: 0,
                color: "#ebe6b4",
                opacity: 1
              },
              {
                offset: 20,
                color: "#ebbcc4",
                opacity: 0.9
              },
              {
                offset: 60,
                color: "#28c4dc",
                opacity: 0.7
              },
              {
                offset: 100,
                color: "#2291e2",
                opacity: 0.1
              },
            ]
          }
        },
        stroke: {
          curve: 'smooth',
          lineCap: 'butt',
          width: 4.5,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
          colors: ["#2291e2"],
          strokeColors: ['#ebe6b4'],
          strokeWidth: 4,
          hover: {
            size: 8,
          },
        },
        yaxis: {
          labels: {
            show: false,
          }
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              fontSize: "20px",
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          }
        },
      },

      // transactions chart options
      chartBarOptions: {
        defaultLocale: 'en',
        grid: {
          show: false,
        },
        colors: ["#eb92ca", "#28c4dc"],
        chart: {
          stacked: true,
          toolbar: {
            show: false,
            autoSelected: "zoom",
          },
          events: {
            mouseMove: (event, chartContext, config) => {
              const
                primaryPoints = this.transactionsData[config.dataPointIndex];
                // secondaryPoints = this.transactionsSeries[1].data[config.dataPointIndex];
              
              if (primaryPoints) {
                const
                  primaryPrice = primaryPoints[1],
                  // secondaryPrice = secondaryPoints[1],
                  dateEpoch = primaryPoints[0],
                  date = new Date(dateEpoch),
                  day = date.getDate(),
                  month = date.toLocaleString('en-US', { month: 'short' }),
                  year = date.getFullYear();

                this.transactions_price = parseFloat(primaryPrice).toFixed(2)
                // this.transactions_price_primary = primaryPrice.toFixed(2)
                // this.transactions_price_secondary = secondaryPrice.toFixed(2)
                this.transactions_date = `${month} ${day}, ${year}`
              }
            },
            mouseLeave: () => {
              const
                primaryPrice = this.transactionsData[this.transactionsData.length-1][1],
                // secondaryPrice = this.transactionsSeries[1].data[this.transactionsSeries[0].data.length-1][1],
                dateEpoch = this.transactionsData[this.transactionsData.length-1][0],
                date = new Date(dateEpoch),
                day = date.getDate(),
                month = date.toLocaleString('en-US', { month: 'short' }),
                yer = date.getFullYear();

              this.transactions_price = parseFloat(primaryPrice).toFixed(2)
              // this.transactions_price_primary = primaryPrice.toFixed(2)
              // this.transactions_price_secondary = secondaryPrice.toFixed(2)
              this.transactions_date = `${month} ${day}, ${yer}`
            }
          }
        },
        // fill: {
        //   type: "gradient",
        //   gradient: {
        //     type: "vertical",
        //     shadeIntensity: 1,
        //     opacityFrom: 0.7,
        //     opacityTo: 0.9,
        //     colorStops: [
        //       {
        //         offset: 0,
        //         color: "#ebe6b4",
        //         opacity: 1
        //       },
        //       {
        //         offset: 20,
        //         color: "#ebbcc4",
        //         opacity: 0.9
        //       },
        //       {
        //         offset: 60,
        //         color: "#28c4dc",
        //         opacity: 0.8
        //       },
        //       {
        //         offset: 100,
        //         color: "#2291e2",
        //         opacity: 0.8
        //       },
        //     ]
        //   }
        // },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
          colors: ["#2291e2"],
          strokeColors: ['#ebe6b4'],
          strokeWidth: 4,
          hover: {
            size: 8,
          },
        },
        yaxis: {
          labels: {
            show: false,
          }
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              fontSize: "20px",
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          }
        },
      },
    }
  },
  watch: {
    volumeFilter() {
      this.dataChart()
    },
    currentMarketplace(current) {
      console.log(current) // <---- https://apexcharts.com/docs/methods/#updateSeries
      
      this.dataChart()
    }
  },
  mounted() {
    this.dataChart()
  },
  computed: {
    volumeData() {
      return this.volumeSeries[0].data;
    },
    transactionsData() {
      return this.transactionsSeries[0].data;
    },
  },
  methods: {
    dataChart() {
      axios.post('https://evie.pro:3070/api/v1/volumendiario', {
        "market": this.currentMarketplace,
        "days": this.volumeFilter,
      }).then(response => {
        this.volumeSeries[0].data = []
        this.transactionsSeries[0].data = []
        
        for (const item of response.data) {
          const epochDate = Date.parse(new Date(item.fecha))
          
          this.volumeData.push([epochDate, this.nearConversor(item.volumen)])
          this.transactionsData.push([epochDate, item.transacciones])
        }
        
        console.log(this.volumeSeries[0].data, this.volumeSeries[0].data.length)

        // set initial volume
        const
          volumePrice = this.volumeData[this.volumeData.length-1][1],
          volumeDateEpoch = this.volumeData[this.volumeData.length-1][0],
          volumeDate = new Date(volumeDateEpoch),
          volumeDay = volumeDate.getDate(),
          volumeMonth = volumeDate.toLocaleString('en-US', { month: 'short' }),
          volumeYear = volumeDate.getFullYear();

        this.volume_price = parseFloat(volumePrice).toFixed(2)
        this.volume_date = `${volumeMonth} ${volumeDay}, ${volumeYear}`

        // set initial transactions
        const
          transactionsPricePrimary = this.transactionsData[this.transactionsData.length-1][1],
          // transactionsPriceSecondary = this.transactionsData[this.transactionsSeries[0].data.length-1][1],
          transactionsDateEpoch = this.transactionsData[this.transactionsData.length-1][0],
          transactionsDate = new Date(transactionsDateEpoch),
          transactionsDay = transactionsDate.getDate(),
          transactionsMonth = transactionsDate.toLocaleString('en-US', { month: 'short' }),
          transactionsYear = transactionsDate.getFullYear();

        this.transactions_price = parseFloat(transactionsPricePrimary).toFixed(2)
        // this.transactions_price_primary = transactionsPricePrimary.toFixed(2)
        // this.transactions_price_secondary = transactionsPriceSecondary.toFixed(2)
        this.transactions_date = `${transactionsMonth} ${transactionsDay}, ${transactionsYear}`
        
        this.$refs.volumeChart.updateSeries(this.volumeSeries)
        this.$refs.transactionsChart.updateSeries(this.transactionsSeries)
        
        this.updateData(this.volumeFilter)
      }).catch(err => console.error(err))
    },
    updateData(volume) {
      const noExistdate = () => {
        return this.volumeData.length-1 < this.volumeData.length-(1 + this.volumeFilter)
          && this.transactionsData.length-1 < this.transactionsData.length-(1 + this.volumeFilter)
      }
      if (noExistdate()) return;
      
      this.$refs.volumeChart.zoomX(new Date(this.volumeData[this.volumeData.length-(1 + volume)][0]).getTime());
      this.$refs.transactionsChart.zoomX(new Date(this.transactionsData[this.transactionsData.length-(1 + volume)][0]).getTime());
    },
    nearConversor(amount) {
      return Number(parseFloat(utils.format.formatNearAmount(amount)).toFixed(0));
    }
  }
};
</script>

<style src="../pages.scss" lang="scss" />
