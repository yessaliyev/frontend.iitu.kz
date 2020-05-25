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
                <h4>Lessons</h4>
                <div class="main-block-items">
                    <tabs/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/navigation/NavBar";
    import HomeLeftNav from "../components/navigation/HomeLeftNav";
    import LeftStaticNav from "../components/navigation/LeftStaticNav";
    import Tabs from "../components/navigation/TeacherTabs";
    // import { D3LineChart } from 'vue-d3-charts';


    export default {
        name: "AttendancePage",
        components: {
            NavBar,
            HomeLeftNav,
            LeftStaticNav,
            Tabs
            // D3LineChart
        },
        data() {
            return {}
        }
    }
</script>


<style scoped>
    .lessons {
        color: white;
    }
</style>
