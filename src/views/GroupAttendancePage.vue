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
            <div class="lessons">
                <div class="main-block-items">
                    <StudentsAttendance/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/navigation/NavBar";
    import HomeLeftNav from "../components/navigation/HomeLeftNav";
    import LeftStaticNav from "../components/navigation/LeftStaticNav";
    import StudentsAttendance from "../components/students/StudentsAttendance";
    // import { D3LineChart } from 'vue-d3-charts';

    export default {
        name: "GroupAttendancePage",
        components: {
            NavBar,
            HomeLeftNav,
            LeftStaticNav,
            StudentsAttendance
            // D3LineChart
        },
        data() {
            return {}
        },

    }
</script>


<style scoped>
    .lessons {
        color: white;
    }
</style>
