<template>
    <div>
        <div class="table ">
             <b-table striped borderless hover :items="items" class="dark-table"></b-table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Groups",
        data(){
            return{
                groups:[],
                fields:['1','2','3','4'],
                items: [
                  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                  { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                  { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
                ]
            }
        },
        mounted(){
            axios.get('http://backend.iitu.local/api/attendance/get-course-attendance',
               {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})

                .then(response => {
                    this.groups = response.data
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }
</script>

<style scoped>
    .table{
        color: white;
        background-color: #353c48;
    }



</style>