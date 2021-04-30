<template>  
          <div class="row justify-content-center my-5">
              <div class="col-md-6 col">                                                
                <div class="mt-5 col-8 mx-auto">
                    <p class="alter alert-success text-center my-5">Vous êtes sur le point de supprimer définitivement un message<br>
                    Pour confirmer votre choix, veuillez cliquer sur le bouton pour valider la suppression du message !</p>
                    <router-link to="/Messages">
                    <a role=button type="submit" class="btn btn-primary form-control button" title="valider votre nouveau message" @click="deleteMessage">Valider</a>
                    </router-link>   
                </div>
             </div>
          </div>     
</template>

<script>
import axios from 'axios';
export default {
    name: 'Message',

    data() {
        return {
            title: "",
            content: "",
            attachment: ""
        }
    },

    mounted() {
        axios.get('http://localhost:3000/api/message', {
        headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
        })
        .then(response => { 
            this.dataBase = response.data;
            console.log(this.dataBase); 
            //recuperation de l'element ID dans l'adresse
            let url_string = window.location.href
            let url = new URL(url_string);
            let id = url.searchParams.get("id");
            this.id = id
            console.log(this.id)
        })
        .catch(error => console.log(error));          
    },

    methods: {       
            deleteMessage() {
                axios.delete('http://localhost:3000/api/message/' + this.id, {
                headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => {
                console.log(response);
                })          
            .catch(error => {console.log(error)});  
            }        
    }
        
}
</script>