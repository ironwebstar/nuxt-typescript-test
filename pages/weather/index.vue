<template>
  <div id="page-weather" class="page page-weather">
    <h1 class="title">
      {{ msg }}
    </h1>
    <div class="row">
      <div class="col-md-4">
        <SearchBox />
      </div>
      <div class="col-md-8">
        <ul class="city-list">
          <li v-for="city in cities" :key="city.id" class="city">
            <card :city="city" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SearchBox from '~/components/SearchBox.vue'
import Card from '~/components/Card.vue'

@Component({
  components: {
    SearchBox,
    Card
  }
})

export default class PageWeather extends Vue {
  // name = 'PageWeather'
  msg = 'Weather Forecast'

  mounted() {
    this.$store.dispatch('setCities')
  }

  get cities() {
    return this.$store.state.cities
  }
}
</script>

<style lang="scss">
  .title {
    text-align: center;
    padding: 3rem;
  }

  .city-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    list-style: none;

    .city {
      display: inline-block;
    }
  }
</style>
