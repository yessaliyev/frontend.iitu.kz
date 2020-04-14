<template>
    <div>
        <b-nav class="c-navbar" align="right">
            <div class="c-navbar-item">
                <div>
                    <b-nav-item href="/">dl.iitu.kz</b-nav-item>
                </div>
            </div>
            <div v-if="logged_user.length === 0" class="c-navbar-item">
                <b-nav-text class = 'c-message'>Вы не вошли в систему</b-nav-text>
            </div>
            <div v-if="logged_user.length === 0" class="c-navbar-item">
                <b-nav-item  href="/login" class = "">Вход</b-nav-item>
            </div>
            <div v-if="logged_user.length !== 0" class="c-navbar-item">
                <b-nav-text class = 'c-message'>Добро пожаловать</b-nav-text>
            </div>
            <div v-if="logged_user.length !== 0" class="c-navbar-item ">
                <div class="c-navbar-dropdown">
                    <b-dropdown right :text="logged_user.username">
                        <b-dropdown-item href="#">My profile</b-dropdown-item>
                        <b-dropdown-item :href="'/student/' +logged_user.id">My courses</b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </b-nav>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "NavBar",
        data() {
            return {
                logged_user:[]
            }
        },
        beforeMount(){
            if (this.$store.getters.access_token !== null){
                axios.get('http://backend.iitu.local/api/user/get',
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    .then(response => {
                        console.log(response.data)
                        this.logged_user = response.data
                    })
                    .catch(function (e) {
                        console.log(e)
                    })
            }
        }

    }
</script>

<style scoped>
    .c-navbar{
        background-color: #353c48;
        height: 60px;
        -webkit-box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.19);
        -moz-box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.19);
        box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.19);
        z-index: 100;
        padding: 10px 10px;
        display: grid;
        grid-template-columns: 0.07fr 0.9fr 0.03fr;
        color: white;
        /*border: 1px solid red;*/
        margin-bottom: 35px;
    }
    .c-navbar a{
        color: white;
    }
    .c-navbar a:hover{
        color: wheat;
    }
    .c-navbar-item{
        /*border: 1px solid red;*/
        align-self: center;
        /*justify-self: center;*/
    }

    .c-message{
        padding-right: 10px;
        float: right;
    }


</style>