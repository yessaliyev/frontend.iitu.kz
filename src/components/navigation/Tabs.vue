<template>
    <div class="">
        <div class="tabs">
            <b-tabs content-class="mt-3" active-nav-item-class="dark-back white-text" class="white-link">
                <b-tab title="Lessons" >
                    <Groups />
                </b-tab>
                <b-tab title="Add lesson">
                    <Table />
                </b-tab>
                <b-tab title="Disabled">


                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
    import Groups from "../groups/Groups";
    import Table from "./Table";

    export default {
        components:{Groups,Table},
        name: "Tabs"
    }
</script>

<style >

</style>