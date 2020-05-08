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
    import Courses from "../components/courses/UserCourses";
    import HomeLeftNav from "../components/navigation/HomeLeftNav";
    import NavBar from "../components/navigation/NavBar";

    export default {
        name: "Teacher",
        components: {Courses,HomeLeftNav,NavBar},
    }
</script>

<style scoped>

</style>