<template>
    <div>
        <NavBar />
        <div class="main-block">
            <div class="left-block-nav">
                <home-left-nav />
            </div>
            <div class="comain-block">
                <div class="comain-item">
                    <Register />
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import NavBar from "../components/navigation/NavBar";
    import Register from "../components/auth/Register";
    import HomeLeftNav from "../components/navigation/HomeLeftNav";
    import axios from "axios";
    export default {
        name: "Admin",
        components:{NavBar,Register,HomeLeftNav},

        beforeMount() {
            if (this.$store.getters.access_token !== null){
                axios.get(process.env.VUE_APP_API+'api/user/get',
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    .then(response => {
                        if (response.status !== 200 || response.data.role.role !== 'admin'){
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
    .comain-block{
        /*border: 1px solid red;*/
        display: grid;
        justify-content: space-around;

    }
    .comain-item{
        margin-bottom: 15px;
        margin-top: 15px;
        /*border: 1px solid red;*/
    }

</style>