import axios from "axios";
export default {
    methods:{
        check(role){
            return new Promise(((resolve, reject) => {
                if (this.$store.getters.access_token !== null){
                axios.get('http://backend.iitu.local/api/user/get',
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    // eslint-disable-next-line no-unused-vars
                    .then((response)=> {
                        if (role === response.data.roles[0].role){
                            resolve(true)
                        }
                        reject(false)
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(false)
                    })
                }else {
                    reject(false)
                }
            }))

        }
    }
}