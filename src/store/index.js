import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token:localStorage.getItem('access_token')||null
  },
  mutations: {
      retrieveToken(state,access_token){
          this.state.access_token = access_token
      }
  },
  getters:{
      getToken(state){
          return state.access_token
      }
  },
  actions: {
    retrieveToken(context,data){
      axios.post('http://dl.iitu.local/api/login', {
        username: data.username,
        password: data.password
      })
          .then(function (response) {
            const access_token = response.data.access_token
            localStorage.setItem('access_token',access_token)
            context.commit('retrieveToken',access_token)
          })
          .catch(function (error) {
            console.log(error)
          });

    }
  },
})
