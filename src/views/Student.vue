<template>
    <div>
        <NavBar />
        <div class="main-block">
            <div class="left-block-nav">
                <home-left-nav />
            </div>
            <div class="main-block-items">
                <div class="main-block-item">
                    <Courses />
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Courses from "../components/courses/Courses";
    import HomeLeftNav from "../components/navigation/HomeLeftNav";
    import NavBar from "../components/navigation/NavBar";
    import axios from "axios";

    export default {
        name: "Student",
        components: {Courses,HomeLeftNav,NavBar},
        data() {
            return {
            id:this.$route.params.id
            }
        },
        beforeCreate() {
            if (this.$store.getters.access_token !== null){
                axios.get('http://backend.iitu.local/api/user/get',
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    .then(response => {
                        if (response.data.roles[0].role !== 'admin' && response.data.roles[0].role !== 'student'){
                            this.$router.push({name: "Home"})
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


</style>