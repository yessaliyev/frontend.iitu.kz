<template>
    <div>
        <NavBar/>
        <div class="block">
            <div class="login-block">
                <div class="login">
                    <h2 class="c-center">dl.iitu.kz</h2>
                    <b-form @submit="onSubmit">
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

                        <b-form-group id="input-group-2" label="Password" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="form.password"
                                    type="password"
                                    required
                                    placeholder="Enter password"
                            ></b-form-input>
                        </b-form-group>
                        <p>forgot password?</p>
                        <b-button type="submit" variant="primary" class="c-center">Submit</b-button>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/navigation/NavBar";

    export default {
        name: "Login",
        components: {
            NavBar
        },
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.$store.dispatch('retrieveUser', {
                    username: this.form.username,
                    password: this.form.password
                })
                    .then(response => {
                        switch (response.data.role.role) {
                            case 'student':
                                this.$router.push({name: "Courses"})
                                break;
                            case 'admin':
                                this.$router.push({name: "Admin"})
                                break
                            case 'teacher':
                                this.$router.push({name: "Courses"})
                                break
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    .login-block {
        display: grid;
        /* border: 2px solid red; */
        /*height: 80vh;*/
        align-items: center;
        justify-items: center;
        margin-top: 8%;
    }

    .login {
        /* border: 1px solid red; */
        max-width: 50%;
        width: 30%;
        padding: 55px;
        background-color: #353c48;
        color: beige;
        -webkit-box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.19);
        -moz-box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.19);
        box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.19);
    }

    .c-center {
        text-align: center;
    }


</style>