<template>
  <section class="containerLeft">
    <aside class="controls">
      <button class="boton btn2 center" @click="$refs.calendar.prev()">
        <v-icon large class="i1">mdi-chevron-left</v-icon>
      </button>
      <span v-if="$refs.calendar" style="text-transform:capitalize">{{ $refs.calendar.title }}</span>
      <span v-else style="text-transform:capitalize">select date</span>
      <button class="boton btn2 center" @click="$refs.calendar.next()">
        <v-icon large class="i2">mdi-chevron-right</v-icon>
      </button>
    </aside>

    <v-calendar
      ref="calendar"
      v-model="value"
      :weekdays="weekday"
      :type="type"
      :events="events"
      :event-overlap-mode="mode"
      :event-overlap-threshold="30"
      :event-color="getEventColor"
      @change="getEvents"
      hide-header
    >
      <template v-slot:day="{ day, month, year }">
        <v-tooltip top v-if="isAdmin==='true'">
          <template v-slot:activator="{ on }">
            <div v-on="on" class="contNft images" :style="`background-color: ${img?'#FDFFB1':'transparent'}`" title="Click to add events" @click="addEvent(day, month, year), getEvent(day, month, year)"></div>
          </template>
          <span>Click to add events</span>
        </v-tooltip>
        <div v-else class="contNft images" :style="`background-color: ${img?'#FDFFB1':'transparent'}`" title="Click to add events"></div>   
      </template>

      <!-- idont know how to dynamic for now -->
      <template v-slot:event="{ day, event }">
        <v-tooltip top v-if="isAdmin==='true'">
          <template v-slot:activator="{ on }">
            <div v-on="on" class="flex-grow overflow-y-auto overflow-x-auto" @dblclick="addEvent(day.day, day.month, day.year)">
              <aside v-for="item, i in event.events" :key="i" style="height: 2px">
                <span class="textEvent" >
                  {{ item.titulo.substr(0,9) }}
                </span>
                <img class="nftEvent" :src="item.imagen" alt="NFT" @click="getEvent(day.day, day.month, day.year)">
              </aside>
            </div>
          </template>
          <span>Click to see the events of the day</span> <br>
          <span>Double click to add events</span>
        </v-tooltip> 
        <v-tooltip top v-else>
          <template v-slot:activator="{ on }">
            <div v-on="on" class="flex-grow overflow-y-auto overflow-x-auto">
              <aside v-for="item, i in event.events" :key="i" style="height: 2px">
                <span class="textEvent" >
                  {{ item.titulo.substr(0,9) }}
                </span>
                <img class="nftEvent" :src="item.imagen" alt="NFT" @click="getEvent(day.day, day.month, day.year)">
              </aside>
            </div>
          </template>
          <span>Click to see the events of the day</span>
        </v-tooltip> 
      </template>
    </v-calendar>

    <!-- <v-col class="end paddlateral">
      <button class="button h9 btn2" @click="$router.push('/project-proposal')">
        PROJECT PROPOSAL<v-icon medium>mdi-chevron-right</v-icon>
      </button>
    </v-col> -->
    <!-- <v-col class="end paddlateral">
      <button class="button h9 btn2" @click="addEvent()">
        ADD EVENT<v-icon medium>mdi-chevron-right</v-icon>
      </button>
    </v-col> -->
    <v-dialog
      id="dialogo"
      v-model="dialog"
      max-width="600"
    >
      <section class="menuCollections colorCartas">
        <button class="buttonClose center">
          <img class="close" src="@/assets/icons/close.svg" alt="close" @click="dialog = false">
        </button>
        <v-col cols="12" class="center pa-0 ma-0">
          <h5>
            <span class="font-weight-medium">
              Add event
            </span>
          </h5>
        </v-col>
        <!-- <v-col cols="12" class="center">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                v-bind="attrs"
                v-on="on"
                class="custome"
                solo dense
              >
                <template v-slot:prepend>
                  <label>Date</label>
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="change()"
            ></v-date-picker>
          </v-menu>
        </v-col> -->
        <v-col cols="12" class="divcol py-0" style="gap: 10px">
          <label>Title</label>
          <v-text-field
            v-model="calendario.title"
            class="custome"
            solo dense
            :rules="rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="divcol py-0" style="gap: 10px">
          <label style="min-width: max-content">Name of NFT</label>
          <v-text-field
            v-model="calendario.name_nft"
            class="custome"
            solo dense
            :rules="rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="divcol py-0" style="gap: 10px">
          <label style="min-width: max-content">Twitter Link</label>
          <v-text-field
            v-model="calendario.twitter_link"
            class="custome"
            solo dense
            :rules="rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="divcol py-0" style="gap: 10px">
          <label>Upload Event Image</label>
          <v-file-input
            v-model="calendario.images"
            class="custome"
            solo dense
            prepend-icon=""
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <button  class="button h9 btn2" @click="addEventPost()">
            SAVE
          </button>
          <button  class="button h9 btn2" @click="dialog = false">
            CLOSE
          </button>
        </v-col>
      </section>
    </v-dialog>
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
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: "Calendar",
  data() {
    return {
      img: true,
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      dialog: false,
      calendario: [],
      menu1: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      dialogMessage: false,
      titleDM: '',
      messageDM: '',
      day: null,
      month: null,
      year: null,
      isAdmin: localStorage.isAdmin,
      rules: undefined
    }
  },
  mounted() {
    this.getEvent()
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    change () {
      this.menu1 = false
    },
    getEvents ({start, end }) {
      this.$store.commit('Load', true)
      this.events = []
      axios.post('https://evie.pro:3070/api/v1/ListEventDays', {
        "mes": start.month,
        "ano": end.year
      }).then(response => {
        console.log(response.data, 'eventos del mes')
        response.data.forEach(item => {
          var dia = item.dia.toString()
          var mes = item.mes.toString()
          if(dia.length < 2) {
            dia = 0 + dia
          }
          if(mes.length < 2) {
            mes = 0 + mes
          }
          var fecha = item.ano + '-' + mes + '-' + dia
          this.events.push({
            start: fecha,
            events:item.eventos
          })
        });
        this.$store.commit('Load', false)
      }).catch(err => {
        console.log(err)
      })
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    addEvent(day, month, year) {
      console.log(day, month, year)
      this.day = day
      this.month = month
      this.year = year
      this.dialog = true
    },
    addEventPost() {
      this.$store.commit('Load', true)
      // const [year, month, day] = this.date.split('-')
      const formData = new FormData()
      formData.append('dia', parseInt(this.day))
      formData.append('mes', parseInt(this.month))
      formData.append('ano', parseInt(this.year))
      formData.append('titulo', this.calendario.title)
      formData.append('name_nft', this.calendario.name_nft)
      formData.append('twitter_link', this.calendario.twitter_link)
      formData.append('uploaded_img', this.calendario.images)
      formData.append('user', localStorage.walletAccountId)
      formData.append('pass', localStorage.pass)
      console.log(formData)
      axios.post('https://evie.pro:3070/api/v1/saveevent', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        console.log(response.data)
        this.$store.commit('Load', false)
        this.dialog = false
        this.dialogMessage = true,
        this.titleDM = 'Successful'
        this.messageDM = 'The data was saved successfully'
        // this.getEvents()
        setTimeout(() => this.$router.go(0), 3000)
      }).catch(err => {
        console.log(err)
      })
    },
    getEvent(day, month, year) {
      axios.post('https://evie.pro:3070/api/v1/desceventday', {
        "dia": day,
        "mes": month,
        "ano": year
      }).then(response => {
        // console.log(response)
        var data = response.data
        this.$emit('eventos_dia', data)
      }).catch(err => {
        console.log(err)
      })
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />

