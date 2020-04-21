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
          <div class="main-block-items">
            <h2>test</h2>
          </div>
        </div>
    </div>
</template>

<script>
  import NavBar from "../components/navigation/NavBar";
  import HomeLeftNav from "../components/navigation/HomeLeftNav";
  import LeftStaticNav from "../components/navigation/LeftStaticNav";
    export default {
        name: "Attendance",
        components: {
            NavBar,
            HomeLeftNav,
            LeftStaticNav,
        },
    }
</script>

<style scoped>

</style>