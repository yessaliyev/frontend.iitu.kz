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
    import Courses from "../components/courses/Courses";
    import HomeLeftNav from "../components/navigation/HomeLeftNav";
    import NavBar from "../components/navigation/NavBar";
    // import auth from "../components/mixins/auth";
    export default {
        name: "Teacher",
        components: {Courses,HomeLeftNav,NavBar},
        // mixins:[auth],
        // beforeMount() {
        //     this.check('teacher').catch(() => {
        //         this.$router.push({name:'Home'})
        //     })
        // }
    }
</script>

<style scoped>

</style>