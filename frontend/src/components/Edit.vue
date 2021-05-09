<template>
    <div class="bloc-modaleEdit" v-if="reveleEdit">
        <div class="overlayEdit" @click="toggleModaleEdit"></div>

        <div class="modale-cardEdit text-center">
            <div class="btn-modaleEdit btn btn-danger" @click="toggleModaleEdit">X</div>
            <h2 class="card-title mt-3">Modifier votre message</h2>
            <div class="form-group my-3 col-12">
                <form>
                    <div class="form-group">
                        <label for="editTtitle" class="mt-3">Votre titre</label>
                        <input type="text" class="form-control mt-3" id="editTitle" placeholder="Veuillez renseigner le titre"
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
        props: ['reveleEdit', 'toggleModaleEdit'],

        data() {
            return {
                title: "",
                content: "",
                image: "",
                file: "",
                dataBase: [{
                    title: "",
                    content: "",
                    image: ""
                }]
            }
        },
        /* Methode POST , modification d'un message*/
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
                        document.location.href = "Messages"
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            handleFileUpload(event) {
                this.file = event.target.files[0];
                console.log(this.file)
            }
        }
    }
</script>

<style>
    .bloc-modaleEdit {
        /*position du bloc*/
        position: fixed;
        top: 0px;
        bottom: 0;
        left: 0px;
        right: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }

    .overlayEdit {
        /*arriere plan quand pop */
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .modale-cardEdit {
        /*carte*/
        background: #f1f1f1;
        color: "#333333";
        width: 40%;
        padding: 10px 50px 10px 50px;
        position: fixed;
        border-radius: 20px 10px 20px 20px;
        box-shadow: 5px 5px 50px;
    }

    .btn-modaleEdit {
        /*bouton du popup*/
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>