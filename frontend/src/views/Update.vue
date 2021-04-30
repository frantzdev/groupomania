<template>  
          <div class="row justify-content-center my-5">
              <div class="col-md-6 col">
                  <div class="card mt-5 col mx-auto">
                      <div class="card-body">
                          <form>
                              <div class="form-group">
                                  <label for="NewMessageTitle" class="mt-3">Votre titre</label>
                                  <input type="text" class="form-control mt-3" id="NewMessageTitle"
                                      placeholder="Veuillez renseigner le titre" v-model="title">
                              </div>
                              <div class="form-group">
                                  <label for="message" class="mt-3">Votre message</label>
                                  <textarea name="message" id="message" rows="4" class="form-control mt-3"
                                      placeholder="Renseignez votre message içi" v-model="content"></textarea>
                              </div>
                              <div class="form-group">
                                  <label for="NewMessageImage" class="mt-3">Ajouter une image</label>
                                  <input type="text" class="form-control mt-3" id="NewMessageImage"
                                      placeholder="Ajouter le lien de votre image" v-model="attachment">
                                      <button type="button" class="btn btn-primary mt-3">Ajouter</button>
                              </div>
                              <div class="form-group mt-5 col-8 mx-auto">
                                 <router-link to="/Messages">
                                    <a role=button type="submit" class="btn btn-primary form-control" title="valider votre nouveau message" @click="answer">Valider</a>
                                </router-link>   
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>     
</template>

<script>
import axios from 'axios';
export default {
    name: 'Update',

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
            answer() {
                axios.put('http://localhost:3000/api/message/update/'+ this.id, {
                   UserId: localStorage.getItem('userId'),
                   title: this.title,
                   content: this.content,
                   attchment: this.attachment
                },
                {
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