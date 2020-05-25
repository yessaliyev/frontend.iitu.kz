<template>
    <div class="item">
        <div class="date">
            <p>{{item.start}} - {{item.end}}</p>
        </div>
        <div v-if="this.$store.getters.user_role === 'teacher' " class="actions">
            <div class="h5 m-auto">
                    <b-icon-forward-fill v-b-modal = "this.id.toString()"/>
                    <b-icon-gear-fill/>
                    <b-icon-x-circle-fill/>
            </div>
        </div>

        <div>
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
                    <b-form-textarea
                            id="textarea"
                            v-model="this.text"
                            placeholder="text..."
                            rows="3"
                            max-rows="6"
                    ></b-form-textarea>
                    <b-form-file multiple :file-name-formatter="formatNames" class="file"></b-form-file>
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
                submittedNames: [],
                text: '',
                item_files:[]
            }
        },
        methods: {
            formatNames(files) {
                if (files.length === 1) {
                    this.item_files = files
                    return files[0].name
                } else {
                    this.item_files = files
                    console.log(this.item_files)
                    return `${files.length} files selected`
                }
            },
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

                //post_request

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

    .file{
        margin-top: 15px;
    }
</style>