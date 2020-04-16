<template>
    <div class="home-left-nav">
        <h4>Navigation</h4>
        <b-nav v-for="item of nav_items" :key="item.link" vertical>
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
        },
        beforeMount() {
            if (this.$store.getters.access_token !== null){
                switch (this.$store.getters.user_role) {
                    case 'admin':
                        console.log('rest')
                        this.nav_items = [
                            {text:'Activities',link:'/admin'},
                            {text:'Schedule',link:'/schedule'},
                            {text:'Teachers',link:'/admin/teachers'},
                            {text:'Students',link:'/admin/students'},
                        ]
                        break
                }
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