<template>
  <section class="to-v-app">
    <v-app id="login">
      <v-container class="containerlogin">
        <section>
          <v-row>
            <v-col class="center" style="margin-inline: auto">
              <div class="">
                <!-- <img class="logoLogin center-absolute" src="" alt="logo"> -->
                <h1><span>Login Evie</span></h1>
              </div>
              
            </v-col>
          </v-row>
          
          <v-row >
            <v-col class="col-12 col-md-6 center" style="margin-inline: auto">
              <v-text-field
                v-for="(item, index) in dataLogin"
                v-bind:key="index"
                v-model="item.model"
                :type="item.type"
                class="custome"
                solo
                @keyup.enter="login()"
              >
              <template v-slot:label>
                <span class="h7">{{ item.label }}</span>
              </template>
              </v-text-field>
            </v-col>

          </v-row>
          <v-row>
            <v-col class="center" style="margin-inline: auto">
              <button class="button h9 btn2" @click="login()">
                <span class="h6">Login</span>
              </button>
            </v-col>
          </v-row>
        </section>
      </v-container>
    </v-app>
  </section>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      dataLogin: [
        {
          model: "",
          type: "password",
          label: "Password"
        }
      ],
      passw: 'mila963',
    }
  },
  mounted() {
    // console.log(localStorage.login)
  },
  methods: {
    login() {
      const clave = this.dataLogin[0].model;
      localStorage.login = 'true'
      if (clave === this.passw) {
        this.$router.push('/')
      }
    },
  }
}
</script>

<style src="./Login.scss" lang="scss"></style>
