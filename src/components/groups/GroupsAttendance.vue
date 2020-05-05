<template>
  <b-container fluid class="table">

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
        <div class="h5 mb-0">
          <router-link :to="{ name: 'GroupAttendance',params: { lesson_id: row.item.id }}"><b-icon-forward-fill /></router-link>
          <router-link :to="{ name: 'Course'}"><b-icon-gear-fill /></router-link>
          <router-link :to="{ name: 'Course'}"><b-icon-x-circle-fill /></router-link>
        </div>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>


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
  name:"GroupsAttendance",
    data() {
      return {
        items: [],
        fields: [
          { key: 'group', label: 'Group', sortable: true, sortDirection: 'desc' },
          { key: 'date', label: 'Date', sortable: true, class: 'text-center' },
          { key: 'type', label: 'Type', sortable: true, class: 'text-center' },
          { key: 'room', label: 'Room', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' },
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
      axios.get('http://backend.iitu.local/api/attendance/get-course-attendance',
          {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
           .then(response => {
               for (const group of response.data){
                       this.items.push({
                           id:group.id,
                           group:group.name_en,
                           date:group.date,
                           type:group.type_en,
                           room:group.room_num
                       })
                   }
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
      }
    }
  }
</script>

<style scoped>
    .table{
        color: white;
        background-color: #353c48;
    }
    .padding{
      padding-bottom: 15px;
      padding-top: 15px;
    }
</style>


<!--<template>-->
<!--    <div>-->
<!--        <div class="table ">-->
<!--             <b-table striped borderless hover :items="groups" :fields="fields" class="dark-table">-->

<!--             </b-table>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import axios from "axios";-->

<!--    export default {-->
<!--        name: "Groups",-->
<!--        data(){-->
<!--            return{-->
<!--                fields:[],-->
<!--                groups: [-->

<!--                ]-->
<!--            }-->
<!--        },-->
<!--        mounted(){-->
<!--            axios.get('http://backend.iitu.local/api/attendance/get-course-attendance',-->
<!--               {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})-->
<!--                .then(response => {-->
<!--                    for (const group of response.data){-->
<!--                            this.groups.push({-->
<!--                                id:group.id,-->
<!--                                Group:group.name_en,-->
<!--                                Date:group.date,-->
<!--                                Type:group.type_en,-->
<!--                                room:group.room_num-->
<!--                            })-->
<!--                        }-->
<!--                })-->
<!--                .catch(function (error) {-->
<!--                    console.log(error)-->
<!--                });-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--    .table{-->
<!--        color: white;-->
<!--        background-color: #353c48;-->
<!--    }-->

<!--</style>-->