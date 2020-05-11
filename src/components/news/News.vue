<template>
    <div class = 'news'>
        <NewsItem
            v-for="item in news" :key="item.id"
            v-bind:item="item"
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import NewsItem from "./NewsItem";
    export default {
        name: "News",
        components: {NewsItem},
        data() {
            return {
                news:[]
            }
        },
        mounted(){
            axios.get('http://backend.iitu.local/api/news/get')
                .then(response => {
                    this.news = response.data
                })
                .catch(function () {

                    // console.log(error)
                });
        }


    }


</script>

<style scoped>

</style>