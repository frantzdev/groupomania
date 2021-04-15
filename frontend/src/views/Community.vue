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
                    <div class="card mt-5 col-10 mx-auto">
                        <div class="card-body ">
                            <p class="card-text"><small class="text-muted">Le nom de la personne et la date/ heure</small>
                            </p>
                            <img src="/frontend/logos/icon-above-font.png" class="card-img-top d-block w-50 mx-auto" alt="">
                            <h5 class="card-title">Titre</h5>
                            <p>Texte</p>
                            <label for="comment">répondre</label>
                            <input type="text" class="col-12" id="comment">
                        </div>
                    </div>

                </div>
                <div class="col-md-3 bg"></div>
            </div>
        </div>
    </div>
</template>