<template>
    <div class="bloc-modale" v-if="reveleCommentaire">
        <div class="overlay" @click="toggleModaleCommentaire"></div>

        <div class="modale-card text-center">
            <div class="btn-modale btn btn-danger" @click="toggleModaleCommentaire">X</div>
            <h2 class="my-5">Envoyer un Commentaire</h2>
             <form>
                <div class="form-group">
                    <textarea class="my-1 form-control" placeholder="Votre commentaire" name="" id=""  v-model="textArea"></textarea> 
                </div>
                <div class="form-group">
                    <label for="file" class="mt-3">Ajouter une image</label>
                    <input type="file" class="form-control my-3" id="file" @change="handleFileUpload"/>
                </div>
                <div class="form-group my-5 col-8 mx-auto">
                    <button role=button type="submit" class="btn form-control button"
                    title="valider" @click="validateAnswer">Valider</button>
                </div>
             </form>                  
        </div>
    </div>

</template>


<script>
    import axios from "axios"
    export default {
        name: "NewCommentaire",
        props: ['reveleCommentaire', 'toggleModaleCommentaire'],

        data() {
            return {
                textArea: "",
                file: ""
            }
        },
        methods: {
            validateAnswer() {            
                let formData = new FormData();
                formData.append('text', this.textArea);
                formData.append('image', this.file);
                formData.append('UserId', localStorage.getItem('userId'));
                axios.post( process.env.VUE_APP_API + '/api/commentaire/' + sessionStorage.getItem('id'), formData, 
                {
                headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => {
                console.log(response); 
                this.toggleModaleCommentaire();
                window.reload.href="Messages";
            })          
            .catch(error => {console.log(error)});  
            },  

            handleFileUpload(event){
                this.file = event.target.files[0];
                console.log(this.file)
            },
        }
    }
</script>
