<template>
    <div class="main">
        <div class="home-left-static-nav">
            <b-nav vertical>
                <b-nav-item active href="#">Вопросы-ответы по ДО </b-nav-item>
                <b-nav-item active href="#">Инструкция для обучающихся по online-сдаче экзаменов (ДОТ)</b-nav-item>
                <b-nav-item active href="#">Приказ о мерах социальной поддержки обучающимся</b-nav-item>
                <b-nav-item active href="#">Программа АИС Расписания
                    Академический календарь 2019-2020 уч.год</b-nav-item>
                <b-nav-item active href="#">Расписание звонков</b-nav-item>
                <b-nav-item active href="#">Информация по работе с сайтом</b-nav-item>
            </b-nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LeftStaticNav",
    }
</script>

<style scoped>

    .main {
        color: white;
    }

    .home-left-static-nav {
        color: white;
        background-color: #353c48;
        padding: 10px;
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
    }

    .home-left-static-nav a {
        color: white;
    }

    .home-left-static-nav a:hover {
        color: wheat;
    }
</style>