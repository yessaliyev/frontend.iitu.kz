<template>
    <div>
        <NavBar />
        <div class="main-block">
            <div class="left-block-nav">
                <div class="first-nav">
                    <home-left-nav />
                </div>
                <div class="second-nav">
                    <left-static-nav />
                </div>
            </div>
            <div>
              <h4>qwe</h4>
              <div class="main-block-items">
                  <tabs />
              </div>
            </div>
        </div>
    </div>
</template>

<script>
  import NavBar from "../components/navigation/NavBar";
  import HomeLeftNav from "../components/navigation/HomeLeftNav";
  import LeftStaticNav from "../components/navigation/LeftStaticNav";
  import Tabs from "../components/navigation/Tabs";
  // import { D3LineChart } from 'vue-d3-charts';

  
    export default {
        name: "Attendance",
        components: {
            NavBar,
            HomeLeftNav,
            LeftStaticNav,
            Tabs
            // D3LineChart
        },
        data(){
            return {}
        }
    }
</script>

<style>

    .test{
        background: #353c48;
    }

    .test1{
        background-color: #a71116 !important;
    }
    .test1:active{
        background-color: red;

    }

</style>