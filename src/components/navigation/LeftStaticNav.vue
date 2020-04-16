<template>
    <div class="home-left-static-nav">
        <h4>Static navigation</h4>
        <b-nav  vertical>
            <b-nav-item active href="#">Вопросы-ответы по ДО</b-nav-item>
            <b-nav-item active href="#">Вопросы-ответы по ДО</b-nav-item>
            <b-nav-item active href="#">Вопросы-ответы по ДО</b-nav-item>
            <b-nav-item active href="#">Вопросы-ответы по ДО</b-nav-item>
            <b-nav-item active href="#">Вопросы-ответы по ДО</b-nav-item>
            <b-nav-item active href="#">Вопросы-ответы по ДО</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: "LeftStaticNav",
    }
</script>

<style scoped>

    .home-left-static-nav{
        color: white;
        background-color: #353c48;
        padding: 10px;
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
    }

    .home-left-static-nav a {
        color: white;
    }

    .home-left-static-nav a:hover{
        color: wheat;
    }
</style>