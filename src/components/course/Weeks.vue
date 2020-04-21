<template>
    <div class="">
        <h4>Weeks</h4>
        <div class="weeks">
            <WeekItem
                v-for="item in weeks" :key="item.id"
                v-bind:item="item"
            />
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import WeekItem from "./WeekItem";
    import auth from "../mixins/auth";

    export default {
        name: "Weeks",
        components:{WeekItem},
        props:['role'],
        mixins:[auth],
        data(){
            return {
                weeks:[]
            }
        },
        beforeMount() {
            const url = this.role === 'student' ? 'get-student-weeks' : 'get-teacher-weeks'

            axios.get('http://backend.iitu.local/api/subject/' + url,
                {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                .then((response) => {
                    this.weeks = response.data
                    console.log(this.weeks)
                })
                .catch(() => {
                    return false
                })
        }
    }
</script>

<style scoped>
    .weeks{
        background-color: #353c48;
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
    }
</style>