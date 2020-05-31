<template>
    <div class="block">
        <div class="item">
            <div class="date">
                <p>{{item.start}} - {{item.end}}</p>
            </div>
            <div v-if="this.$store.getters.user_role === 'teacher' " class="actions">
                <div class="h5 m-auto">
                    <b-icon-forward-fill v-b-modal="this.id.toString()"/>
                    <b-icon-gear-fill/>
                    <b-icon-x-circle-fill/>
                </div>
            </div>
            <div>
                <b-modal
                        :id="this.id.toString()"
                        ref="modal"
                        title="Add Task"
                        @show="resetModal"
                        @hidden="resetModal"
                        @ok="handleOk"
                >
                    <form ref="form" @submit.stop.prevent="handleSubmit">
                        <b-form-group
                                :state="titleState"
                                label="Title"
                                label-for="title-input"
                                invalid-feedback="Name is required"
                        >
                            <b-form-input
                                    id="title-input"
                                    v-model="title"
                                    :state="titleState"
                                    required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-textarea
                                id="textarea"
                                v-model="content"
                                placeholder="text..."
                                rows="3"
                                max-rows="6"
                        ></b-form-textarea>
                        <b-form-file multiple :file-name-formatter="formatNames" class="file"></b-form-file>
                    </form>
                </b-modal>
            </div>
        </div>
        <div class="task" v-if=" item.task !== null ">
            <div class="title">
                <h5>{{item.task.title}}</h5>
            </div>
            <div class="content">
                <p>
                    {{item.task.content}}
                </p>
            </div>
            <div class="files" v-for="(file,index) in item.task.filenames" :key="index">
                {{index+1}}. <a :href="url + 'uploads/' + file">{{file}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "WeekItem",
        props: ['item'],
        data() {
            return {
                url: null,
                id: this.item.id,
                title: '',
                titleState: null,
                submittedNames: [],
                content: null,
                item_files: []
            }
        },
        methods: {
            formatNames(files) {
                if (files.length === 1) {
                    this.item_files = files
                    return files[0].name
                } else {
                    this.item_files = files
                    return `${files.length} files selected`
                }
            },
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.titleState = valid
                return valid
            },
            resetModal() {
                this.name = ''
                this.titleState = null
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
                let form_data = new FormData()
                form_data.append('week_id', this.id)
                form_data.append('subject_id', this.$route.params.subject_id)
                form_data.append('title', this.title)
                form_data.append('content', this.content)

                if (this.item_files.length > 0) {
                    for (let i = 0; i < this.item_files.length; i++) {
                        let file = this.item_files[i];
                        form_data.append('files[' + i + ']', file);
                    }
                }

                axios.post(process.env.VUE_APP_API + 'api/subject/add-to-week', form_data,
                    {
                        headers: {
                            Authorization: "Bearer " + this.$store.getters.access_token,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        if (response.status === 200) {
                            console.log(response.data)
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            this.$router.push({name: "LoginPage"})
                        }
                        console.log(error)
                    })

                //закрыть модальное окно после нажатие ок
                this.$nextTick(() => {
                    this.$bvModal.hide(this.id.toString())
                })
            },
        },
        mounted() {
            this.url = process.env.VUE_APP_API
        }
    }
</script>

<style scoped>
    .item {
        display: grid;
        grid-template-columns: 0.1fr 0.1fr;
        justify-content: space-between;
        align-items: center;
        /*border-bottom: 1px solid #444c58;*/
    }

    .actions svg {
        color: white;
    }

    .file {
        margin-top: 15px;
    }

    .content{
        width: 80%;
    }

    /*.content pre {*/
    /*    color: white;*/
    /*    white-space: -moz-pre-wrap; !* Mozilla, supported since 1999 *!*/
    /*    white-space: -pre-wrap; !* Opera *!*/
    /*    white-space: -o-pre-wrap; !* Opera *!*/
    /*    white-space: pre-wrap; !* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space *!*/
    /*    word-wrap: break-word; !* IE 5.5+ *!*/
    /*}*/
</style>