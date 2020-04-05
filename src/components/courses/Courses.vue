<template>
    <div class="courses">
        <CourseItem
            v-for="item in courses" :key="item.id"
            v-bind:item="item"
        />
    </div>
</template>

<script>
    import CourseItem from "./CourseItem";
    import axios from "axios";
    export default {
        name: "Courses",
        components:{CourseItem},
        data() {
            return {
                courses:[]
            }
        },
        mounted(){
            axios.get('http://backend.iitu.local/api/subject/get?user_id',
                {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                .then(response => {
                    this.courses = response.data
                })
                .catch((error) => {
                    if (error.response.status === 401){
                        this.$router.push({name:"Login"})
                    }
                });
        }
    }
</script>

<style scoped>

</style>