<template>
  <section id="mintCalendar">
    <v-col class="divrow paddlateralmobile" style="gap: clamp(0.2em, 2.2vw, 1.25em)">
        <button class="botonBack center vermobile" @click="$router.push('/')">
          <img :src="`${$store.state.baseURL}themes/${$store.state.theme}/back.svg`" alt="back icon">
        </button>
      <h1 class="tituloBack p">CALENDAR</h1>
    </v-col>

    <v-col class="containerCalendar divcolmobile paddlateralmobile">
      <Calendar ref="calendar" v-on:eventos_dia="eventosDias"></Calendar>
      <section class="containerRight relative">
        <!-- <h3 class="titleTop p">REMINDERS</h3> -->
        <h3 class="titleTop p">Events of the day</h3>
        <div class="contenido">
          <aside v-for="(item,i) in dataReminder" :key="i" class="relative menuReminders" v-show="dataReminder.length">

            <v-img :src="item.img" alt="image">
              <div class="tag btn2 divcol">
                <span class="light">{{ item.desc }}</span>
                <span class="bold">{{ item.date }}</span>
              </div>
              <button class="buttonDel float-end" @click="openDialogDelete(item.id)">
                <!-- <img class="close" src="@/assets/icons/close.svg" alt="close" @click="dialog = false"> -->
                <span><v-icon class="close" style="margin: -15px">delete</v-icon></span>
              </button>
            </v-img>
          </aside>
          <aside v-show="!dataReminder.length" class="center">
            <span>
              No data
            </span>
          </aside>
        </div>
      </section>
    </v-col>
    <v-dialog
      id="dialogo"
      v-model="dialogMessage"
      max-width="400"
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <h5>
            <span>
              {{ titleDM }}
            </span>
          </h5>
        </v-col>
        <v-col cols="12" class="center">
          <span>
            {{ messageDM }}
          </span>
        </v-col>
        <v-col cols="12">
          <button  class="button h9 btn2" @click="dialogMessage = false">
            CLOSE
          </button>
        </v-col>
      </section>
    </v-dialog>
    <v-dialog
      id="dialogo"
      v-model="dialogDelete"
      max-width="400"
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <h5>
            <span>
              Are you sure?
            </span>
          </h5>
        </v-col>
        <v-col cols="12" class="center">
          <span>
            Are you sure you want to delete this event?
          </span>
        </v-col>
        <v-col cols="12">
          <button  class="button h9 btn2" @click="deleteEvent()">
            YES
          </button>
          <button  class="button h9 btn2" @click="dialogDelete = false">
            CLOSE
          </button>
        </v-col>
      </section>
    </v-dialog>
  </section>
</template>

<script>
import axios from 'axios'
import Calendar from './Calendar.vue'
export default {
  name: "MintCalendar",
  components: { Calendar },
  data() {
    return {
      dialogDelete: false,
      dialogMessage: false,
      titleDM: '',
      messageDM: '',
      dataReminder: [
        // {
        //   img: require("@/assets/image2.png"),
        //   desc: "Quirkies Originals",
        //   date: "May 10"
        // },
        // {
        //   img: require("@/assets/image3.png"),
        //   desc: "The Meta Konz",
        //   date: "May 23"
        // },
        // {
        //   img: require("@/assets/image4.png"),
        //   desc: "Coolman's Universe",
        //   date: "May 30"
        // }
      ]
    }
  },
  methods: {
    eventosDias(data) {
      this.dataReminder = []
      // console.log(data, 'en el padre')
      data.forEach(item => {
        this.dataReminder.push({
          id:item.id,
          img: item.imagen,
          desc: item.titulo,
          date: item.fecha
        },)
      });
    },
    openDialogDelete (id) {
      localStorage.deleteIdEvent = id
      this.dialogDelete = true
    },
    deleteEvent() {
      this.dialogDelete = false
      axios.post('https://evie.pro:3070/api/v1/deleteevent', {
        "id": localStorage.deleteIdEvent,
        "user": localStorage.walletAccountId,
        "pass": localStorage.pass
      }).then(response => {
        this.dialogMessage = true
        this.titleDM = 'Successful'
        this.messageDM = 'The event has been deleted successfully'
        localStorage.removeItem('deleteIdEvent')
        console.log(response)
        setTimeout(() => this.$router.go(0), 3000)
      }).catch(err => {
        console.log(err)
      })
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
