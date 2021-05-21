<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light fontPolice">
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
            <div class="row backWall">
                <div class="col-lg-3 bg"></div>
                                                
                    <div class="col-lg-6 fontPolice">
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
                                <button class="btn col-lg-3 col-md-4 col-6 my-5 button" role="button" type="button" @click="toggleModale"
                                title="Créer un nouveau post">Créer un sujet</button>
                            </div>

                                                        <!-- affichage du contenant d'un post sur le mur  -->
                        <div class="card mt-5 col-10 mx-auto borderMessage" v-for="item in dataBase" :key="item.idMessage">   
                            <div class="card-body">
                                <p class="card-text"><small class="text-muted">{{item.firstname}} {{item.lastname}} le {{item.createdAt | formatDate}}</small></p>

                                <h5 class="card-title">{{ item.title }}</h5>
                                
                                <img :src= "item.image" class="card-img-top d-block w-75 mx-auto my-3">
                                
                                <p class="pt-1">{{ item.content }}</p>  
                                <div class="row d-flex justify-content-center">   <!-- affiche le modale pour poster un Commentaire -->
                                    <NewCommentaire :reveleCommentaire ="reveleCommentaire" :toggleModaleCommentaire ="toggleModaleCommentaire"/> 
                                    <button class="btn col-md-3 col-8 mx-2 mt-3 button" role="button" type="button" @click="toggleModaleCommentaire(item.idMessage)"
                                     title="Répondre au méssage">Répondre</button>
                                 

                                                                <!-- affiche le modale pour modifier un Message -->
                                    <Edit :reveleEdit ="reveleEdit" :toggleModaleEdit ="toggleModaleEdit" v-if="displayEdit"/> 
                                    <button class="btn col-md-3 col-8 mx-2 mt-3 button" role="button" type="button" @click="toggleModaleEdit(item.idMessage)"
                                    title="Modifier le message" v-if="item.idUser == idStorage || isAdmin == 'true'" >Editer</button>             

                                                                     <!-- supprimer un message -->
                                    <button type="button" role="button" class="btn col-md-3 col-8 mx-2 mt-3 button"
                                    @click="deleteMessage(item.idMessage)" title="Supprimer le message" v-if="item.idUser == idStorage || isAdmin == 'true'">Supprimer</button>  
                                </div>
                            </div>                                  
                                                                        <!-- affiche les commentaires -->
                                <div v-for="commentaire in dataBaseCommentaire" :key="commentaire.idCommentaire">   
                                    <div v-if="commentaire.idMessage === item.idMessage" class="textCommentaire">

                                        <p class="py-3"><small class="px-1 text-muted ">Réponse de {{commentaire.firstname}} {{commentaire.lastname}}
                                         le {{commentaire.createdAtCommentaire | formatDate}}</small></p>

                                        <img :src= "commentaire.image" class="card-img-top d-block w-75 mx-auto my-3">

                                        <p class="px-1">{{commentaire.text}}</p>

                                                                        <!-- formulaire pour la modification d'un commentaire -->                                        
                                        <div class="bloc-modale" v-if="displayEditCommentaire">
                                            
                                            <div class="overlay" @click="toggleModaleEditsCommentaire"></div>

                                            <div class="modale-card text-center">
                                                <div class="btn-modale btn btn-danger" @click="toggleModaleEditsCommentaire">X</div>
                                                <form class="form-group">
                                                    <label for="editCommentaire" class="mt-3">Votre commentaire</label>
                                                    <textarea name="editCommentaire" id="editCommentaire" rows="3" class="form-control mt-3" v-model="texte"></textarea>
                                                    <div class="form-group">
                                                        <label for="file" class="mt-3">Modifier l'image</label>
                                                        <input type="file" class="form-control mt-3" id="file" value="blabla" @change="handleFileUpload" />
                                                    </div>
                                                    <div class="form-group col-4 mx-auto">
                                                    <button type="submit" role="button" class="btn col-md-3 col-8 mx-2 mt-3 button form-control" title="Supprimer l'image et revenir au mur"
                                                     @click="delImageCommentaire()" v-if="commentaire.iduser == idStorage || isAdmin == 'true'">Supprimer l'image</button>
                                                    </div>     
                                                    <div class="form-group col-4 mx-auto">
                                                        <button type="submit" role="button" class="btn col-md-3 col-8 mx-2 mt-3 button form-control" title="Valider l'édition du commentaire"
                                                        v-if="commentaire.iduser == idStorage || isAdmin == 'true'"
                                                        @click="editCommentaire()">Valider</button>
                                                    </div>    
                                                </form>
                                            </div>  
                                        </div>
                                                                            
                                        <div class="buttonCommentaire">     <!-- répondre au commentaire -->
                                            <button type="button" role="button" class="btn col-1" alt="répondre au commentaire" @click="toggleModaleCommentaire(item.idMessage)"
                                             title="Répondre au commentaire"><i class="fas fa-reply"></i></button>
                                                                            <!-- modifier un commentaire -->
                                            <button type="button" role="button" class="btn col-1" alt="editer" title="editer le commentaire"
                                             v-if="commentaire.iduser == idStorage || isAdmin == 'true'"
                                             @click="getOneCommentaire(commentaire.idCommentaire)"><i class="far fa-edit"></i></button>
                                                                            <!-- supprimer un commentaire -->
                                            <button type="button" role="button" class="btn col-1" alt="supprimer" title="supprimer le commentaire"
                                             v-if="commentaire.iduser == idStorage || isAdmin == 'true'" 
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
                editfileCommentaire: "",
                texte: "",
                displayEditCommentaire: false,
                displayDeleteUser: false,
                displayEdit: false,
                revele: false,
                reveleEdit: false,
                reveleCommentaire: false,
                idStorage: "",
                isAdmin: "",
                userFirstname: "",
                dataBase: [
						{
							title: "",
                            content:"",
                            image: "",
                            firstname: "",
                            lastname: "",
                            idMessage: "",
                            idUser: "",
                            isAdmin: "",
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
                        lastname: "",
                        iduser: ""
                    }
                ]    
            }
        },
        mounted() {            
                    /* Methode GET RECUPERATION DES MESSAGES*/
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
                     /*affiche / masque le formulaire pour la création d'un message*/
            toggleModale(){
			this.revele = !this.revele
            },

                     /*affiche / masque le formulaire pour l'édition d'un message*/
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
                window.location.href="Messages";                               
            })          
            .catch(error => {console.log(error)});  
            },

                            /*affiche / masque le formulaire pour l'édition d'un commentaire*/
            toggleModaleEditsCommentaire() {
                this.displayEditCommentaire = !this.displayEditCommentaire;
            },

                            /* recuperation d'un commentaire par son ID*/
            getOneCommentaire(recoverItemId){
                this.toggleModaleEditsCommentaire()
                let getIdCommentaire = recoverItemId
                sessionStorage.setItem('idCommentaire', getIdCommentaire)
                axios.get('http://localhost:3000/api/commentaire/' + sessionStorage.getItem('idCommentaire'), {
                    headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
                })
                .then(response => {  
                    //console.log(response.data)
                    this.texte = response.data.text;
                    this.editfileCommentaire = response.data.image;
                })
                .catch(error => console.log(error)); 
            },

                                /*edition d'un commentaire par son ID*/
            editCommentaire() {
                let formData = new FormData();
                formData.append('text', this.texte);
                formData.append('image', this.editfileCommentaire);
                formData.append('idMessage', this.idMessage);
                formData.append('UserId', localStorage.getItem('userId'));
                axios.put('http://localhost:3000/api/commentaire/' + sessionStorage.getItem('idCommentaire'), formData, {
                headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => {
                console.log(response);                   
                this.toggleModaleEditsCommentaire()                             
            })          
            .catch(error => {console.log(error)});  
            },
                                /*supprimer une image dans le commentaire*/
            delImageCommentaire() {             
               axios.put('http://localhost:3000/api/commentaire/image/' + sessionStorage.getItem('idCommentaire'), 
                {
                text: this.texte,
                image: this.editfileCommentaire
                },
                {headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => {
                console.log(response);  
                console.log(this.editfileCommentaire);
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
            },
                                                
             handleFileUpload(event) {
                this.editfileCommentaire = event.target.files[0];
                console.log(this.editfileCommentaire)
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
    padding: 0px 10px 0px 10px;
    border-color: rgb(172, 171, 171);
    border-style: solid;
    border-width: 1px 0px 1px 0px;
}

.borderMessage {
    border: 2px solid rgb(172, 171, 171);
    border-radius: 10px;
    box-shadow: -10px -10px 10px rgb(212, 209, 209);
}

.alignButton {
    text-align : center;
}

.alert {
    align-items: baseline;
}

.backWall {
    height: 1000px;
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

@media all and (max-width: 991px) {
    .backWall {
        height: 0%;
    }
}
</style>



