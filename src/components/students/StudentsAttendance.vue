<template>
    <b-container fluid class="table">
        <b-form @submit="onSubmit">
            <b-table
                    show-empty
                    stacked="md"
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    :filterIncludedFields="filterOn"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    @filtered="onFiltered"
                    striped borderless
                    class="dark-table"
            >
                <template v-slot:cell(actions)="row">
                    <div class="radio">
                        <div class="radio1">
                            <label>P
                                <input type="radio" @change="onChange($event,row.item)"
                                       v-model="row.item.selected" :value="1">
                            </label>
                        </div>
                        <div class="radio2">
                            <label >A
                                <input type="radio" @change="onChange($event,row.item)"
                                       v-model="row.item.selected" :value="0">
                            </label>
                        </div>
                        <div class="radio3">
                            <label >R
                                <input type="radio" @change="onChange($event,row.item)"
                                       v-model="row.item.selected" :value="2">
                            </label>
                        </div>
                    </div>

                </template>
            </b-table>

            <b-button type="submit" variant="primary" class="c-center">Submit</b-button>
        </b-form>

        <b-row class="padding">
            <b-col sm="5" md="6" class="my-1">
                <b-form-group
                        label="Per page"
                        label-cols-sm="6"
                        label-cols-md="4"
                        label-cols-lg="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="perPageSelect"
                        class="mb-0"
                >
                    <b-form-select
                            v-model="perPage"
                            id="perPageSelect"
                            size="sm"
                            :options="pageOptions"
                    ></b-form-select>

                </b-form-group>
            </b-col>

            <b-col sm="7" md="6" class="my-1">
                <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                ></b-pagination>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from "axios"
    export default {
        name:"StudentsAttendance",
        data() {
            return {
                items: [],
                fields: [
                    { key: 'student_id', label: 'Student ID', sortable: true, sortDirection: 'asc',class: "custom-width" },
                    { key: 'full_name', label: 'Full Name', sortable: true, class: 'text-center' },
                    { key: 'actions', label: 'Actions' },
                    { key: 'notes', label: 'Notes' },

                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                pageOptions: [5, 10, 15],
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                filterOn: [],
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
                }
            }
        },
        computed: {
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return { text: f.label, value: f.key }
                    })
            }
        },
        mounted() {
            axios.get('http://backend.iitu.local/api/attendance/get-group-attendance?lesson_id='+this.$route.params.lesson_id,
                {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                .then(response => {
                    for (const student of response.data){
                        let res = {
                            student_id:student.student_id,
                            full_name:student.first_name + ' ' +student.last_name,
                            notes:student.notes
                        }

                        if (student.status === 1){
                            res.selected = 1
                            res.status = 1
                        }

                        if (student.status === 0){
                            res.selected = 0
                            res.status = 0
                        }

                        if (student.status === 2){
                            res.selected = 2
                            res.status = 0
                        }

                        if (student.status === null){
                            res.status = -1;
                        }

                        this.items.push(res)
                    }

                    console.log(this.items)
                    this.totalRows = this.items.length
                })
                .catch(function (error) {
                    console.log(error)
                });



        },
        methods: {
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            onSubmit(evt){
                evt.preventDefault();
                const data = {
                    students:this.items,
                    lesson_id: this.$route.params.lesson_id
                }
                axios.post('http://backend.iitu.local/api/attendance/set-students-attendance',data,
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    .then(response => {
                        if (response.status === 200){
                            console.log(response.data)
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 401){
                            this.$router.push({name: "Login"})
                        }
                        console.log(error)
                    })
            },
            onChange(evt,item){
                for (let student of this.items){
                    if (student.student_id === item.student_id){
                        student.status = evt.target.value
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .table{
        color: white;
        background-color: #353c48;
    }

    .radio{
        width: 45%;
        display: grid;
        grid-template-columns: 0.3fr 0.3fr 0.3fr
    }
    .padding{
        padding-bottom: 15px;
        padding-top: 15px;
    }
</style>