<template>
    <div class="item ">
        <div class="">
            <!--            <a :href=" '/course/' + item.id">{{item.name_en}}</a>-->
            <router-link :to="{ name: 'Course', params: { subject_id: item.id }}">{{item.name_en}}</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CourseItem",
        props: ['item'],
    }
</script>

<style scoped>
    .item {
        /*border: 1px solid red;*/
        background-color: #353c48;
        color: white;
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.19);
        padding: 10px;
        margin-bottom: 10px;
    }

    .item:hover {
        background-color: #444c58;
        transition: 0.4s;
    }

    .item a {
        color: white;
    }
</style>