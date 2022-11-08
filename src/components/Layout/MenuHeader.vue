<template>
  <section id="menuHeader">
    <!-- menu header mobile -->
    <v-navigation-drawer
      v-model="menuHeaderMobile"
      fixed
      bottom
      clipped
      :overlay-opacity="$store.state.overlay.opacity"
      :overlay-color="$store.state.overlay.color"
      style="max-height: 100vh; z-index: 10"
    >
      <div class="end paddtop paddright paddleft">
        <button class="buttonClose center relative" @click="menuHeaderMobile = false">
          <img class="close" src="@/assets/icons/close.svg" alt="close" @click="dialog = false">
        </button>
      </div>

      <v-list color="transparent" class="containerMenuHeader">
        <section class="cardMenuHeader colorCartas" style="box-shadow: none !important">
          <!-- <v-list-item class="cardItems" v-for="(item, i) in dataMenuHeader" :key="i" :to="item.to"
            @click="dataMenuHeader.forEach(e=>{e.state='-outline'});item.state=''"> -->
          <v-list-item class="cardItems" v-for="(item, i) in dataMenuHeader" :key="i" :to="item.to">
            <v-list-item-title class="space">
              <div class="center" style="gap: 10px">
                <!-- <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/${item.key}${item.state}.svg`" alt="navigation icons"> -->
                <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/${item.key}.svg`" alt="navigation icons">
                <span :href="item.to" style="font-size:1.5rem; font-weight: 600">{{ item.name }}</span>
              </div>
              <v-icon large color="var(--color)">mdi-chevron-right</v-icon>
            </v-list-item-title>
          </v-list-item>
        </section>
      </v-list>

      <v-col class="end gap">
        <button v-if="themeButton" class="themeBtn dark" @click="CambiarTheme('dark'); $store.commit('OverlayMethod', 'dark')">
          <div class="switch" />
        </button>
        <button v-else class="themeBtn light" @click="CambiarTheme('light'); $store.commit('OverlayMethod', 'light')">
          <div class="switch" />
        </button>

        <span class="h8-em h7-emmobile color">{{ themeText }}  MODE</span>
      </v-col>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  name: "HeaderMenu",
  i18n: require("./i18n"),
  data() {
    return {
      menuHeaderMobile: false,
      themeText: "LIGHT",
      themeButton: true,
      dataMenuHeader: [
        {
          key: "buy",
          state: "-outline",
          name: "BUY",
          to: "/"
        },
        {
          key: "buy-limit",
          state: "-outline",
          name: "BUY LIMIT",
          to: "/coming-soon"
        },
        {
          key: "sell",
          state: "-outline",
          name: "SELL",
          to: "/sell"
        },
        {
          key: "stats",
          state: "-outline",
          name: "STATS",
          to: "/coming-soon"
        },
        {
          key: "education",
          state: "-outline",
          name: "EDUCATION",
          to: "/education"
        },
        {
          key: "games",
          state: "-outline",
          name: "GAMES",
          to: "/coming-soon-game"
        },
        {
          key: "calendar",
          state: "-outline",
          name: "MINT CALENDAR",
          to: "/mint-calendar"
        },
        {
          key: "faq",
          state: "-outline",
          name: "FAQ",
          to: "/faq",
        },
      ],
    };
  },
  created() {
    this.element = document.getElementById("theme");
    const theme = localStorage.getItem("theme");
    if (theme) {this.CambiarTheme(theme); this.$store.commit('OverlayMethod', theme)}
    if (theme == "light") {this.themeButton = true}
    if (theme == "dark") {this.themeButton = false}
  },
  mounted() {
    // var root = this.$router.currentRoute.name;
    // if (root=='home') {root='buy'}
    // const index = this.dataMenuHeader.findIndex(e=>e.key==root)
    // this.dataMenuHeader.forEach(e=>{e.state='-outline'});
    // this.dataMenuHeader[index].state=''
  },
  methods: {
    CambiarTheme(theme) {
      this.$store.dispatch("CambiarTheme", { theme, element: this.element });
      this.themeButton = !this.themeButton;
      if (theme == 'light') {this.themeText = 'LIGHT'}
      if (theme == 'dark') {this.themeText = 'DARK'}
    },
  },
};
</script>

<style src="./layout.scss" lang="scss"></style>
