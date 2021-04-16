<template>
  <div class="container-full bg">
    <div class="row text-center">
      <div class="col">
        <h1 class="my-5">Réseau social Groupomania</h1>
        <img class="mx-auto d-block w-50 my-3" src="../../public/logos/capture.png" alt="Siege de l'entreprise">
      </div>
    </div>

    <div class="row my-5">
      <div class="col text-center">
        <h3 class="my-5">Rejoignez-nous dès maintenant</h3>
        <div>
          <router-link to="/signup">
            <a class="btn btn-secondary col-lg-2 col-md-4 col-6 mb-3 shadow-lg" role="button"
              title="S'inscrire">Inscription</a></router-link>
        </div>
        <div>
          <router-link to="/Login">
            <a class="btn btn-secondary col-lg-2  col-md-4 col-6 my-3 shadow-lg" role="button"
              title="Connectez-vous">Connexion</a></router-link>
        </div>
      </div>
    </div>

    <footer class="footer py-1">
      <p>Groupomania Siege social 18 route des champs 48720 Salbinor</p>
    </footer>
  </div>
</template>