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
                <!--      <template v-slot:cell(name_en)="row">-->
                <!--      </template>-->

                <!--      <template v-slot:cell(date)="row">-->
                <!--      </template>-->

                <template v-slot:cell(actions)="row">
                    <b-form-radio-group label="Individual radios" >
                        <b-form-radio @change="onChange($event)" name="some-radios"
                                      :value="{status:1,student_id: row.item.student_id}">Present</b-form-radio>
                        <b-form-radio @change="onChange($event)" name="some-radios"
                                      :value="{status:0,student_id: row.item.student_id}">Absent</b-form-radio>
                    </b-form-radio-group>
                </template>

                <template v-slot:row-details="row">
                    <b-card>
                        <ul>
                            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                        </ul>
                    </b-card>
                </template>
            </b-table>

            <b-button type="submit" variant="primary" class="c-center">Submit</b-button>
        </b-form>
        <!-- Info modal -->
        <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
            <pre>{{ infoModal.content }}</pre>
        </b-modal>


        <b-row>
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
                test:null,
                items: [],
                fields: [
                    { key: 'student_id', label: 'Student ID', sortable: true, sortDirection: 'asc' },
                    { key: 'full_name', label: 'Full Name', sortable: true, class: 'text-center' },
                    // { key: 'status', label: 'Status', sortable: true, class: 'text-center' },
                    { key: 'actions', label: 'Actions' },
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 1,
                pageOptions: [1, 10, 15],
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
            // Set the initial number of items


            axios.get('http://backend.iitu.local/api/attendance/get-group-attendance?lesson_id='+this.$route.params.lesson_id,
                {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                .then(response => {
                    // eslint-disable-next-line no-unused-vars
                    for (const student of response.data){

                        let res = {
                            student_id:student.student_id,
                            full_name:student.first_name + ' ' +student.last_name,
                        }

                        this.items.push()

                        res.status = student.status === null ? -1 : student.status

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
            info(item, index, button) {
                console.log(item);
                console.log(index);
                console.log(button);

                this.infoModal.title = `Row index: ${index}`
                this.infoModal.content = JSON.stringify(item, null, 2)
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            resetInfoModal() {
                this.infoModal.title = ''
                this.infoModal.content = ''
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            onSubmit(evt){
                evt.preventDefault();
                console.log(evt.target)
            },
            onChange(evt){
                console.log('test -----')
                let cnt = 0;

                for (let student of this.items){
                    if (student.student_id === evt.student_id){
                        console.log('BEFORE ->' + student.status)
                        student.status = evt.status
                        console.log('AFTER ->' + student.status)
                    }
                    cnt = cnt + 1
                }

                console.log('result')
                console.log(this.items)
            }
        }
    }
</script>

<style scoped>
    .table{
        color: white;
        background-color: #353c48;
    }
</style>