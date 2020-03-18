<template>
    <div class="home-left-nav">
        <h4>Navigation</h4>
        <b-nav vertical class="w-25">
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: "HomeLeftNav"
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