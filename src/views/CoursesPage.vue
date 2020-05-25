<template>
    <div>
        <NavBar/>
        <div class="main-block">
            <div class="left-block-nav">
                <home-left-nav/>
            </div>
            <div class="main-block-items">
                <div class="main-block-item">
                    <user-courses/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import UserCourses from "../components/courses/UserCourses";
    import HomeLeftNav from "../components/navigation/HomeLeftNav";
    import NavBar from "../components/navigation/NavBar";

    export default {
        name: "CoursesPage",
        components: {UserCourses, HomeLeftNav, NavBar}
    }
</script>

<style scoped>


</style>