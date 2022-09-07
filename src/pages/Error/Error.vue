<template>
  <v-app>
    <v-container fluid class="error-page">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="12" id="containerNotFound">
          <span class="text404">404</span>
          <v-col style="display: flex; justify-content: center; padding-top: 0">
            <span class="textNotFound">Sorry Wrong Page</span>
          </v-col>
          <v-col style="display: flex; justify-content: center">
            <v-btn href="#/" id="buttonNotFound">Homepage</v-btn>
          </v-col>
        </v-col>
      </v-row>
  </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Error',
};
</script>

<style src="./Error.scss" lang="scss"></style>
