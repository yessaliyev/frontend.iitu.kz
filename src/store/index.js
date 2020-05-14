import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      access_token:localStorage.getItem('access_token')||null,
      refresh_token:localStorage.getItem('refresh_token')||null,
      user_name:localStorage.getItem('username')||null,
      user_id:localStorage.getItem('user_id')||null,
      user_role:localStorage.getItem('user_role')||null,
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
      setUserRole(state,user_role){
          state.user_role = user_role
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
      refresh_token(state){
          return state.refresh_token
      },
      user_id(state){
          return state.user_id
      },
      user_name(state){
          return state.user_name
      },
      user_role(state){
          return state.user_role
      }

  },
  actions: {
    retrieveUser(context,data){
        return new Promise((resolve, reject) => {
            axios.post(process.env.VUE_APP_API+'api/auth/login', {
                username: data.username,
                password: data.password
            })
                .then(function (response) {
                    const access_token = response.data.access_token
                    const refresh_token = response.data.refresh_token
                    const username = response.data.username
                    const user_id = response.data.user_id
                    const user_role = response.data.role.role

                    localStorage.setItem('access_token',access_token)
                    context.commit('setAccessToken',access_token)

                    localStorage.setItem('refresh_token',refresh_token)
                    context.commit('setRefreshToken',refresh_token)

                    localStorage.setItem('username',username)
                    context.commit("setUsername",username)

                    localStorage.setItem('user_id',user_id)
                    context.commit('setUserId',user_id)

                    localStorage.setItem('user_role',user_role)
                    context.commit('setUserRole',user_role)

                    resolve(response)
                })
                .catch(function (error) {
                    // console.log(error)
                    reject(error)
                });
        })
    },
    logout(context){
        return new Promise((resolve,reject) => {
            axios.post(process.env.VUE_APP_API+'api/auth/logout', {}, {headers: { Authorization: "Bearer " + context.getters.access_token }})
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
