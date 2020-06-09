<template>
    <div class="home">
        <NavBar/>
        <div class="main-block">
            <div class="left-block-nav">
                <div class="first-nav">
                    <home-left-nav/>
                </div>
                <div class="second-nav">
                    <left-static-nav/>
                </div>
            </div>
            <div class="main-block-items">
                <div class="course-nav">
                    <h4>{{title.name_en}}</h4>
                    <div class="course-nav-items">
                        <vertical-nav-item
                                v-for="item in subject_nav" :key="item.id"
                                v-bind:item="item"
                        />
                    </div>
                </div>
                <div class="weeks">
                    <weeks v-bind:role=" this.$store.getters.user_role "/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/navigation/NavBar";
    import HomeLeftNav from "../components/navigation/HomeLeftNav";
    import LeftStaticNav from "../components/navigation/LeftStaticNav";
    import VerticalNavItem from "../components/navigation/VerticalNavItem";

    import Weeks from "../components/week/Weeks";
    import axios from "axios";

    export default {
        name: 'CoursePage',
        props: ['subject_id'],
        components: {
            NavBar,
            HomeLeftNav,
            LeftStaticNav,
            VerticalNavItem,
            Weeks,
        },
        data() {
            return {
                subject_nav: [
                    {id: 0, text: 'Announcements', link: '#'},
                    {id: 1, text: 'Materials', link: '#'},
                    {id: 2, text: 'Attendance', link: '/attendance/course/' + this.$route.params.subject_id},
                ],
                title:'Course',
            }
        },
        beforeMount() {
            axios.get(process.env.VUE_APP_API + 'api/subject/get-subject-by-id?id=' + this.$route.params.subject_id,
                {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                .then(response => {
                    this.title = response.data
                })
                .catch( () => {
                    // console.log(error)
                });
            // console.log(this.$route.params)
        }

    }
</script>
<style scoped>
    .course-nav {
        color: white;
    }

    .course-nav-items {
        color: white;
        background-color: #353c48;
        /*padding: 10px;*/
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        margin-bottom: 2%;

    }

    .weeks {
        color: white;
    }
</style>