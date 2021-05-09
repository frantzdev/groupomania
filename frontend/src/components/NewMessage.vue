<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay" @click="toggleModale"></div>

        <div class="modale-card">
            <div class="btn-modale btn btn-danger" @click="toggleModale">x</div>
            <h2 class="mt-5">Nouveau message</h2>
            <form>
                <div class="form-group">
                    <label for="NewMessageTitle" class="mt-3">Votre titre</label>
                    <input type="text" class="form-control mt-3" id="NewMessageTitle"
                        placeholder="Veuillez renseigner le titre" v-model="title">
                </div>
                <div class="form-group">
                    <label for="message" class="mt-3">Votre message</label>
                    <textarea name="message" id="message" rows="3" class="form-control mt-3"
                        placeholder="Renseignez votre message" v-model="content"></textarea>
                </div>
                <div class="form-group">
                    <label for="file" class="mt-3">Ajouter une image</label>
                    <input type="file" class="form-control mt-3" id="file" @change="handleFileUpload" />
                </div>
                <div class="form-group my-5 col-8 mx-auto">
                    <button role=button type="submit" class="btn form-control button"
                        title="valider votre nouveau message" @click="setMessage">Valider</button>
                </div>
            </form>
        </div>
    </div>

</template>


<script>
    import axios from "axios"
    export default {
        name: "NewMessage",
        props: ['revele', 'toggleModale'],

        data() {
            return {
                title: "",
                content: "",
                image: "",
                file: ""
            }
        },
        methods: {
            setMessage() {     /*POST un nouveau Message*/
                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('content', this.content);
                formData.append('image', this.file);
                formData.append('UserId', localStorage.getItem('userId'));
                axios.post('http://localhost:3000/api/message/', formData, {
                        headers: {
                            "Authorization": 'Bearer' + " " + localStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        console.log(response);
                        document.location.href = "Messages"
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
    .bloc-modale {
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

    .overlay {
        /*arriere plan quand pop */
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .modale-card {
        /*carte*/
        background: #f1f1f1;
        color: "#333333";
        width: 35%;
        padding: 10px 50px 10px 50px;
        position: fixed;
        border-radius: 20px 10px 20px 20px;
        box-shadow: 5px 5px 50px;
    }

    .btn-modale {
        /*bouton du popup*/
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>