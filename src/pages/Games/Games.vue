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
      <v-window-item v-for="(item, i) in dataGame1.groupAtPairs()" :value="i+1" :key="i">
        <button @click="selectedGame1(item[0])">
          <img :src="item[0].img" :alt="`${item[0].name} nft`">
        </button>
      
        <button @click="selectedGame1(item[1])">
          <img :src="item[1].img" :alt="`${item[1].name} nft`">
        </button>
      </v-window-item>
      
      <v-window-item :value="dataGame1.groupAtPairs().length+1" class="container-sumary">
        <div class="grid">
          <img
            v-for="(item, i) in dataGame1.slice(0, 6)" :key="i" :src="item.img" :alt="`${item.name} nft`"
            :class="{selected: item.selected}">
        </div>

        <div class="divcol acenter">
          <h6 class="p bold">You Choose:</h6>
          <ul>
            <li v-for="(item, i) in dataGame1.filter(data => data.selected)" :key="i">{{item.name}}</li>
          </ul>
          
          <v-btn class="mt-5 fill-w" @click="endGame1()">Go back</v-btn>
        </div>

        <div class="grid">
          <img
            v-for="(item, i) in dataGame1.slice(6, 12)" :key="i" :src="item.img" :alt="`${item.name} nft`"
            :class="{selected: item.selected}">
        </div>
      </v-window-item>
    </v-window>



    <!-- game 2 -->
    <v-window v-if="windowGame2" v-model="windowGame2Step">
      <v-window-item v-for="(item, i) in dataGame2.groupAtPairs()" :value="i+1" :key="i">
        <button @click="selectedGame2(item[0])">
          <img :src="item[0].img" :alt="`${item[0].name} nft`">
        </button>
      
        <button @click="selectedGame2(item[1])">
          <img :src="item[1].img" :alt="`${item[1].name} nft`">
        </button>
      </v-window-item>
      
      <v-window-item :value="dataGame2.groupAtPairs().length+1" class="container-sumary">
        <div class="grid">
          <img
            v-for="(item, i) in dataGame2.slice(0, 6)" :key="i" :src="item.img" :alt="`${item.name} nft`"
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
            v-for="(item, i) in dataGame2.slice(6, 12)" :key="i" :src="item.img" :alt="`${item.name} nft`"
            :class="{selected: item.selected}">
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
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
    }
  },
  mounted() {
    // at animation end
    document.getElementById("introduction-game").addEventListener("animationend", () => this.main = true)
  },
  methods: {
    startGame1() {
      this.dataGame1.push(
        { name: "monkey 1", img: require("@/assets/nft/monkey1.png"), selected: false },
        { name: "monkey 2", img: require("@/assets/nft/monkey2.png"), selected: false },
        { name: "monkey 3", img: require("@/assets/nft/monkey3.png"), selected: false },
        { name: "monkey 4", img: require("@/assets/nft/monkey4.png"), selected: false },
        { name: "monkey 5", img: require("@/assets/nft/monkey5.png"), selected: false },
        { name: "monkey 6", img: require("@/assets/nft/monkey1.png"), selected: false },
        { name: "monkey 7", img: require("@/assets/nft/monkey2.png"), selected: false },
        { name: "monkey 8", img: require("@/assets/nft/monkey3.png"), selected: false },
        { name: "monkey 9", img: require("@/assets/nft/monkey4.png"), selected: false },
        { name: "monkey 10", img: require("@/assets/nft/monkey5.png"), selected: false },
        { name: "monkey 11", img: require("@/assets/nft/monkey1.png"), selected: false },
        { name: "monkey 12", img: require("@/assets/nft/monkey2.png"), selected: false },
      )
      this.windowGame1 = true
    },
    selectedGame1(item) {
      this.dataGame1.find(data => data === item).selected = true
      this.windowGame1Step++
    },
    endGame1() {
      this.windowGame1Step = 1
      this.dataGame1 = []
      this.windowGame1 = false
    },
    startGame2() {
      this.dataGame2.push(
        { name: "monkey 1", img: require("@/assets/nft/monkey1.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 2", img: require("@/assets/nft/monkey2.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 3", img: require("@/assets/nft/monkey3.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 4", img: require("@/assets/nft/monkey4.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 5", img: require("@/assets/nft/monkey5.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 6", img: require("@/assets/nft/monkey1.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 7", img: require("@/assets/nft/monkey2.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 8", img: require("@/assets/nft/monkey3.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 9", img: require("@/assets/nft/monkey4.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 10", img: require("@/assets/nft/monkey5.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 11", img: require("@/assets/nft/monkey1.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
        { name: "monkey 12", img: require("@/assets/nft/monkey2.png"), selected: false,
          atributes: {
            background: "black",
            chains: "rope",
            eyes: "zombie",
            fur: "zombie",
            helmets: "drool",
            spacesuits: "pink",
            visors: "clear"
          }
        },
      )
      console.log(this.dataGame2)
      this.windowGame2 = true
    },
    selectedGame2(item) {
      this.dataGame2.find(data => data === item).selected = true
      if (this.windowGame2Step === this.dataGame2.groupAtPairs().length) this.groupRarity()
      this.windowGame2Step++
    },
    groupRarity() {
      for (const item of this.dataGame2) {
        for (const item2 of Object.entries(item.atributes)) {
          console.log(item2.groupBy(item2[0]))
        }
      }

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
      this.windowGame2Step = 1
      this.dataGame2 = []
      this.windowGame2 = false
    }
  },
};
</script>

<style src="./Games.scss" lang="scss"></style>
