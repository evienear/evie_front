<template>
  <section id="education" class="educationMain">
    <h1 class="titulo">EDUCATION</h1>

    <v-col class="mainContainer padd">
      <button v-for="(item,i) in dataEducation" :key="i" @click="to(item)">
        <img :src="require(`@/assets/buttons/bg-${item.key}.png`)">
        <span>{{ item.title }}</span>
      </button>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Education",
  data() {
    return {
      dataEducation: [
        // { key: "marketplace", title: "MARKETPLACE", to: "/buy-limit" },
        { key: "projects", title: "NTF PROJECTS", to: "/nft-projects" },
        { key: "utilities", title: "NFT UTILITIES", to: "/coming-soon" },
        { key: "calendar", title: "MINT CALENDAR", to: "/mint-calendar" }
      ]
    }
  },
  methods: {
    to(item) {
      this.$router.push(item.to)
      // if (item.key == 'utilities') {
      //   this.$parent.$parent.$parent.$refs.header.dataNavbar.forEach(e=>{e.state='-outline'});
      //   const index = this.$parent.$parent.$parent.$refs.header.dataNavbar.findIndex(e=>e.key=='buy')
      //   this.$parent.$parent.$parent.$refs.header.dataNavbar[index].state='';
      // } else if (item.key == 'calendar') {
      //   this.$parent.$parent.$parent.$refs.header.dataNavbar.forEach(e=>{e.state='-outline'});
      //   const index = this.$parent.$parent.$parent.$refs.header.dataNavbar.findIndex(e=>e.key=='calendar')
      //   this.$parent.$parent.$parent.$refs.header.dataNavbar[index].state='';
      // }
    }
  }
};
</script>

<style src="../pages.scss" lang="scss" />
