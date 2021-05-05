<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Bonjour {{userFirstname}}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div class="navbar-nav">        
                            <router-link to="/">
                                <a class="nav-link active" aria-current="page" @click="clearUser()">Se déconnecter</a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>


        <div class="container-full">
            <div class="row">
                <div class="col-md-3 bg"></div>

                    <div class="col-md-6">
                        <img src="../../public/logos/capture.png" class="d-block w-100" alt="photo du siège d'entreprise">
                            
                            <div class="text-center">
                                <router-link to="/messagenew">
                                <a class="btn btn-primary col-lg-3 col-md-4 col-6 mt-5 button" role="button" type="button"
                                title="Créer un nouveau post">Créer un sujet</a>
                                </router-link>
                            </div>
    
                        <div class="card mt-5 col-10 mx-auto shadow-lg" v-for="item in dataBase" :key="item.idMessage">   
                            <div class="card-body">
                                <p class="card-text"><small class="text-muted">{{item.firstname}} {{item.lastname}} le {{item.createdAt | formatDate}}</small></p>
                                <h5 class="card-title">{{ item.title }}</h5>
                                <img :src= "item.image" class="card-img-top d-block w-50 mx-auto my-3">
                                <p>{{ item.content }}</p>  
                                <div class="form-floating"> 
                                    <textarea class="mb-3 form-control" name="" id="" v-show="answer" @blur="answer= false" ></textarea> 
                                </div>
                                 <button type="button" role="button" class="btn btn-primary col-2 mx-2 mt-3 button" @click="displayAnswerBox">Commenter</button> 
                                <router-link :to="{ path: '/update?id=' + item.idMessage}" v-if="item.idUser == idStorage">              
                                    <button type="button" role="button" class="btn btn-primary col-2 mx-2 mt-3 button">Editer</button>
                                </router-link>                                 
                                    <button type="button" role="button" class="btn btn-primary col-2 mx-2 mt-3 button"
                                    @click="deleteMessage(item.idMessage)" v-if="item.idUser == idStorage || isAdmin == 'true'">Supprimer</button>     
                                <button type="button" role="button" class="btn btn-primary col-2 mx-2 mt-3 button" v-show="answer">Valider</button>                                
                            </div>
                        </div>
                    </div>
                    
                <div class="col-md-3 bg"></div>
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                idStorage: "",
                isAdmin: "",
                userFirstname: "",
                answer: false,
                dataBase: [
						{
							title: "",
                            content:"",
                            image: "",
                            firstname: "",
                            lastname: "",
                            idMessage: "",
                            idUser: "",
                            messageUserId: "",
                            createdAt: ""
						}						
				]            
            }
        },
        mounted() {
            axios.get('http://localhost:3000/api/message', {
            headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => { 
                this.dataBase = response.data;
                this.idStorage = localStorage.getItem('userId');
                this.isAdmin = localStorage.getItem('isAdmin');
                this.userFirstname = localStorage.getItem('userFirstname');
                console.log(this.dataBase);
                console.log(this.idStorage)
            })
            .catch(error => console.log(error));          
        },

        methods: {
             deleteMessage(recoverItemId) {
                let deleteIdMessage = recoverItemId
                axios.delete('http://localhost:3000/api/message/' + deleteIdMessage, {
                headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => {
                console.log(response);             
                document.location.href="Messages";                               
            })          
            .catch(error => {console.log(error)});  
            },
            
             clearUser() {
               return localStorage.clear();
            },
            displayAnswerBox() {
                this.answer = true;
            }     
        }        
    }
</script>



