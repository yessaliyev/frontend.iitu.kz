<template>
    <div class="home-left-nav">
        <h4>Navigation</h4>
        <b-nav v-for="item of nav_items" :key="item.link" vertical class="w-25">
            <b-nav-item active :href="item.link">{{item.text}}</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: "HomeLeftNav",
        data(){
            return {
                nav_items:[
                    {text:'News',link:'/news'},
                    {text:'Schedule',link:'/schedule'},
                    {text:'Another Item',link:null},
                ]
            }
        }
    }
</script>

<style scoped>
.home-left-nav{
    color: white;
    background-color: #353c48;
    padding: 10px;
    -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
    -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
}
.home-left-nav a {
    color: white;
}

.home-left-nav a:hover{
    color: wheat;
}

</style>