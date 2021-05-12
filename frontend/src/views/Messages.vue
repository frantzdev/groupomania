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
                            <a class="nav-link active navSupCompte" aria-current="page" title="Supprimer son compte" @click="deleteUser">Supprimer le compte</a>
                        </div>
                        <div class="navbar-nav">                                  
                            <a class="nav-link active  text-decoration-underline" title="Se deconnecter" aria-current="page" @click="clearUser()" href="http://localhost:8080/">Se déconnecter</a>                        
                        </div>
                    </div>
                </div>
            </nav>
        </header>


        <div class="container-full">
            <div class="row">
                <div class="col-lg-3 bg"></div>
                                                
                    <div class="col-lg-6">
                        <img src="../../public/logos/capture.png" class="d-block w-100" alt="photo du siège d'entreprise">

                                                    <!-- fenetre alert pour la suppression du compte -->
                         <div class="alert alert-success mt-3 mx-3 d-flex justify-content-around" v-if="displayDeleteUser">                            
                            <p>Confirmer la suppression du compte</p>
                            <button class="btn button mx-3 col-md-2 col-4 mt-1" @click="confirmDeleteUser">Oui</button>
                            <button class="btn button col-md-2 mt-1 col-4" @click="deleteUser">Non</button>
                        </div>

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
                                
                                <img :src= "item.image" class="card-img-top d-block w-75 mx-auto my-3">
                                
                                <p>{{ item.content }}</p>  
                                <div class="row d-flex justify-content-center">                                <!-- affiche le modale pour poster un Commentaire -->
                                    <NewCommentaire :reveleCommentaire ="reveleCommentaire" :toggleModaleCommentaire ="toggleModaleCommentaire"/> 
                                    <button class="btn col-md-3 col-8 mx-2 mt-3 button" role="button" type="button" @click="toggleModaleCommentaire(item.idMessage)"
                                     title="Créer un nouveau commentaire">Répondre</button>
                                 

                                                                <!-- affiche le modale pour modifier un Message -->
                                    <Edit :reveleEdit ="reveleEdit" :toggleModaleEdit ="toggleModaleEdit" :displayEdit="displayEdit" v-if="displayEdit"/> 
                                    <button class="btn col-md-3 col-8 mx-2 mt-3 button" role="button" type="button" @click="toggleModaleEdit(item.idMessage)"
                                    title="Créer un nouveau post" v-if="item.idUser == idStorage || isAdmin == 'true'" >Editer</button>             

                                                                     <!-- supprimer un message -->
                                    <button type="button" role="button" class="btn col-md-3 col-8 mx-2 mt-3 button"
                                    @click="deleteMessage(item.idMessage)" v-if="item.idUser == idStorage || isAdmin == 'true'">Supprimer</button>  
                                </div>

                            </div>
                                                               
                                                                        <!-- affiche les commentaires -->
                                <div v-for="commentaire in dataBaseCommentaire" :key="commentaire.idCommentaire">   
                                    <div v-if="commentaire.idMessage === item.idMessage" class="textCommentaire">

                                        <p>{{commentaire.firstname}} {{commentaire.lastname}} le {{commentaire.createdAtCommentaire | formatDate}}</p>

                                        <img :src= "commentaire.image" class="card-img-top d-block w-50 mx-auto my-3">

                                        <p>{{commentaire.text}}</p>
                                        
                                        <div class="buttonCommentaire">
                                            <button type="button" role="button" class="btn col-1" alt="editer" title="editer"><i class="far fa-edit"></i></button>
                                            <button type="button" role="button" class="btn col-1" alt="supprimer" title="supprimer" 
                                            @click="deleteCommentaire(commentaire.idCommentaire)"><i class="fas fa-trash-alt"></i></button>                                           
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    
                <div class="col-lg-3 bg"></div>
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
                displayDeleteUser: false,
                displayEdit: false,
                revele: false,
                reveleEdit: false,
                reveleCommentaire: false,
                idStorage: "",
                isAdmin: "",
                userFirstname: "",
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
                        updatedAtCommentaire : "",
                        firstname: "",
                        lastname: ""
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
                console.log(this.dataBaseCommentaire);                
            })
            .catch(error => console.log(error));        
        },


        methods: {  
            toggleModale(){
			this.revele = !this.revele
            },

            toggleModaleEdit(recoverItemId){
                this.displayEdit = true;
                let getIdMessage = recoverItemId;
                sessionStorage.setItem('id', getIdMessage);
                this.reveleEdit = !this.reveleEdit;
            },

                    /*logique pour recuperer l'id du Message sur lequel on souhaite poster un commentaire*/
            toggleModaleCommentaire(recoverItemId){
                let getIdMessage = recoverItemId
                sessionStorage.setItem('id', getIdMessage)
                this.reveleCommentaire = !this.reveleCommentaire
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

                        /*suppression d'un compte utilisateur*/
            confirmDeleteUser() {
                axios.delete('http://localhost:3000/api/auth/' + localStorage.getItem('userId'), {
                headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => {
                console.log(response);
                localStorage.clear();             
                document.location.href="/";                               
            })          
            .catch(error => {console.log(error)});  
            },
                        /*vide le local storage à la déconnection d'un utilisateur*/
             clearUser() {
               return localStorage.clear();
            },
                        /*masque le fenetre de confirmation suppression utilisateur*/
            deleteUser() {
                this.displayDeleteUser = !this.displayDeleteUser;
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
.alert {
    align-items: baseline;
}
.navSupCompte {
    cursor: pointer;
}
@media all and (max-width: 768px) {
.alert {
    display: flex;
    flex-direction: column; 
    align-items: center;  
}
}
</style>



