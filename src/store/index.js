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
          state.access_token = access_token
      },
      setRefreshToken(state,refresh_token){
          state.refresh_token = refresh_token
      },
      setUsername(state,username){
          state.username = username
      },
      setUserId(state,user_id){
          state.user_id = user_id
      },
      destroyAccessToken(state){
          state.access_token = null
      },
      destroyRefreshToken(state){
          state.refresh_token = null
      },
      destroyUsername(state){
          state.username = null
      },
      destroyUserId(state){
          state.user_id = null
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
    logout(context){
        return new Promise((resolve,reject) => {
            axios.post('http://backend.iitu.local/api/auth/logout', {}, {headers: { Authorization: "Bearer " + context.getters.access_token }})
                .then((response) => {

                    localStorage.removeItem('access_token')
                    context.commit('destroyAccessToken')

                    localStorage.removeItem('refresh_token')
                    context.commit('destroyRefreshToken')

                    localStorage.removeItem('username')
                    context.commit("destroyUsername")

                    localStorage.removeItem('user_id')
                    context.commit('destroyUserId')
                    resolve(response)

                })
                .catch( (error) => {

                    localStorage.removeItem('access_token')
                    context.commit('destroyAccessToken')

                    localStorage.removeItem('refresh_token')
                    context.commit('destroyRefreshToken')

                    localStorage.removeItem('username')
                    context.commit("destroyUsername")

                    localStorage.removeItem('user_id')
                    context.commit('destroyUserId')
                    reject(error)
                });
        })
    }
  },
})
