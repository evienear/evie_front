<template>
  <section id="mintCalendar">
    <v-col class="divrow paddlateralmobile" style="gap: clamp(0.2em, 2.2vw, 1.25em)">
        <button class="botonBack center vermobile" @click="$router.push('/')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
      <h1 class="tituloBack p">CALENDAR</h1>
    </v-col>

    <v-col class="containerCalendar divcolmobile paddlateralmobile">
      <Calendar ref="calendar"></Calendar>
      <section class="containerRight relative">
        <h3 class="titleTop p">REMINDERS</h3>
        <div class="contenido">
          <aside v-for="(item,i) in dataReminder" :key="i" class="relative">
            <div class="tag btn2 divcol">
              <span class="light">{{ item.desc }}</span>
              <span class="bold">{{ item.date }}</span>
            </div>
            <img :src="item.img" alt="image">
          </aside>
        </div>
      </section>
    </v-col>
  </section>
</template>

<script>
import Calendar from './Calendar.vue'

export default {
  name: "MintCalendar",
  components: { Calendar },
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
