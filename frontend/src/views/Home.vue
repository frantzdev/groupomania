<template>
  <div class="row mx-auto">
    <div class="col-lg-4 ipad">
      <img src="../../public/logos/icon.svg" alt="logo d'entreprise" class="rounded mx-auto d-block w-75">
        <div class="row">
          <div class="col text-center">
            <h1>{{ title }}</h1>
          </div>
        </div>

      <div class="row">
        <div class="col mx-auto">
          <div class="row my-3 justify-content-center">
            <div class="col text-center rounded">
              <h2 class="my-5">{{text}}</h2>
              <div>
                <router-link to="/signup">
                  <a class="btn col-6 my-3 button bordure" role="button" type="button"
                    title="S'inscrire">Inscription</a></router-link>
              </div>
              <div>
                <router-link to="/Login">
                  <a class="btn col-6 my-3 button bordure" role="button" type="button"
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
    <div class="col bg text-center imageLogo">
      <LogoRight :src="logoright"></LogoRight>
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
        logoright: "/logos/icon-left-font-monochrome-black.svg"
      }
    }
  }
</script>

<style>
.bordure {
  border: 1px solid #004D40;
  box-shadow: 5px 5px 5px #004D40;
}

@media all and (max-width: 1024px) {
  .ipad {
    width: 100%;
  }
}
</style>