<template>
  <v-footer color="transparent" height="100px" absolute>
    <v-row no-gutters class="relative">
      <v-col cols="12" sm="11" class="space align" style="gap:1em">
        <aside class="divrow" style="gap:.5em">
          <a v-for="(item,i) in dataIconos" :key="i" :href="item.link" target="_blank">
            <v-icon size="clamp(1.8em, 2.25vw, 2.25em)">{{ item.icon }}</v-icon>
          </a>
        </aside>
        
        <span class="center divwrap" style="font-weight: bold; gap: 5px">
          <div>
            Powered by <a href="https://near.org" target="_blank"><img src="@/assets/logo/near.svg" alt="near"></a>
          </div>
          <!-- <div>
            &amp; <a href="https://www.dvconsultores.com" target="_blank">GlobalDv</a>
          </div> -->
        </span>

        <aside class="divrow" style="gap: 1em">
          <button v-if="themeButton" class="themeBtn dark" @click="CambiarTheme('dark'), $store.commit('OverlayMethod', 'dark')">
            <div class="switch" />
          </button>
          <button v-else class="themeBtn light" @click="CambiarTheme('light'), $store.commit('OverlayMethod', 'light')">
            <div class="switch" />
          </button>

          <span v-show="!isMobile" class="center" style="font-weight: bold; cursor: pointer">
            <v-icon v-show="themeButton" medium>mdi-weather-night</v-icon>
            <v-icon v-show="!themeButton" medium>mdi-white-balance-sunny</v-icon>
          </span>
        </aside>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      themeButton: true,
      dataIconos: [
        {
          icon: "discord",
          link: "https://discord.com"
        },
        {
          icon: "mdi-twitter",
          link: "https://twitter.com"
        },
        // {
        //   icon: "mdi-youtube",
        //   link: "https://www.youtube.com"
        // },
        // {
        //   icon: "mdi-instagram",
        //   link: "https://www.instagram.com"
        // },
      ]
    }
  },
  created() {
    this.element = document.getElementById("theme");
    const theme = localStorage.getItem("theme");
    if (theme) {this.CambiarTheme(theme); this.$store.commit('OverlayMethod', theme)}
    if (theme == "light") {this.themeButton = true}
    if (theme == "dark") {this.themeButton = false}
  },
  mounted() {
    this.mobile()
    window.addEventListener("resize", this.mobile)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.mobile)
  },
  methods: {
    mobile() {
      if (window.innerWidth <= 880) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    CambiarTheme(theme) {
      this.$store.dispatch("CambiarTheme", { theme, element: this.element });
      this.themeButton = !this.themeButton;
    },
  }
}
</script>

<style src="./layout.scss" lang="scss" />
