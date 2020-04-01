import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      access_token:localStorage.getItem('access_token')||null,
      refresh_token:localStorage.getItem('refresh_token')||null,
  },
  mutations: {
      retrieveToken(state,access_token){
          this.state.access_token = access_token
      },
      logged_in(state,status){
          this.state.logged_in = status
      }
  },
  getters:{
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
    },
    logged_in(context,data){
        return new Promise((resolve, reject) => {
            axios.post('http://backend.iitu.local/api/auth/validate-token', {}, {headers: { Authorization: "Bearer " + data.token }})
                .then(function (response) {
                    const status = response.status
                    if (status === 200) {
                        localStorage.setItem('logged_in','true')
                        context.commit('logged_in','true')
                    }else{
                        localStorage.setItem('logged_in','false')
                        context.commit('logged_in','false')
                    }
                    resolve(response)
                })
                .catch(function (error) {
                    localStorage.setItem('logged_in','false')
                    context.commit('logged_in','false')
                    reject(error)
                });
        })
    }
  },
})
