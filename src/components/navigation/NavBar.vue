<template>
    <div>
        <b-nav class="c-navbar" align="right">
            <div class="c-navbar-item">
                <div>
                    <b-nav-item href="https://dl.iitu.kz">dl.iitu.kz</b-nav-item>
                </div>
            </div>
            <div class="c-navbar-item">
                <b-nav-text class = 'c-message'>Вы не вошли в систему</b-nav-text>
            </div>
            <div class="c-navbar-item">
                <b-nav-item v-if="!loggedIn" href="/login" class = "">Вход</b-nav-item>
                <b-nav-item v-else href="/login" class = "">Выход</b-nav-item>
            </div>
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        computed:{
            loggedIn(){
                return this.$store.getters.loggedIn
            }
        },
        mounted(){
            console.log(this.$store.getters.loggedIn)
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
        grid-template-columns: 0.05fr 0.9fr 0.05fr;
        color: white;
        border: 1px solid red;
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
        float: right;
    }


</style>