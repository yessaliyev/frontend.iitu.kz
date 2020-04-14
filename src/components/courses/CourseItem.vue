<template>
    <div class="item">
        <h5>{{item.name_en}}</h5>
    </div>
</template>

<script>
    export default {
        name: "CourseItem",
        props:['item'],
    }
</script>

<style scoped>
    .item{
        /*border: 1px solid red;*/
        background-color: #353c48;
        color: white;
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.19);
        padding: 20px;
        margin-bottom: 25px;
        width: 93%;
    }

    .item:hover{
        background-color: #444c58;
        transition: 0.3s;
    }
</style>