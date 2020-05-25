<template>
    <div class="item border">
        <h5>{{item.title}}</h5>
        <p>
            {{item.content}}
        </p>
        <p>{{item.created_at}}</p>

        <router-link :to="{ name: 'NewsPage', params:{news_id:item.id}}">Link</router-link>
    </div>
</template>

<script>
    export default {
        name: "NewsItem",
        props: ['item'],
        beforeMount() {
            let maxLength = 500
            let trimmedString = this.item.content.substr(0, maxLength);
            this.item.content = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + ' ...'
        }
    }
</script>

<style scoped>
    .item {
        /*border: 1px solid red;*/
        background-color: #353c48;
        color: white;
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        padding: 20px;
        margin-bottom: 25px;
        /*margin: 1%;*/
    }

    .item:hover {
        background-color: #444c58;
        transition: 0.3s;
    }

    .item a {
        color: wheat;
    }

</style>