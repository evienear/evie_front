<template>
  <div id="games" class="divcol center">
    <!-- main content -->
    <template v-if="!windowGame1 && !windowGame2">
      <img v-if="!main" id="introduction-game" src="@/assets/game_logo_3_transparent.png" alt="Game" />

      <div v-else class="acenter spacea" style="gap: 20px; width: min(100%, 62.5em)">
        <v-card class="divcol" color="transparent" style="gap: 10px">
          <img src="@/assets/nft/monkey1.png" alt="game 1">
          
          <v-btn @click="startGame1()">Game 1</v-btn>
        </v-card>

        <v-card class="divcol" color="transparent" style="gap: 10px">
          <img src="@/assets/nft/monkey2.png" alt="game 2">
          
          <v-btn @click="startGame2()">Game 2</v-btn>
        </v-card>
      </div>
    </template>



    <!-- game 1 -->
    <v-window v-if="windowGame1" v-model="windowGame1Step">
      <v-window-item v-for="(item, i) in dataGame1" :value="i+1" :key="i">
        <button @click="selectedGame1(item[0])">
          <img :src="item[0].icon || item[0].media"
          :alt="`${containLetter(item[0].titulo) ? item[0].titulo : `${item[0].collection}#${item[0].titulo}`} nft`">
        </button>
      
        <button @click="selectedGame1(item[1])">
          <img :src="item[1].icon || item[1].media"
          :alt="`${containLetter(item[1].titulo) ? item[1].titulo : `${item[1].collection}#${item[1].titulo}`} nft`">
        </button>
      </v-window-item>
      
      <v-window-item :value="dataGame1.length+1" class="container-sumary">
        <div class="grid">
          <img
            v-for="(item, i) in dataGame1.slice(0, 3).flat(1)" :key="i" :src="item.icon || item.media"
            :alt="`${containLetter(item.titulo) ? item.titulo : `${item.collection}#${item.titulo}`} nft`"
            :class="{selected: item.selected}">
        </div>

        <div class="divcol acenter">
          <h6 class="p bold">You Choose:</h6>
          <ul>
            <li v-for="(item, i) in dataGame1.flat(1).filter(data => data.selected)" :key="i">
              {{containLetter(item.titulo) ? item.titulo : `${item.collection}#${item.titulo}`}}
            </li>
          </ul>
          
          <v-btn class="mt-5 fill-w" @click="endGame1()">Go back</v-btn>
        </div>

        <div class="grid">
          <img
            v-for="(item, i) in dataGame1.slice(3, 6).flat(1)" :key="i" :src="item.icon || item.media"
            :alt="`${containLetter(item.titulo) ? item.titulo : `${item.collection}#${item.titulo}`} nft`"
            :class="{selected: item.selected}">
        </div>
      </v-window-item>
    </v-window>



    <!-- game 2 -->
    <v-window v-if="windowGame2" v-model="windowGame2Step">
      <v-window-item v-for="(item, i) in dataGame2.groupAtPairs()" :value="i+1" :key="i">
        <button @click="selectedGame2(item[0])">
          <img :src="item[0].icon || item[0].media"
          :alt="`${containLetter(item[0].titulo) ? item[0].titulo : `${item[0].collection}#${item[0].titulo}`} nft`">
        </button>
      
        <button @click="selectedGame2(item[1])">
          <img :src="item[1].icon || item[1].media"
          :alt="`${containLetter(item[1].titulo) ? item[1].titulo : `${item[1].collection}#${item[1].titulo}`} nft`">
        </button>
      </v-window-item>
      
      <v-window-item :value="dataGame2.groupAtPairs().length+1" class="container-sumary">
        <div class="grid">
          <img
            v-for="(item, i) in dataGame2.slice(0, 6).flat(1)" :key="i" :src="item.icon || item.media"
            :alt="`${containLetter(item.titulo) ? item.titulo : `${item.collection}#${item.titulo}`} nft`"
            :class="{selected: item.selected}">
        </div>

        <div class="divcol acenter">
          <h6 class="p bold">Favourites:</h6>
          <ul>
            <li v-for="(item, i) in listGame2" :key="i" style="text-transform: capitalize">
              {{item[0]}} - {{item[1]}} - {{item[2]}}
            </li>
          </ul>
          
          <v-btn class="mt-5 fill-w" @click="endGame2()">Go back</v-btn>
        </div>

        <div class="grid">
          <img
            v-for="(item, i) in dataGame2.slice(6, 12).flat(1)" :key="i" :src="item.icon || item.media"
            :alt="`${containLetter(item.titulo) ? item.titulo : `${item.collection}#${item.titulo}`} nft`"
            :class="{selected: item.selected}">
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'games',
  data() {
    return {
      main: false,
      windowGame1: false,
      windowGame2: false,
      windowGame1Step: 1,
      windowGame2Step: 1,

      dataGame1: [],
      dataGame2: [],
      listGame2: [],

      collection1: [],
      collection2: [],
    }
  },
  mounted() {
    this.getDataCollections()
    
    // at animation end
    document.getElementById("introduction-game").addEventListener("animationend", () => this.main = true)
  },
  methods: {
    async getDataCollections () {
      await axios.post('https://evie.pro:3070/api/v1/SearchCollections', {
        'input': "",
        'limit': 20,
        'index': 0,
        "order": "volumen",
        "type_order": "desc"
      }).then(response => {
        const dataCollections = []
        
        for (const item of response.data) {
          axios.post('https://evie.pro:3070/api/v1/collectiondetails', {'collection': item.nft_contract})
          .then(respData => {
            item.daily_volumen = respData.data[0].daily_volumen
            item.floor_price = respData.data[0].floor_price
            item.minted = respData.data[0].minted
            item.owners = respData.data[0].owners
          }).catch(err => console.error(err))
          
          if(!item.icon) item.icon = require('@/assets/azul-color.png')
          dataCollections.push(item)
        }
        const
          randomMath1 = Math.floor(Math.random() * dataCollections.length) + 1,
          randomMath2 = randomMath1 === Math.floor(Math.random() * dataCollections.length) + 1
          ? Math.floor(Math.random() * dataCollections.length) + 1 : Math.floor(Math.random() * dataCollections.length) + 1,
          collection1 = dataCollections[randomMath1],
          collection2 = dataCollections[randomMath2];

        this.setAtributes(collection1, collection2)
      }).catch(err => {
        console.error(err)
        // this.$store.dispatch('Message', {key: "cancel", desc: err})
      })
    },
    setAtributes(col1, col2) {
      const collections = [col1, col2]
      
      for (let i = 0; i < collections.length; i++) {
        const col = collections[i];
        
        axios.post('https://evie.pro:3070/api/v1/listnft', {
          'collection': col.nft_contract,
          'limit': 50,
          'index': 0,
          'sales': true,
          'order': 'precio',
          'type_order': "desc"
        }).then(response => {
          this.dataAtt = [],
          this.dataAtt2 = []
          this.dataChips = []
          this.dataAttr = []
          this.dataNftTokens = []
          this.dataNftTokens2 = []
          var referenceJson = ''
          
          for (const item of response.data.data) {
            var price = ''
            if(item.precio !== null) {
              price = item.precio_near
            } else {
              price = 0
            }
            if (item.extra !== null && item.extra !== '') {
              if(JSON.parse(item.extra)) {
                item.extra = JSON.parse(item.extra)
                if (item.extra.attributes) item.attributes = item.extra.attributes
                if (item.extra.atributos) item.attributes = item.extra.atributos
              }
            } else if ((item.extra == null || item.extra === '') && (item.reference !== null || item.reference !== 'Pinata')) {
              if(item.base_uri !== null  && !item.reference.includes('https://')) referenceJson = item.base_uri + '/' + item.reference
              if(item.reference.includes('https://')) referenceJson = item.reference
              if (item.base_uri == null) referenceJson = item.reference
              
              axios.get(referenceJson).then(res => item.attributes = res.data.attributes)
              .catch(err => console.error(err))
              
              if(item.media_pinata == null || item.media_pinata === '') {
                item.icon = item.media
              } else {
                item.icon = item.media_pinata
              }
            }
            item.price = parseFloat(price)
            item.selected = false
            if (i === 0) {
              this.collection1.push(item)
            } else {
              this.collection2.push(item)
            }
          }
          
          console.log(this.collection1, this.collection2) // <--
        }).catch(err => console.error(err))
      }
    },
    shuffle(arr, num) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    },
    startGame1() {
      const
        num = 6,
        collection1 = this.shuffle(this.collection1).length === num
        ? this.shuffle(this.collection1, num)
        : this.shuffle(this.collection1, num),
        collection2 = this.shuffle(this.collection2).length === num
        ? this.shuffle(this.collection2, num)
        : this.shuffle(this.collection2, num);
      
      this.dataGame1 = collection1.map((item, i) => [collection1[i], collection2[i]])
      this.windowGame1 = true
    },
    selectedGame1(item) {
      item.selected = true
      this.windowGame1Step++
    },
    endGame1() {
      this.$router.go()
    },
    startGame2() {
      const num = 12
      
      this.dataGame2 = this.shuffle(this.collection1).length === num
      ? this.shuffle(this.collection1, num)
      : this.shuffle(this.collection1, num)
      this.windowGame2 = true
      console.log(this.dataGame2)
    },
    selectedGame2(item) {
      item.selected = true
      if (this.windowGame2Step === this.dataGame2.groupAtPairs().length) this.groupRarity()
      this.windowGame2Step++
    },
    groupRarity() {
      // for (const item of this.dataGame2) {
      //   for (const item2 of Object.entries(item.atributes)) {
      //     console.log(item2.groupBy(item2[0]))
      //   }
      // }

      this.listGame2 = [
        ["background", "black", "70%"],
        ["chains", "rope", "10%"],
        ["eyes", "zombie", "80%"],
        ["fur", "zombie", "20%"],
        ["helmets", "drool", "30%"],
        ["spacesuits", "pink", "40%"],
        ["visors", "clear", "10%"]
      ]
    },
    endGame2() {
      this.$router.go()
    },
    containLetter(str) {
      return /[a-zA-Z]/.test(str);
    }
  },
};
</script>

<style src="./Games.scss" lang="scss"></style>
