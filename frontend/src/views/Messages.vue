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

                                                    <!-- créer un nouveau post -->
                            <div class="text-center">
                                <NewMessage :revele ="revele" :toggleModale ="toggleModale"/>
                                <button class="btn col-lg-3 col-md-4 col-6 mt-5 button" role="button" type="button" @click="toggleModale"
                                title="Créer un nouveau post">Créer un sujet</button>
                            </div>

                                                        <!-- affichage du contenant d'un post sur le mur  -->
                        <div class="card mt-5 col-10 mx-auto shadow-lg" v-for="item in dataBase" :key="item.idMessage">   
                            <div class="card-body">
                                <p class="card-text"><small class="text-muted">{{item.firstname}} {{item.lastname}} le {{item.createdAt | formatDate}}</small></p>

                                <h5 class="card-title">{{ item.title }}</h5>
                                
                                <img :src= "item.image" class="card-img-top d-block w-50 mx-auto my-3">
                                
                                <p>{{ item.content }}</p>  
                                                                <!-- affiche le modale pour poster un Commentaire -->
                                    <NewCommentaire :reveleCommentaire ="reveleCommentaire" :toggleModaleCommentaire ="toggleModaleCommentaire"/> 
                                    <button class="btn col-2 mx-2 mt-3 button" role="button" type="button" @click="toggleModaleCommentaire(item.idMessage)"
                                     title="Créer un nouveau commentaire">Commentaire</button>
                                 

                                                                <!-- affiche le modale pour modifier un Message -->
                                    <Edit :reveleEdit ="reveleEdit" :toggleModaleEdit ="toggleModaleEdit"/> 
                                    <button class="btn col-2 mx-2 mt-3 button" role="button" type="button" @click="toggleModaleEdit(item.idMessage)"
                                    title="Créer un nouveau post" v-if="item.idUser == idStorage || isAdmin == 'true'" >Editer</button>             

                                                                     <!-- supprimer un message -->
                                    <button type="button" role="button" class="btn col-2 mx-2 mt-3 button"
                                    @click="deleteMessage(item.idMessage)" v-if="item.idUser == idStorage || isAdmin == 'true'">Supprimer</button>                                 
                            </div>
                                                               
                                                                        <!-- affiche les commentaires -->
                                <div v-for="commentaire in dataBaseCommentaire" :key="commentaire.idCommentaire">   
                                    <div v-if="commentaire.idMessage === item.idMessage" class="textCommentaire">

                                        <p>nom prenom et date</p>

                                        <p>{{commentaire.text}}</p>

                                        <img :src= "commentaire.image" class="card-img-top d-block w-50 mx-auto my-3">
                                        
                                        <div class="buttonCommentaire">
                                            <button type="button" role="button" class="btn col-1" alt="editer" title="editer"><i class="far fa-edit"></i></button>
                                            <button type="button" role="button" class="btn col-1" alt="supprimer" title="supprimer" 
                                            @click="deleteCommentaire(commentaire.idCommentaire)"><i class="fas fa-trash-alt"></i></button>                                           
                                        </div>
                                    </div>
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
import NewMessage from '../components/NewMessage'
import Edit from '../components/Edit'
import NewCommentaire from '../components/NewCommentaire'
    export default {
        name: "Messages",
        components: {
            NewMessage,
            Edit,
            NewCommentaire
        },
        data() {
            return {
                revele: false,
                reveleEdit: false,
                reveleCommentaire: false,
                idStorage: "",
                isAdmin: "",
                userFirstname: "",
                answer: false,
                textArea:"",
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
				],
                dataBaseCommentaire: [
                    {
                        text: "",
                        image: "", 
                        idMessage: "",
                        idCommentaire: "",
                        createdAtCommentaire : "",
                        updatedAtCommentaire : ""
                    }
                ]            
            }
        },
        mounted() { /* Methode GET RECUPERATION DES MESSAGES*/
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
                sessionStorage.clear();
            })
            .catch(error => console.log(error)); 
            
                    /* Methode GET RECUPERATION DES COMMENTAIRES*/
            axios.get('http://localhost:3000/api/commentaire', {
            headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => { 
                this.dataBaseCommentaire = response.data;
                // this.idStorage = localStorage.getItem('userId');
                // this.isAdmin = localStorage.getItem('isAdmin');
                // this.userFirstname = localStorage.getItem('userFirstname');
                console.log(this.dataBaseCommentaire);
                
            })
            .catch(error => console.log(error));        
        },


        methods: {             
                            /*METHODE GET récupération d'un message avec son ID pour le modifier*/
            toggleModaleEdit(recoverItemId){
            let getIdMessage = recoverItemId
            sessionStorage.setItem('id', getIdMessage)
            axios.get('http://localhost:3000/api/message/new/' + getIdMessage, {
                headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => { 
                this.reveleEdit = !this.reveleEdit
                console.log(response)
            })
            .catch(error => console.log(error)); 
            },

                                /* Methode DELETE SUPPRESSION D'UN MESSAGE*/
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
            },
                    /* suppression d'un commentaire*/
            deleteCommentaire(recoverIdCommentaire) {
                let deleteIdCommentaire = recoverIdCommentaire
                axios.delete('http://localhost:3000/api/commentaire/' + deleteIdCommentaire, {
                headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => {
                console.log(response);             
                document.location.href="Messages";                               
            })          
            .catch(error => {console.log(error)});  
            },

            toggleModale(){
			this.revele = !this.revele
            },
                    /*logique pour recuperer l'id du Message sur lequel on souhaite poster un commentaire*/
            toggleModaleCommentaire(recoverItemId){
                let getIdMessage = recoverItemId
                sessionStorage.setItem('id', getIdMessage)
                this.reveleCommentaire = !this.reveleCommentaire
            }
        }
    }
</script>

<style>

.buttonCommentaire {
    text-align: right;
}
.textCommentaire {
    vertical-align: middle;
    padding: 0px 0px 0px 10px;
    border: 1px solid rgb(176, 180, 176);
}
.alignButton {
    text-align : center;
}
</style>



