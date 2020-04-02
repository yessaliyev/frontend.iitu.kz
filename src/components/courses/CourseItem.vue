<template>
    <div class="item">

            <h5>{{item.name_en}}</h5>
            <p>
            </p>
    </div>
</template>

<script>
    export default {
        name: "CourseItem",
        props:['item'],
    }
</script>

<style scoped>
    h5 {
        color: white;
    }

</style>