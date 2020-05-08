<template>
    <div class="item">
         <p>{{item.start}} - {{item.end}}</p>
    </div>
</template>

<script>
    export default {
        name: "WeekItem",
        props:['item']
    }
</script>

<style scoped>
    .item{
        border-bottom: 1px solid #444c58 ;
    }
</style>