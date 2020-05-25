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
                            <pre>
                                {{news_item.content}}
                            </pre>
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
                news_item:{}
            }
        },
        beforeMount() {
            axios.get(process.env.VUE_APP_API + 'api/news/get-by-id' + '?news_id='+this.$route.params.news_id)
                .then(response => {
                    console.log(response.data.title)
                    this.news_item = response.data
                    // this.news_item.content = this.news_item.content.replace(/\n/g, "<br>");
                })
                .catch( (e) => {
                    console.log(e)
                })
        }
    }
</script>

<style scoped>
    .item{
        padding: 20px;
    }
    .item pre {
        color: white;
        white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
        white-space: -pre-wrap; /* Opera */
        white-space: -o-pre-wrap; /* Opera */
        white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
        word-wrap: break-word; /* IE 5.5+ */
    }

</style>