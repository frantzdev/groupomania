<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Bonjour Nom prénom</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div class="navbar-nav">        
                            <router-link to="/">
                                <a class="nav-link active" aria-current="page">Se déconnecter</a>
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
                                <a class="btn btn-primary col-lg-3 col-md-4 col-6 mt-5 ombre" role="button"
                                title="Créer un nouveau post">Créer un sujet</a>
                                </router-link>
                            </div>
            

                        <div class="card mt-5 col-10 mx-auto">
                            <div class="card-body ">
                                <p class="card-text"><small class="text-muted" v-for="item in test" v-bind:key="item">{{test}}Le nom de la personne et la date/
                                        heure</small>
                                </p>
                                <img src="/frontend/logos/icon-above-font.png" class="card-img-top d-block w-50 mx-auto"
                                    alt="">
                                <h5 class="card-title">Ceci est le titre</h5>
                                <p>Ceci est le contenu du texte Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, repellat molestias, recusandae explicabo doloremque minima necessitatibus similique tempora voluptas, earum perferendis tempore eius quisquam officia itaque eum excepturi illum quia.</p>
                                <div class="form-group">
                                    <textarea class="form-control" id="textarea" rows="3" v-if="displayComment"></textarea>
                                    <button role="button" class="btn btn-link col-4 mt-3" for="textarea" @click="displayComment = true" v-else>Répondre</button>
                                </div>
                                <div class="mt-3 text-center">     
                                <button role="button" class="btn btn-primary col-2 mx-2" v-if="displayComment">Valider</button>
                                <button type="button" class="btn btn-primary col-2 mx-2" v-if="displayComment">Editer</button>
                                <button type="button" class="btn btn-primary col-2 mx-2" v-if="displayComment">Supprimer</button>
                                <button type="button" class="btn btn-primary col-2 mx-2" v-if="displayComment">Annuler</button>
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
    export default {
        data() {
            return {
                displayComment: false,
                test : null
            }
        },
        mounted () {
            axios.get('http://localhost:3000/api/message', {
            headers: {"Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYxOTI3NzAyNywiZXhwIjoxNjE5MzYzNDI3fQ.17eqGrGXEZR7nL2s2PUyvH7e4OVwtnMCO48Bboxu9nQ'}
        })
        .then(response => (console.log(this.test = response.data)))
        }
    }
</script>


<style>
.ombre {
    box-shadow: 5px 3px 5px rgb(113, 145, 235);
}
</style>