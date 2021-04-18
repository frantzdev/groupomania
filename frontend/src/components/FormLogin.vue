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
              <label for="InputEmail" class="form-label"></label>
              <input type="email" class="form-control" id="InputEmail" placeholder="Email" v-model="email">
              <small></small>
            </div>
            <div class="my-3">
              <label for="InputPassword" class="form-label"></label>
              <input type="password" class="form-control" id="InputPassword" placeholder="Mot de passe" v-model="password">
              <small></small>
            </div>
              <router-link to="/community">
                <a class="btn btn-lg bg fw-bold col-12 my-5" role="button" type="submit" @click="connectLogin">{{text}}</a>
              </router-link>
          </form>
        </div>
      </div>
    </div>
    <div class="col bg text-center">
      <LogoRight :src="logoright"></LogoRight>
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
        logoright: "/logos/icon-left-font-monochrome-black.png",
        email: "",
        password: ""
      }
    },
    methods: {
        connectLogin() {
            console.log("envoi login")
            axios.post('http://localhost:3000/api/auth/login', {
                            email: this.email,
                            password: this.password
                        })
                        .then(response => {
                            console.log(response);
                        })
                        // .catch(error => {
                        //     console.log('error')
                        // });                     
        }
    }
  }
</script>