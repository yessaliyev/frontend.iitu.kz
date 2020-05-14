<template>
    <div class="courses ">
        <h5>My Courses</h5>
        <CourseItem
            v-for="item in courses" :key="item.id"
            v-bind:item="item"
        />
    </div>
</template>

<script>
    import CourseItem from "./UserCourseItem";
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
            axios.get(process.env.VUE_APP_API+'api/subject/get',
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