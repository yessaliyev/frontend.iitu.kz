import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      access_token:localStorage.getItem('access_token')||null,
      refresh_token:localStorage.getItem('refresh_token')||null,
      username:localStorage.getItem('username')||null,
      user_id:localStorage.getItem('user_id')||null,
  },

  mutations: {
      setAccessToken(state,access_token){
          this.state.access_token = access_token
      },
      setRefreshToken(state,refresh_token){
          this.state.refresh_token = refresh_token
      },
      setUsername(state,username){
          this.state.username = username
      },
      setUserId(state,user_id){
          this.state.user_id = user_id
      },

  },
  getters:{
      access_token(state){
          return state.access_token
      },

  },
  actions: {
    retrieveUser(context,data){
        return new Promise((resolve, reject) => {
            axios.post('http://backend.iitu.local/api/auth/login', {
                username: data.username,
                password: data.password
            })
                .then(function (response) {
                    const access_token = response.data.access_token
                    const refresh_token = response.data.refresh_token
                    const username = response.data.username
                    const user_id = response.data.user_id

                    localStorage.setItem('access_token',access_token)
                    context.commit('setAccessToken',access_token)

                    localStorage.setItem('refresh_token',refresh_token)
                    context.commit('setRefreshToken',refresh_token)

                    localStorage.setItem('username',username)
                    context.commit("setUsername",username)

                    localStorage.setItem('user_id',user_id)
                    context.commit('setUserId',user_id)

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
