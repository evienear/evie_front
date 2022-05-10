<template>
  <section id="mintCalendar">
    <span class="titulo">MINT</span>

    <v-col style="gap: 20px">
      <div class="tituloBack h4 colorInverted colorCartasInverted">CALENDAR</div>
    </v-col>

    <v-col class="containerCalendar">
      <Calendar ref="calendar"></Calendar>
      <section class="containerRight relative">
        <span class="titleTop h7-em">REMINDERS</span>
        <div class="contenido">
          <aside v-for="(item, index) in dataReminder" v-bind:key="index"
            class="relative">
            <div class="tag divcol">
              <span>{{ item.desc }}</span>
              <span>{{ item.date }}</span>
            </div>
            <img :src="item.img" alt="image">
          </aside>
        </div>
      </section>
    </v-col>

    <v-col style="display: flex; place-content: center">
      <a href="#/project-proposal" class="button colorCartasInverted">
        <span class="h9 colorInverted">PROJECT PROPOSAL </span>
        <v-icon small class="colorInverted">mdi-chevron-right</v-icon>
      </a>
    </v-col>
  </section>
</template>

<script>
import Calendar from './Calendar.vue'

export default {
  name: "MintCalendar",
  components: {
    Calendar
  },
  data() {
    return {
      dataReminder: [
        {
          img: require("@/assets/image2.png"),
          desc: "Quirkies Originals",
          date: "May 10"
        },
        {
          img: require("@/assets/image3.png"),
          desc: "The Meta Konz",
          date: "May 23"
        },
        {
          img: require("@/assets/image4.png"),
          desc: "Coolman's Universe",
          date: "May 30"
        }
      ]
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
