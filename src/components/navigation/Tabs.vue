<template>
    <div class="">
        <div class="tabs">
            <b-tabs content-class="mt-3" active-nav-item-class="dark-back white-text" class="white-link">
                <b-tab title="First" >
                    <Groups />
                </b-tab>
                <b-tab title="Second">

                </b-tab>
                <b-tab title="Disabled">

                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
    import Groups from "../groups/Groups";

    export default {
        components:{Groups},
        name: "Tabs"
    }
</script>

<style >

</style>