<template>
    <div class="add-lesson-block shadow dark-back" >
        <b-form @submit="onSubmit" class="" >
            <div class="form">
                <div class=""><h6>Subject type</h6></div>
                <div class="">
                    <b-form-select
                            v-model="form.subject_type_id"
                            :options="subject_types"
                            size="sm"
                    >
                    </b-form-select>
                </div>
            </div>
            <div class="form darker">
                <div><h6>Group</h6></div>
                <div>
                    <b-form-select
                            v-model="form.group_id"
                            :options="groups"
                            size="sm"
                    >
                    </b-form-select>
                </div>
            </div>
            <div class="form">
                <div><h6>Date</h6></div>
                <div>
                    <b-form-datepicker size="sm" id="datepicker" reset-button v-model="form.date" class=""></b-form-datepicker>
                </div>
            </div>
            <div class="form darker">
                <div><h6>Time</h6></div>
                <div>
                    <b-input-group class="">
                        <b-form-input
                                id="example-input"
                                v-model="form.time"
                                type="text"
                                size="sm"
                                placeholder="HH:mm"
                        ></b-form-input>
                        <b-input-group-append>
                            <b-form-timepicker
                                    v-model="form.time"
                                    button-only
                                    right
                                    reset-button
                                    size="sm"
                                    locale="kz"
                                    aria-controls="example-input"
                            ></b-form-timepicker>
                        </b-input-group-append>
                    </b-input-group>
                </div>
            </div>
            <div class="form">
                <div>
                    <h6>Room</h6>
                </div>
                <div>
                    <b-form-input
                            id="input-1"
                            v-model="form.room_num"
                            type="number"
                            required
                            placeholder="Enter room num"
                    ></b-form-input>
                </div>
            </div>
            <div class="form weeks darker">
                <div class="">
                    <h6>Repeat?</h6>
                </div>
                <div class="week-items">
                    <div>
                        <label>
                            <input type="checkbox" name="test" value="small" v-model="form.days.mon">
                            <img height="38" src="@/assets/weeks/mon.png" alt="image slot">
                        </label>
                        <label>
                            <input type="checkbox" name="test" value="small" v-model="form.days.tue" >
                            <img height="38" src="@/assets/weeks/tue.png" alt="image slot">
                        </label>
                        <label>
                            <input type="checkbox" name="test" value="small" v-model="form.days.wed">
                            <img height="38" src="@/assets/weeks/wed.png" alt="image slot">
                        </label>
                        <label>
                            <input type="checkbox" name="test" value="small" v-model="form.days.thu">
                            <img height="38" src="@/assets/weeks/thu.png" alt="image slot">
                        </label>
                        <label>
                            <input type="checkbox" name="test" value="small" v-model="form.days.fri">
                            <img height="38" src="@/assets/weeks/fri.png" alt="image slot">
                        </label>
                        <label>
                            <input type="checkbox" name="test" value="small" v-model="form.days.sat">
                            <img height="38" src="@/assets/weeks/sat.png" alt="image slot">
                        </label>
                    </div>
                    <div>
                        <b-form-select
                                v-model="form.repeats"
                                :options="repeats"
                                size="sm"
                        >
                        </b-form-select>
                    </div>
                </div>
            </div>
            <b-button type="submit" variant="primary" class="c-center">Submit</b-button>
        </b-form>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "AddLesson",
        data() {
            return {
                form: {
                    subject_id:this.$route.params.subject_id,
                    group_id:null,
                    date:'',
                    time:'',
                    subject_type_id:null,
                    repeats:null,
                    room_num:null,
                    days:{mon:null,tue:null,wed:null,thu:null,fri:null,sat:null}
                },
                subject_types:[{text:"please select subject type",value:null}],
                groups:[{text:"please select group",value:null}],
                repeats:[{text:1,value:1},{text:2,value:2},{text:3,value:3},{text:4,value:4}]
            }
        },

        methods:{
            onSubmit(evt){
                evt.preventDefault();
                axios.post('http://backend.iitu.local/api/subject/create-lesson',this.form,
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    .then(response => {
                        for (const type of response.data){
                            this.subject_types.push({text:type.type_en,value:type.id})
                        }

                    })
                    .catch((error) => {
                        if (error.response.status === 401){
                            this.$router.push({name: "Login"})
                        }
                    });
            },
            getTypes(){
                axios.get('http://backend.iitu.local/api/subject/get-types',
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    .then(response => {
                        for (const type of response.data){
                            this.subject_types.push({text:type.type_en,value:type.id})
                        }

                    })
                    .catch((error) => {
                        if (error.response.status === 401){
                            this.$router.push({name: "Login"})
                        }
                    });
            },
            getGroups(){
                axios.get('http://backend.iitu.local/api/subject/get-groups?subject_id='+this.form.subject_id,
                    {headers: {Authorization: "Bearer " + this.$store.getters.access_token}})
                    .then(response => {
                        for (const group of response.data){
                            this.groups.push({text:group.name_en,value:group.id})
                        }

                    })
                    .catch((error) => {
                        if (error.response.status === 401){
                            this.$router.push({name: "Login"})
                        }
                    });
            }

        },
        mounted() {
            this.getTypes()
            this.getGroups()
        },

    }
</script>

<style scoped>
    .add-lesson-block{

    }
    .form{
        padding: 15px;
        display: grid;
        grid-template-columns: 0.3fr 0.3fr;
        justify-content: space-evenly;
        align-items: center;
    }
    .darker{
        background-color: #323944;

    }

    .c-center{
        margin: 1% 50%;
    }
    .week-items{
        display: grid;
        grid-template-columns: 0.8fr 0.2fr;
    }

    /* HIDE RADIO */
    [type=checkbox] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* IMAGE STYLES */
    [type=checkbox] + img {
        cursor: pointer;
    }

    [type=checkbox]:hover + img {
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
        transition: 0.2s;
    }
    /* CHECKED STYLES */
    [type=checkbox]:checked + img {
        filter: brightness(85%);
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>