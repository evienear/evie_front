<template>
  <v-dialog
      id="dialogo"
      v-model="$store.state.dialogMessage"
      max-width="400"
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <span>
            {{ $store.state.titleDM }}
          </span>
        </v-col>
        <v-col cols="12" class="center">
          <span>
            {{ $store.state.messageDM }}
          </span>
        </v-col>
        <v-col cols="12">
          <button  class="button h9 btn2" @click="this.$store.commit('DialogMessage', false, '', '')">
            CLOSE
          </button>
        </v-col>
      </section>
    </v-dialog>
</template>

<script>
export default {
  name: "DialogLoMessage",
  data() {
    return {
      
    }
  },
  methods: {
  }
};
</script>

<style src="@/pages/pages.scss" lang="scss"></style>
