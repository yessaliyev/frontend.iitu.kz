<template>
  <div class="home"> 
    <NavBar />
    <div class="news-block">
      <div class="news-block-nav">
        <home-left-nav />
      </div>
      <div class="news-items">
        <div class="news-item">
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

<style scoped>
  .news-block{
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    grid-gap: 35px;
    /*border: 1px solid red;*/
  }

  .news-block-nav{
    /*border: 1px solid red;*/
    /*width: 50%;*/
    margin-left: 6%;
  }

  .news-items{
    display: grid;
    grid-template-columns: 1fr;
  }
  .news-item{

  }
</style>