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
        <div class="course-nav">
          <h4>test Title</h4>
          <div class="course-nav-items">
            <vertical-nav-item
               v-for="item in subject_nav" :key="item.id"
               v-bind:item="item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/navigation/NavBar";
  import HomeLeftNav from "../components/navigation/HomeLeftNav";
  import LeftStaticNav from "../components/navigation/LeftStaticNav";
  import VerticalNavItem from "../components/navigation/VerticalNavItem";
  import auth from "../components/mixins/auth";
  import axios from "axios";

export default {
  name: 'StudentCourse',
  components: {
    NavBar,
    HomeLeftNav,
    LeftStaticNav,
    VerticalNavItem
  },
  mixins:[auth],
  data(){
    return{
      subject_nav:[
        {id:0,text:'Announcements',link:'#'},
        {id:1,text:'Materials',link:'#'},
        {id:2,text:'Attendance',link:'#'},
      ],
      weeks:[]
    }
  },
  beforeMount() {
    this.check('student').then(() =>{
      axios.get('http://backend.iitu.local/api/subject/get-weeks',
          {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
          .then((response)=> {
              this.weeks = response.data
              console.log(this.weeks)
          })
          .catch(() => {
              return false
          })
    })
    .catch((e) => {
      console.log(e)
      this.$router.push({name:"Home"})
    });
  }

}
</script>
<style scoped>
  .course-nav{
    color: white;
  }
  .course-nav-items{
    color: white;
        background-color: #353c48;
        /*padding: 10px;*/
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
  }
</style>