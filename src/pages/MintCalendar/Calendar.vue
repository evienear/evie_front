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
      <template v-slot:day>
        <div class="contNft images" :style="`background-color: ${img?'#FDFFB1':'transparent'}`" @click="addEvent(weekday)"></div>
      </template>

      <!-- idont know how to dynamic for now -->
      <template v-slot:event>
        <span class="textEvent">event name</span>
        <img class="nftEvent" src="@/assets/nft/monkeyA3.png" alt="NFT">
      </template>
    </v-calendar>

    <!-- <v-col class="end paddlateral">
      <button class="button h9 btn2" @click="$router.push('/project-proposal')">
        PROJECT PROPOSAL<v-icon medium>mdi-chevron-right</v-icon>
      </button>
    </v-col> -->
    <v-dialog
      id="dialogo"
      v-model="dialog"
      max-width="600"
    >
      <section class="menuCollections colorCartas">
        <v-col cols="12" class="center pa-0 ma-0">
          <h5>
            <span class="font-weight-medium">
              Add event
            </span>
          </h5>
        </v-col>
        <v-col cols="12" class="center">
          <v-text-field
            v-model="calendario.title"
            class="custome"
            solo dense
            :rules="rules"
          >
            <template v-slot:prepend>
              <label>TITLE</label>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" class="center">
          <v-file-input
            v-model="calendario.images"
            class="custome"
            prepend-icon=""
            solo
          >
            <template v-slot:prepend>
              <span>UPLOAD</span>
            </template>
          </v-file-input>
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
      events: [
        {
          name: 'Event 1',
          start: '2022-06-11',
          timed: false,
          // img: require('@/assets/nft/monkeyA3.png'),
        },
        {
          name: 'Event 2',
          start: '2022-06-01',
          timed: false,
          // img: require('@/assets/nft/monkeyA3.png'),
        },
      ],
      dialog: false,
      calendario: [],
    }
  },
  methods: {
    getEvents ( start, end ) {
      console.log('eventos')
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    addEvent(day) {
      console.log(day)
      this.dialog = true
    },
    addEventPost() {
      const formData = new FormData(this.$refs.formImgPinata)
      formData.append('dia', 'Chris');
      formData.append('mes', 'Chris');
      formData.append('ano', 'Chris');
      formData.append('titulo', this.calendario.title);
      formData.append('uploaded_img', this.calendario.images.files[0]);
      formData.append('user', localStorage.walletAccountId);
      formData.append('pass', localStorage.pass);

      axios.post('https://evie.pro:3070/api/v1/saveevent', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    updateEvent() {
      axios.post('https://evie.pro:3070/api/v1/saveevent').then(response => {
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    deleteEvent() {
      axios.post('https://evie.pro:3070/api/v1/saveevent').then(response => {
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
    },
  }
};
</script>

<style src="../pages.scss" lang="scss" />
