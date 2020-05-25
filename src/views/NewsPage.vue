<template>
    <div class="home">
        <NavBar/>
        <div class="main-block">
            <div class="left-block-nav">
                <div class="first-nav">
                    <home-left-nav/>
                </div>
                <div class="second-nav">
                    <left-static-nav/>
                </div>
            </div>
            <div class="main-block-items">
                <div class="main-block-item">
                    <h5>{{news_item.title}}</h5>
                    <div class="dark-back">
                        <div class="item">
                            <p>
                                {{news_item.content}}
                            </p>
                        </div>
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
    import axios from "axios";

    export default {
        name: 'NewsPage',
        components: {
            NavBar,
            HomeLeftNav,
            LeftStaticNav,
        },
        data(){
            return {
                news_item:null
            }
        },
        mounted() {
            axios.get(process.env.VUE_APP_API + 'api/news/get-by-id' + '?news_id='+this.$route.params.news_id)
                .then(response => {
                    this.news_item = response.data
                })
                .catch( (e) => {
                    console.log(e)
                })
        }
    }
</script>

<style>
    .item{
        padding: 20px;
    }

</style>