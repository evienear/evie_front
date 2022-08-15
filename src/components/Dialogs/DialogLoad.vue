<template>
  <v-dialog
      id="dialog"
      v-model="$store.state.load"
      max-width="200"
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <span>Loading</span>
        </v-col>
        <v-col cols="12" class="center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </section>
    </v-dialog>
</template>

<script>
export default {
  name: "DialogLoad",
  data() {
    return {
      
    }
  },
  methods: {
  }
};
</script>

<style src="@/pages/pages.scss" lang="scss"></style>
