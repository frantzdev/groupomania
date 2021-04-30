<!--<template>
  <div class="container-full bg">
     <LogoForm :src="logoform"></LogoForm>
    <div class="row text-center">
      <div class="col">
        <h1 class="my-5">Réseau social Groupomania</h1>
        <img class="mx-auto d-block w-50 my-3" src="../../public/logos/capture.png" alt="Siege de l'entreprise">
      </div>
    </div>

    <div class="row my-5 justify-content-center">
      <div class="col-6  bg-light text-center rounded">
        <h3 class="my-5">Rejoignez-nous dès maintenant</h3>
        <div>
          <router-link to="/signup">
            <a class="btn btn-secondary col-lg-2 col-md-4 col-6 mb-3 shadow-lg rounded-pill" role="button"
              title="S'inscrire">Inscription</a></router-link>
        </div>
        <div>
          <router-link to="/Login">
            <a class="btn btn-secondary col-lg-2  col-md-4 col-6 my-3 shadow-lg rounded-pill" role="button"
              title="Connectez-vous">Connexion</a></router-link>
        </div>
      </div>
      <LogoRight :src="logoright"></LogoRight>
    </div>

    <footer class="footer py-1">
      <p>Groupomania Siege social 18 route des champs 48720 Salbinor</p>
    </footer>
  </div>
  
</template>-->
<template>
  <div class="row mx-auto">
    <div class="col-lg-4">
      <img src="../../public/logos/icon.svg" alt="logo d'entreprise" title="logo d'entreprise" class="rounded mx-auto d-block w-75">
        <div class="row">
          <div class="col text-center">
            <h1>{{ title }}</h1>
          </div>
        </div>

      <div class="row">
        <div class="col mx-auto">
          <div class="row my-3 justify-content-center">
            <div class="col text-center rounded">
              <h3 class="my-5">{{text}}</h3>
              <div>
                <router-link to="/signup">
                  <a class="btn col-6 my-3 shadow-lg button" role="button" type="button"
                    title="S'inscrire">Inscription</a></router-link>
              </div>
              <div>
                <router-link to="/Login">
                  <a class="btn col-6 my-3 shadow-lg button" role="button" type="button"
                    title="Connectez-vous">Connexion</a></router-link>
              </div>
            </div>
          </div>

          <footer class="footer py-1 my-5">
            <p>Groupomania Siege social 18 route des champs 48720 Salbinor</p>
          </footer>
        </div>
      </div>
    </div>
    <div class="col bg text-center">
      <LogoRight :src="logoright"></LogoRight>
      <section v-if="errored">
        <p class="fw-bold alter alert-danger p-3">Nous sommes désolés, votre email ou mot de passe sont incorrect.
          Veuillez réessayer ultérieurement.</p>
      </section>
    </div>
  </div>
</template>

<script>
  import LogoRight from '../components/LogoRight'
  export default {
    name: 'Home',
    components: {
      LogoRight
    },
    data() {
      return {
        text: "Rejoignez-nous dès maintenant",
        title: "Groupomania",
        logoright: "/logos/icon-left-font-monochrome-black.png",
      }
    }
  }
</script>