<template>
    <div>
        <WeekItem
            v-for="item in weeks" :key="item.id"
            v-bind:item="item"
        />
    </div>
</template>

<script>
    import axios from "axios"
    import WeekItem from "./WeekItem";
    import auth from "../mixins/auth";

    export default {
        name: "Weeks",
        components:{WeekItem},
        props:['role'],
        mixins:[auth],
        data(){
            return {
                weeks:[]
            }
        },
        beforeMount() {
            this.check(this.role).then(() =>{
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

</style>