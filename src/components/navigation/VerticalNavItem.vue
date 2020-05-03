<template>
    <div class="vertical-nav">
        <b-nav vertical>

            <b-nav-item active><router-link :to="{ path: item.link}">{{item.text}}</router-link></b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: "VerticalNavigation",
        props:['item']
    }
</script>

<style scoped>
    .vertical-nav a {
        color: white;
    }
    .vertical-nav a:hover{
        color: wheat;
    }
    .test{
    }
</style>