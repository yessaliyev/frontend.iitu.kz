<template>
    <div class="">
        <div class="tabs">
            <b-tabs content-class="mt-3" active-nav-item-class="dark-back white-text" class="white-link">
                <b-tab title="Lessons">
                    <Groups/>
                </b-tab>
                <b-tab title="Add lesson" v-if="this.$store.getters.user_role === 'teacher'">
                    <add-lesson/>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
    import Groups from "../groups/GroupsAttendance";
    import AddLesson from "../lessons/AddLesson";

    export default {
        components: {Groups, AddLesson},
        name: "TeacherTabs",
    }
</script>

<style>

</style>