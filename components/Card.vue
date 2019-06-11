<template>
  <div class="card">
    <h2 class="city-name">
      {{ city.name }}
    </h2>
    <span class="weather-summary">{{ weather.summary }}</span>
    <img :src="getImageUrl" alt="weather" class="weather-icon">
    <span class="temperature">{{ weather.temperature }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
  props: [
    'city'
  ],
  data () {
    return {
      weather: {
        summary: '',
        icon: '',
        temperature: ''
      }
    }
  },

  computed: {
    getImageUrl(): string {
      return `/weather-icons/svg/${this.weather.icon}.svg`
    }
  },
  created () {
    this.getWeather()
  },
  methods: {
    getWeather () {
      let weather =
      Axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d386ebd12a182116dc3d25b074bfbcf4/${this.city.lat},${this.city.lng}`)
        .then((res) => {
          this.weather = res.data.currently
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }
})
</script>

<style lang="scss">
  .card {
    width: 300px;
    height: 400px;
    text-align: center;
    padding: 3rem 2rem;

    display: grid;

    .city-name {
      text-transform: uppercase;
    }

    .weather-summary {
      color: skyblue;
    }

    .weather-icon {
      width: fit-content;
      margin: auto;
    }

    .temperature::after {
      content: " ℉"
    }
  }
</style>
