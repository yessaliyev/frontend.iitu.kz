<template>
    <div>
        <NavBar />
        <Register />
    </div>
</template>

<script>
    import NavBar from "../components/navigation/NavBar";
    import Register from "../components/auth/Register";
    export default {
        name: "Admin",
        components:{NavBar,Register}
    }
</script>

<style scoped>

</style>