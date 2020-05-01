<template>
    <div>
         <GroupItem
            v-for="item in news" :key="item.id"
            v-bind:item="item"
        />
    </div>
</template>

<script>
    import GroupItem from "./GroupItem";
    import axios from "axios";
    export default {
        name: "Groups",
        components:{
            GroupItem
        },
        data(){
            return{
                groups:[]
            }
        },
        mounted(){
            axios.get('http://backend.iitu.local/api/group/get-by-subject?subject_id')
                .then(response => {
                    this.news = response.data
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }
</script>

<style scoped>

</style>