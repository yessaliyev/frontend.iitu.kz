import axios from "axios";
import store from "../../store/index"

export default {
    methods: {
        /*
        * Принемает на вход role, is_auth[optional]
        * если указан is_auth true то проверяет только
        * аутентификацию пользователя
        * */
        check(role, is_auth = false) {
            return new Promise(((resolve, reject) => {
                if (store.getters.access_token !== null) {
                    axios.get(process.env.VUE_APP_API + 'api/user/get',
                        {headers: {Authorization: "Bearer " + store.getters.access_token}})
                        .then((response) => {
                            if (is_auth) resolve(true)
                            if (role !== null && role === response.data.role.role) {
                                resolve(response.data)
                            }
                            reject(response.data)
                        })
                        .catch((error) => {
                            reject(error)
                        })
                } else {
                    reject(false)
                }
            }))
        },

    }
}