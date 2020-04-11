<template>
    <div>
        <div class="block">
            <div class="login-block">
                <div class="login">
                    <h2 class="c-center">create new User</h2>
                    <b-form @submit="onSubmit" >
                        <b-form-group
                                id="input-group-1"
                                label="Username"
                                label-for="input-1">
                            <b-form-input
                                    id="input-1"
                                    v-model="form.username"
                                    required
                                    placeholder="Enter username"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                                id="input-group-2"
                                label="Your Password:"
                                label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="form.password"
                                    type="password"
                                    required
                                    placeholder="Enter password"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group label="select role">
                            <b-form-radio-group
                                    v-model="form.role"
                                    v-on:change="onChange($event)"
                                    :options="role_options"
                                    name="radio-inline"
                                    placeholder="select role"
                            ></b-form-radio-group>
                        </b-form-group>
                        <div class="form" v-if = "form.role !== null && form.role.role_name === 'teacher' ">
                            <b-form-select
                                    v-model="form.department_id"
                                    :options="departments">
                            </b-form-select>
                        </div>
                        <div class="form" v-if = "form.role !== null && form.role.role_name === 'teacher' ">
                            <b-form-group
                                    id="input-group-3"
                                    label="Regalia"
                                    label-for="input-3">
                                <b-form-input
                                        id="input-1"
                                        v-model="form.regalia_en"
                                        required
                                        placeholder="Enter regalia"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="form" v-if = "form.role !== null && form.role.role_name === 'student' ">
                            <b-form-select
                                    v-on:change="onChange($event)"
                                    v-model="form.course"
                                    :options="course">
                            </b-form-select>
                        </div>
                        <div class="form" v-if = "form.course !== null && form.role.role_name === 'student'">
                            <b-form-select
                                    v-model="form.group_id"
                                    :options="groups">
                            </b-form-select>
                        </div>
                        <p>forgot password?</p>
                        <b-button type="submit" variant="primary" class="c-center">Submit</b-button>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Register",
        data() {
            return {
                form: {
                    first_name: '',
                    last_name: '',
                    middle_name: '',
                    role: null,
                    username: '',
                    password: '',
                    regalia_en:'',
                    regalia_kk:'',
                    regalia_ru:'',
                    department_id:null,
                    course:null,
                    group_id:null
                },
                course:[
                    {text:"please select course",value: null},
                    {text:1,value:1},
                    {text:2,value:2},
                    {text:3,value:3},
                    {text:4,value:4}
                ],
                role_options:[],
                departments:[{text:"please select department",value:null}],
                groups:[{text:"please select group",value:null}],
            }
        },
        methods:{
            getDepartments(){
                axios.get('http://backend.iitu.local/api/department/get-all')
                    .then(response => {
                        for (const department of response.data){
                            if (response.data.length <= this.departments.length){ break }
                            this.departments.push({text:department.name_en,value:department.id})
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            getGroups(course){
                axios.get('http://backend.iitu.local/api/group/get-all?course=' + course)
                    .then(response => {
                        console.log(response.data)
                        for (const group of response.data){
                            console.log({text:group.name_en,value:group.id})
                            this.groups.push({text:group.name_en,value:group.id})
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            onSubmit(evt) {
                evt.preventDefault();
                let data ={
                    username:this.form.username,
                    password:this.form.password,
                    password_confirmation: this.form.password,
                    role:this.form.role.role_name
                }

                if (this.form.role.role_name === 'student'){
                    data.group_id = this.form.group_id
                }

                if (this.form.role.role_name === "teacher"){
                    data.department_id = this.form.department_id,
                    data.regalia = {regalia_en: this.form.regalia_en}
                }

                console.log(data)

                if (this.$store.getters.access_token !== null){
                    axios.post('http://backend.iitu.local/api/auth/register',data,
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
                }else {
                    this.$router.push({name:"Login"})
                }
            },
            onChange(event){
                if (event.role_name === 'teacher'){
                    this.getDepartments()
                }
                if (this.form.course !== null){
                    this.getGroups(event)
                }
            }
        },
        mounted() {
            axios.get('http://backend.iitu.local/api/user/get-roles')
                .then(response => {
                    for (const role of response.data){
                        this.role_options.push({text:role.role,value:{role_id:role.id,role_name:role.role}})
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        },

    }
</script>

<style scoped>
    .login-block{
        display: grid;
        /*height: 80vh;*/

        /*margin-top: 8%;*/
        /*width: 30%;*/
    }

    .login{
        /* border: 1px solid red; */
        /*max-width: 50%;*/
        width: 30vw;
        padding: 45px;
        background-color: #353c48;
        color: beige;
        -webkit-box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.19);
        -moz-box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.19);
        box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.19);
    }

    .c-center{
        text-align: center;
    }
    .form{
        margin-top: 15px;
        margin-bottom: 15px;
    }

</style>