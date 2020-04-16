<template>
  <div class="home"> 
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
        <div class="main-block-item">
          <h3>News</h3>
          <news />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/navigation/NavBar";
  import HomeLeftNav from "../components/navigation/HomeLeftNav";
  import News from "../components/news/News";
  import LeftStaticNav from "../components/navigation/LeftStaticNav";

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeLeftNav,
    LeftStaticNav,
    News
  }
}
</script>

<style>
  .main-block{
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    grid-gap: 35px;
    /*border: 1px solid red;*/
  }

  .left-block-nav{
    /*border: 1px solid red;*/
    /*width: 50%;*/
    margin-left: 6%;
  }

  .main-block-items{
    display: grid;
    grid-template-columns: 1fr;
    /*background-color: #353c48;*/
    margin-right: 2%;
  }
  .main-block-item{
    color: white;
  }

  .first-nav{
    margin-bottom: 10%;
  }

  .second-nav{

  }
</style>