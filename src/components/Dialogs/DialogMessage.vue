<template>
  <v-dialog
      id="dialog"
      class="message-dialog"
      v-model="messageDialog"
      max-width="400"
    >
      <section class="menuCollections colorCartas center divcol px-2" style="min-height: 200px; text-align: center">
        <button class="buttonClose center">
          <img class="close" src="@/assets/icons/close.svg" alt="close" @click="messageDialog = false">
        </button>
        
        <h2 class="bold">{{title}}</h2>
        <p class="p">{{desc}}</p>
      </section>
    </v-dialog>
</template>

<script>
export default {
  name: "DialogMessage",
  data() {
    return {
      messageDialog: false,
      title: undefined,
      desc: undefined,
    }
  },
  methods: {
  }
};
</script>

<style src="@/pages/pages.scss" lang="scss"></style>
