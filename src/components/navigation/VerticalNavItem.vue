<template>
    <div class="vertical-nav">
        <b-nav vertical>
            <b-nav-item active :href="item.link">{{item.text}}</b-nav-item>
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