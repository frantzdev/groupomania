<template>  
          <div class="row justify-content-center my-5">
              <div class="col-md-6 col">
                  <div class="card mt-5 col mx-auto">
                      <div class="card-body">
                          <form>
                              <div class="form-group">
                                  <label for="NewMessageTitle" class="mt-3">Votre titre{{file}}</label>
                                  <input type="text" class="form-control mt-3" id="NewMessageTitle"
                                      placeholder="Veuillez renseigner le titre" v-model="title">
                              </div>
                              <div class="form-group">
                                  <label for="message" class="mt-3">Votre message</label>
                                  <textarea name="message" id="message" rows="4" class="form-control mt-3"
                                      placeholder="Renseignez votre message içi" v-model="content"></textarea>
                              </div>
                              <div class="form-group">
                                  <label for="file" class="mt-3">Ajouter une image</label>
                                  <input type="file" class="form-control mt-3" id="file" @change="handleFileUpload"/>
                              </div>
                              <div class="form-group mt-5 col-8 mx-auto">
                                 <router-link to="/Messages">
                                    <a role=button type="submit" class="btn btn-primary form-control button" title="valider votre nouveau message"
                                    @click="setMessage">Valider</a>
                                </router-link>   
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>     
</template>

<script>
import axios from "axios"
export default {
    name: "FormNewMessage",

    data() {
        return {
            title: "",
            content: "",
            image: "",
            file: ""
        }
    }, 
    methods: {
        setMessage() {
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('content', this.content);
            formData.append('image', this.file);
            formData.append('UserId', localStorage.getItem('userId'));
            axios.post('http://localhost:3000/api/message/new', formData, { 
            // UserId: localStorage.getItem('userId'),
            // title: this.title,
            // content: this.content,
            // image: this.image  
            // },  
            // {    
            headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}                   
            })
            .then(response => {
            console.log(response);
            })          
            .catch(error => {console.log(error)});  
        },

        handleFileUpload(event){
        this.file = event.target.files[0];
        console.log(this.file)
        }  
    }
}
</script>


