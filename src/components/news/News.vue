<template>
    <div class='news'>
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
                news: []
            }
        },
        mounted() {
            axios.get(process.env.VUE_APP_API + 'api/news/get')
                .then(response => {
                    this.news = response.data
                })
                .catch((e) => {

                    alert(e)
                });
        }


    }


</script>

<style scoped>

</style>