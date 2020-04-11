<template>
    <div>
        <NavBar />
        <div class="block">
            <div class="block-1">
                <Register />
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/navigation/NavBar";
    import Register from "../components/auth/Register";
    import axios from "axios";
    export default {
        name: "Admin",
        components:{NavBar,Register},

        beforeMount() {
            if (this.$store.getters.access_token !== null){
                axios.get('http://backend.iitu.local/api/user/get',
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    .then(response => {
                        if (response.status !== 200 || response.data.roles[0].role !== 'admin'){
                            this.$router.push({name: "Login"})
                        }
                    })
                    .catch( error => {
                        if (error.response.status === 401){
                            this.$router.push({name: "Login"})
                        }
                    })
            }else{
                this.$router.push({name: "Login"})
            }
        }
    }
</script>

<style scoped>
    .block{
        border: 1px solid red;
        display: grid;
        justify-content: space-around;
    }
    .block-1{
        border: 1px solid red;
        place-self: center;
    }
</style>