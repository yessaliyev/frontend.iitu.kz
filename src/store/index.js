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

      loggedIn(state){
          if (state.access_token !== null){
              return new Promise((resolve, reject) => {
                  axios.get('http://backend.iitu.local/api/auth/validate-token')
                      // eslint-disable-next-line no-unused-vars
                      .then(function (response) {
                          resolve(response.data)
                      })
                      .catch(function (error) {
                          console.log(error)
                          reject(error)
                      });
              })
          }
        return false
      },

      getToken(state){
          return state.access_token
      }
  },
  actions: {
    retrieveToken(context,data){
        return new Promise((resolve, reject) => {
            axios.post('http://backend.iitu.local/api/auth/login', {
                username: data.username,
                password: data.password
            })
                .then(function (response) {
                    const access_token = response.data.access_token
                    localStorage.setItem('access_token',access_token)
                    context.commit('retrieveToken',access_token)
                    resolve(response)
                })
                .catch(function (error) {
                    console.log(error)
                    reject(error)
                });
        })
    }
  },
})
