<template>
    <div>
        <b-nav class="c-navbar" align="right">
            <div class="c-navbar-item">
                <div>
                    <b-nav-item href="/">dl.iitu.kz</b-nav-item>
                </div>
            </div>
            <div v-if="logged_user.length === 0" class="c-navbar-item">
                <b-nav-text class='c-message'>You are not logged in</b-nav-text>
            </div>
            <div v-if="logged_user.length === 0" class="c-navbar-item">
                <b-nav-item href="/login" class="">Login</b-nav-item>
            </div>
            <div v-if="logged_user.length !== 0" class="c-navbar-item">
                <b-nav-text class='c-message'>Welcome</b-nav-text>
            </div>
            <div v-if="logged_user.length !== 0" class="c-navbar-item ">
                <div class="c-navbar-dropdown">
                    <b-dropdown right :text="logged_user.username">
                        <b-dropdown-item href="#">My profile</b-dropdown-item>
                        <b-dropdown-item>
                            <router-link :to="{ name: 'CoursesPage'}">My Courses</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item @click="logout">logout</b-dropdown-item>
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
                logged_user: []
            }
        },
        beforeCreate() {
            if (this.$store.getters.access_token !== null) {
                axios.get(process.env.VUE_APP_API + 'api/user/get',
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    .then(response => {
                        this.logged_user = response.data
                    })
                    .catch(function () {
                        // console.log(e)
                    })
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push({name: "HomePage"})
                    });
            }
        }
    }
</script>

<style scoped>
    .c-navbar {
        background-color: #353c48;
        height: 60px;
        -webkit-box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.19);
        -moz-box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.19);
        box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.19);
        z-index: 100;
        padding: 10px 10px;
        display: grid;
        grid-template-columns: 0.07fr 0.9fr 0.03fr;
        color: white;
        /*border: 1px solid red;*/
        margin-bottom: 35px;
    }

    .c-navbar a {
        color: white;
        text-decoration: none;
    }

    .c-navbar a:hover {
        /*color: wheat;*/
    }

    .c-navbar-item {
        /*border: 1px solid red;*/
        align-self: center;
        /*justify-self: center;*/
    }

    .c-message {
        padding-right: 10px;
        float: right;
    }

    .c-navbar-dropdown li a {
        color: black;
    }


</style>