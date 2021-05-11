<template>
  <div class="row mx-auto">
    <div class="col-lg-4">
      <LogoForm :src="LogoForm"></LogoForm>
      <div class="row">
        <div class="col-lg-12 mb-3 text-center">
          <h2>{{ title }}</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-10 mx-auto my-5">
          <form>
            <div class="my-3">
              <label for="InputEmailLogin" class="form-label"></label>
              <input type="email" class="form-control" id="InputEmailLogin" placeholder="Email" v-model="email">
              <small></small>
            </div>
            <div class="my-3">
              <label for="InputPasswordLogin" class="form-label"></label>
              <input type="password" autocomplete="off" class="form-control" id="InputPasswordLogin" placeholder="Mot de passe" v-model="password">
              <small></small>
            </div>
              <router-link to="/message">
                <a class="btn btn-lg bg fw-bold col-12 my-5 textColor" role="button" type="submit" title="valider la connexion" @click.prevent="connectLogin">{{text}}</a>
              </router-link>
          </form>
        </div>
      </div>
    </div>
    <div class="col bg text-center imageLogo">
      <LogoRight :src="logoright"></LogoRight>
       <section v-if="errored" class=" alerte">
          <p class="fw-bold alert alert-danger p-3">Nous sommes désolés, votre email ou mot de passe sont incorrect. Veuillez réessayer ultérieurement.</p>
       </section>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import LogoForm from '../components/LogoForm'
  import LogoRight from '../components/LogoRight'
  export default {
    name: "FormLogin",
    components: {
      LogoForm,
      LogoRight
    },
    data() {
      return {
        text: "Connexion",
        title: "Connectez-vous",
        LogoForm: "/logos/icon-above-font.svg",
        logoright: "/logos/icon-left-font-monochrome-black.svg",
        email: "",
        password: "",
        errored: false
      }
    },
    methods: {
        connectLogin() {
            axios.post('http://localhost:3000/api/auth/login', {
            email: this.email,
            password: this.password                    
            })
            .then(response => {
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('isAdmin', response.data.isAdmin);
                localStorage.setItem('userFirstname', response.data.userFirstname);
                console.log(response)
                this.errored = false;
                window.location.href="http://localhost:8080/messages";
            })
            .catch(error => {
            console.log(error);
            this.errored = true;
            function displayNone() {
                window.location.reload()
            }
              setTimeout(displayNone, 4000);    
            })
                        
        }
      }
  }
</script>

<style>
.alerte {
  position: fixed;
  top: 200px;
}
</style>