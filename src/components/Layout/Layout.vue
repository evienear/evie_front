<template>
  <v-app id="layout">
    <Header ref="header" id="navbar" />
    <DialogLoad />
    <DialogMessage />
    <v-main class="content center parent">
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import DialogLoad from '@/components/Dialogs/DialogLoad.vue'
import DialogMessage from '@/components/Dialogs/DialogMessage.vue'
import "./layout.scss";
/*
--Uso del GSAP:

1-npm install gsap

2-
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

3-
mounted() {
  gsap.to(".animation1", {
    scrollTrigger: {
      trigger: ".animation1",
      endTrigger: ".animationSection1",
      start: "bottom 80%",
      end: "top 20%",
      toggleActions: "restart pause reverse"
    },
    x: -400,
    opacity: 0,
    rotate: 80,
    duration: 0.3
  });
}

--uso delvue-animate-onscroll:

1-

npm install vue-animate-onscroll

2-

import VueAnimateOnScroll from 'vue-animate-onscroll'

Vue.use(VueAnimateOnScroll)

3-

class="animStartHero"
v-animate-onscroll.repeat="'animHero'"

4- crear animaciones
*/
export default {
  name: "Layout",
  components: { Footer, Header, DialogLoad, DialogMessage },
  mounted() {
    // if (localStorage.login === 'false' || localStorage.login == undefined) {
    //   this.$router.push('/login')
    // }
  },
}
</script>

<style src="./layout.scss" lang="scss" />
