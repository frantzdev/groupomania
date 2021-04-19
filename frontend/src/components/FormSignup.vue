<template>
  <div class="row mx-auto">
    <div class="col-lg-4">
      <LogoForm :src="logoform"></LogoForm>
      <div class="row">
        <div class="col-lg-12 mb-3 text-center">
          <h2>{{ title }}</h2>
        </div>
      </div>


      <div class="row">
        <div class="col-10 mx-auto">
          <form>
            <div class="mb-3">
              <label for="InputFirstName" class="form-label"></label>
              <input type="text" class="form-control" id="InputFirstName" placeholder="Prénom" v-model="firstname">
              <small v-if="validFirstname(firstname)">error</small>

              <label for="InputLastName" class="form-label"></label>
              <input type="text" class="form-control" id="InputLastName" placeholder="Nom" v-model="lastname">
              <small></small>

              <label for="InputEmail" class="form-label"></label>
              <input type="email" class="form-control" id="InputEmail" placeholder="Email" v-model="email">
              <small></small>

              <label for="InputPassword" class="form-label"></label>
              <input type="password" autocomplete="on" class="form-control" id="InputPassword"
                placeholder="Mot de passe" v-model="password">
              <small></small>
            </div>
            <router-link to="/community">
              <a class="btn btn-lg bg fw-bold col-12 my-5" role="button" type="submit" @click="signup()">{{text}}</a>
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
    name: 'FormSignup',
    components: {
      LogoForm,
      LogoRight
    },
    data() {
      return {
        text: "Soumettre",
        title: "Inscription",
        logoform: "/logos/icon-above-font.svg",
        logoright: "/logos/icon-left-font-monochrome-black.png",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      }
    },

    methods: {
      signup() {
        console.log("envoi inscription")
        axios.post('http://localhost:3000/api/auth/signup', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
          })
          .then(response => {
            console.log(response);
          })
        // .catch(error => {
        //     console.log('error')
        // });  

      },

      validFirstname(firstname) {
        let regexFirstname = /^[A-Za-zéèê'à -]{2,30}$/;
        return regexFirstname.test(firstname);
      },
      validLastname(lastname) {
        let regexLastname = /^[A-Za-zéèê'à -]{2,30}$/;
        return regexLastname.test(lastname);
      },
      validEmail(email) {
        let regexEmail = /(.+)@(.+){2,}\.(.+){2,}/;
        return regexEmail.test(email);
      },
      validPassword(password) {
        let regexPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        return regexPassword.test(password);
      }
    } 
  }
</script>