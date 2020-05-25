<template>
    <div class="item">
        <div class="date">
            <p>{{item.start}} - {{item.end}}</p>
        </div>
        <div v-if="this.$store.getters.user_role === 'teacher' " class="actions">
            <div class="h5 m-auto">
                <router-link :to="{ name: 'GroupAttendancePage',params: { lesson_id: 1}}">
                    <b-icon-forward-fill/>
                </router-link>
                <router-link :to="{ name: 'CoursePage'}">
                    <b-icon-gear-fill/>
                </router-link>
                <router-link :to="{ name: 'CoursePage'}">
                    <b-icon-x-circle-fill/>
                </router-link>
            </div>
        </div>

        <div>
            <b-button v-b-modal = "this.id.toString()">Open Modal</b-button>
            <b-modal
                    :id = "this.id.toString()"
                    ref="modal"
                    title="Submit Your Name"
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="handleOk"
            >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                            :state="nameState"
                            label="Name"
                            label-for="name-input"
                            invalid-feedback="Name is required"
                    >
                        <b-form-input
                                id="name-input"
                                v-model="name"
                                :state="nameState"
                                required
                        ></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WeekItem",
        props: ['item'],
        data() {
            return {
                id: this.item.id,
                name: '',
                nameState: null,
                submittedNames: []
            }
        },
        methods: {
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            },
            resetModal() {
                this.name = ''
                this.nameState = null
            },
            handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault()
                // Trigger submit handler
                this.handleSubmit()
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return
                }
                // Push the name to submitted names
                this.submittedNames.push(this.name)
                // Hide the modal manually
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
            }
        }
    }
</script>

<style scoped>
    .item {
        display: grid;
        grid-template-columns: 0.1fr 0.1fr;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #444c58;
    }
    .actions svg{
        color: white;
    }
</style>