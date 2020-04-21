import axios from "axios";
import store from "../../store/index"

export default {
    methods:{
        check(role,is_auth = false){
            return new Promise(((resolve, reject) => {
                if (store.getters.access_token !== null){
                axios.get('http://backend.iitu.local/api/user/get',
                    {headers: {Authorization: "Bearer " + store.getters.access_token}})
                    // eslint-disable-next-line no-unused-vars
                    .then((response)=> {
                        //это чисто для того чтобы узнать проверить аутентифицирован ли пользователь
                        if (is_auth) resolve(true)

                        if (role !== null && role === response.data.roles[0].role){
                            console.log([response.data.roles[0]],role)
                            resolve(response.data)
                        }
                        reject(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(false)
                    })
                }else {
                    reject(false)
                }
            }))
        },

    }
}