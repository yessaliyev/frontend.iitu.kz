<template>
    <div class="test">
         {{item.start}} - {{item.end}}


    </div>
</template>

<script>
    export default {
        name: "WeekItem",
        props:['item']
    }
</script>

<style scoped>

</style>