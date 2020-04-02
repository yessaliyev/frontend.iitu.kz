<template>
  <div class="home"> 
    <NavBar />
    <div class="main-block">
      <div class="left-block-nav">
        <home-left-nav />
      </div>
      <div class="main-block-items">
        <div class="main-block-item">
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

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeLeftNav,
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
  }
  .main-block-item{

  }
</style>