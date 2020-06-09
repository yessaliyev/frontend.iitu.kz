<template>
    <div>
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
    import LeftStaticNav from "../components/navigation/LeftStaticNav";

    export default {
        name: "CoursesPage",
        components: {UserCourses, HomeLeftNav, NavBar,LeftStaticNav}
    }
</script>

<style scoped>


</style>