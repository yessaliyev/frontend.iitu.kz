<template>
    <div class="main">
        <h4>Navigation</h4>
        <div class="home-left-nav ">
            <vertical-nav-item
                    v-for="item in nav_items" :key="item.id"
                    v-bind:item="item"
            />
        </div>
    </div>
</template>

<script>
    import VerticalNavItem from "./VerticalNavItem";

    export default {
        name: "HomeLeftNav",
        components: {VerticalNavItem},
        data() {
            return {
                nav_items: [
                    {text: 'Home', link: '/'},
                    {text: 'Schedule', link: '/schedule'},
                ]
            }
        },
        beforeMount() {
            if (this.$store.getters.access_token !== null) {
                switch (this.$store.getters.user_role) {
                    case 'admin':
                        this.nav_items.push([
                            {text: 'Activities', link: '/admin'},
                            {text: 'Teachers', link: '/admin/teachers'},
                            {text: 'Students', link: '/admin/students'},
                        ]);
                        break
                }
            }
        }
    }
</script>

<style scoped>
    .home-left-nav {
        color: white;
        background-color: #353c48;
        /*padding: 10px;*/
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
    }

    .main {
        color: white;
    }


</style>