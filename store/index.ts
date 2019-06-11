import Vuex from 'vuex'
import Example from './modules/example'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cities: []
    },
    actions: {
      setCities(context) {
        const temp = localStorage.getItem('cities') || ''
        context.state.cities = JSON.parse(temp)
      }
    },
    modules: {
      [Example.NAME]: Example
    }
  })
}

export default createStore
