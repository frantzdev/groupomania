<template>
    <div class="bloc-modale" v-if="reveleEdit">
        <div class="overlay" @click="toggleModaleEdits"></div>

        <div class="modale-card text-center">
            <div class="btn-modale btn btn-danger" @click="toggleModaleEdits">X</div>
            <h2 class="card-title mt-3">Modifier votre message</h2>
            <div class="form-group my-3 col-12">
                <form>
                    <div class="form-group">
                        <label for="editTtitle" class="mt-3">Votre titre</label>
                        <input type="text" class="form-control mt-3" id="editTitle" 
                            v-model="title">
                    </div>
                    <div class="form-group">
                        <label for="editMessage" class="mt-3">Votre message</label>
                        <textarea name="editMessage" id="editMessage" rows="3" class="form-control mt-3"
                            placeholder="Renseignez votre message ici" v-model="content"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="file" class="mt-3">Ajouter une image</label>
                        <input type="file" class="form-control mt-3" id="file" @change="handleFileUpload" />
                    </div>
                    <div class="form-group mt-5 col-8 mx-auto">
                        <button role=button type="submit" class="btn form-control button"
                            title="valider votre nouveau message" @click="answer">Valider</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Edit',
        props: ['reveleEdit', 'toggleModaleEdit', 'displayEdit'],

        data() {
            return {
                title: "",
                content: "",
                file: ""
            }
        },

        mounted() {
            this.getMessage();
        },
        /* Methode PUT , modification d'un message*/
        methods: {
            answer() {
                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('content', this.content);
                formData.append('image', this.file);
                formData.append('UserId', localStorage.getItem('userId'));
                axios.put('http://localhost:3000/api/message/update/' + sessionStorage.getItem('id'), formData, {
                    headers: {
                        "Authorization": 'Bearer' + " " + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    console.log(response);
                    document.location.href="Messages"
                })
                .catch(error => {
                    console.log(error)
                });
            },

            /* recuperation d'un message par son ID*/
            getMessage(){
                axios.get('http://localhost:3000/api/message/new/' + sessionStorage.getItem('id'), {
                    headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
                })
                .then(response => {  
                    console.log(response.data.id)
                    console.log(this)
                    this.title = response.data.title;
                    this.content = response.data.content;
                    this.file = response.data.image;
                })
                .catch(error => console.log(error)); 
                },

            handleFileUpload(event) {
                this.file = event.target.files[0];
                console.log(this.file)
            },
                        /*test*/
            toggleModaleEdits() {
                window.location.href="Messages"
                // this.displayEdit = false
            }
        }
    }
</script>

