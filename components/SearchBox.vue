<template>
  <div class="search-box">
    <input
      id="search-keyword"
      v-model="keyword"
      @input="onChange"
      class="search-keyword"
      placeholder="Type in your city name"
      type="text"
      name="keyword"
    >
    <ul v-show="isOpen" class="search-results">
      <li
        v-for="(result, index) in searchResults"
        :key="index"
        @click="setResult(result)"
        class="search-result"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import cities from '@/utils/cityList.js'

@Component
export default class SearchBox extends Vue {
  keyword = ''
  searchResults = []
  isOpen = false

  cityList = cities

  onChange(): void {
    const arr = this.cityList.filter(element => element.name.toLowerCase().includes(this.keyword.toLowerCase()))
    this.searchResults = []
    if (arr.length > 0) {
      arr.forEach((ele: object) => {
        this.searchResults.push(ele.name)
      })
    }
    this.isOpen = true
  }

  setResult(result: string) {
    const res = this.cityList.find(element => element.name === result)
    this.keyword = res ? res.name : ''
    if (!localStorage.getItem('cities')) {
      localStorage.setItem('cities', JSON.stringify([res]))
    } else {
      const temp = localStorage.getItem('cities') || ''
      const arr = JSON.parse(temp)
      if (arr.indexOf(res) === -1) {
        arr.push(res)
        localStorage.setItem('cities', JSON.stringify(arr))
      }
    }
    this.isOpen = false
    this.$store.dispatch('setCities')
  }
}
</script>

<style lang="scss" scoped>
  .search-box {
    position: relative;
    width: 100%;

    .search-keyword {
      padding: .8rem 1.2rem;
      width: 100%;
    }

    .search-results {
      padding: 0;
      margin: 0;
      border: 1px solid rgb(196, 181, 181);
      overflow: hidden;
      background-color: white;
      // height: 120px;

      .search-result {
        list-style: none;
        text-align: left;
        padding: 4px 10px;
        cursor: pointer;

        border-bottom: 1px solid rgb(196, 181, 181);
        &:hover {
          background-color: #4AAE9B;
          color: white;
        }
      }
    }
  }
</style>
