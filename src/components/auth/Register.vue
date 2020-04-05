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
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="form.username"
                                    required
                                    placeholder="Enter username"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                                id="input-group-2"
                                label="Your Name:"
                                label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="form.password"
                                    type="password"
                                    required
                                    placeholder="Enter password"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group label="Inline radios (default)">
                            <b-form-radio-group
                                    v-model="form.role"
                                    v-on:change="onChange($event)"
                                    :options="role_options"
                                    name="radio-inline"
                                    placeholder="select role"
                            ></b-form-radio-group>
                        </b-form-group>
                        <b-form-select
                                v-if = "form.role !== null && form.role.role_name === 'teacher' "
                                v-model="form.department_id"
                                :options="departments">
                        </b-form-select>
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
                    department_id:null
                },
                role_options:[],
                departments:[],
                groups:[],
                course:''
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
            getGroups(){
                axios.get('http://backend.iitu.local/api/group/get')
                    .then(response => {
                        this.departments = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            onSubmit(evt) {
                evt.preventDefault();

                this.$store.dispatch('retrieveUser',{
                    username: this.form.username,
                    password: this.form.password
                })
                    .then(response => {
                        console.log(response.data)
                        if (response.data.roles[0].role === 'student'){
                            this.$router.push({name:"Student",params:{id:response.data.roles[0].pivot.user_id}})
                        }
                        this.$router.push({name: "student",params:{id:response.data.id}})
                    });
            },
            onChange(event){
                if (event.role_name === 'teacher'){
                    this.getDepartments()
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
        }
    }
</script>

<style scoped>
    .login-block{
        display: grid;
         border: 2px solid red;
        width: 30%;
        /*height: 80vh;*/

        /*margin-top: 8%;*/
        /*width: 30%;*/
    }

    .login{
        /* border: 1px solid red; */
        /*max-width: 50%;*/
        /*width: 30%;*/
        padding: 55px;
        background-color: #353c48;
        color: beige;
        -webkit-box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.19);
        -moz-box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.19);
        box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.19);
    }

    .c-center{
        text-align: center;
    }

</style>