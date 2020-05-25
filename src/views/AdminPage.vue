<template>
    <div>
        <NavBar/>
        <div class="main-block">
            <div class="left-block-nav">
                <home-left-nav/>
            </div>
            <div class="comain-block">
                <div class="comain-item">
                    <Register/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import NavBar from "../components/navigation/NavBar";
    import Register from "../components/auth/Register";
    import HomeLeftNav from "../components/navigation/HomeLeftNav";

    export default {
        name: "AdminPage",
        components: {NavBar, Register, HomeLeftNav},
    }
</script>

<style scoped>
    .comain-block {
        /*border: 1px solid red;*/
        display: grid;
        justify-content: space-around;

    }

    .comain-item {
        margin-bottom: 15px;
        margin-top: 15px;
        /*border: 1px solid red;*/
    }

</style>