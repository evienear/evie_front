<template>
  <v-app>
    <v-container fluid class="error-page">
      <v-row justify="center" align="center">
        <v-col id="containerNotFound">
          <!-- <span class="text404">Coming soon</span> -->
          <v-img src="@/assets/game_logo_3_transparent.png" alt="Game" width="min(100%, 1000px)" />
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

<style scoped>
  @media (min-width: 1400px) {
    .text404 {
      font-size: 10rem !important;
    }
    .textNotFound {
      font-size: 2.8rem !important;
    }
    #buttonNotFound {
      font-size: 1.8rem !important;
      width: 20rem;
      height: 4.75rem;
    }
  }

  @media (max-width: 900px) {
    .text404 {
      font-size: 15rem !important;
    }
    .textNotFound {
      font-size: 3.8rem !important;
    }
    #buttonNotFound {
      font-size: 1.8rem !important;
      width: 20rem;
      height: 4.75rem;
    }
  }
  @media (max-width: 780px) and (min-width: 740px) {
    .text404 {
      font-size: 22rem !important;
    }
    .textNotFound {
      font-size: 4rem !important;
    }
    #buttonNotFound {
      font-size: 2rem !important;
      width: 20rem;
      height: 4.75rem;
    }
  }

  @media (max-width: 470px) {
    .text404 {
      font-size: 13rem !important;
    }
    .textNotFound {
      font-size: 3.58951875rem !important;
    }
    #buttonNotFound {
      font-size: 2rem !important;
    }
    @media (max-width: 400px) {
      .text404 {
        font-size: 10rem !important;
      }
      .textNotFound {
        font-size: 3.08951875rem !important;
      }
    }
  }
</style>
