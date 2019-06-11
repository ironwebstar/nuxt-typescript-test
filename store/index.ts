import Vuex from 'vuex'
import Example from './modules/example'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cities: []
    },
    actions: {
      setCities(context) {
        context.state.cities = JSON.parse(localStorage.getItem('cities'))
      }
    },
    modules: {
      [Example.NAME]: Example
    }
  })
}

export default createStore
