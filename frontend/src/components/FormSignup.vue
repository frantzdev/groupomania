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
          <form class="my-3">
            <div>
              <label for="InputFirstName" class="form-label"></label>
              <input type="text" class="form-control" id="InputFirstName" placeholder="Prénom" v-model="firstname"
                v-bind:class="{'is-invalid': !validFirstname(firstname) && firstnameBlured, 'is-valid': validFirstname(firstname) && firstnameBlured}"
                @blur="firstnameBlured = true">
                  <small class="invalid-feedback">Prénom invalide</small>
                  <small class="valid-feedback">Prénom valide</small>
            </div>
            <div>
              <label for="InputLastName" class="form-label"></label>
              <input type="text" class="form-control" id="InputLastName" placeholder="Nom" v-model="lastname"
                v-bind:class="{'is-invalid': !validLastname(lastname) && lastnameBlured, 'is-valid': validLastname(lastname) && lastnameBlured}"
                @blur="lastnameBlured = true">
                  <small class="invalid-feedback">Nom invalide</small>
                  <small class="valid-feedback">Nom valide</small>
            </div>
            <div>
              <label for="InputEmail" class="form-label"></label>
              <input type="email" class="form-control" id="InputEmail" placeholder="Email" v-model="email"
                v-bind:class="{'is-invalid': !validEmail(email) && emailBlured, 'is-valid': validEmail(email) && emailBlured}"
                @blur="emailBlured = true">
                  <small class="invalid-feedback">Email invalide</small>
                  <small class="valid-feedback">Email valide</small>
            </div>
            <div>
              <label for="InputPassword" class="form-label"></label>
              <input type="password" autocomplete="on" class="form-control" id="InputPassword" placeholder="Mot de passe" v-model="password"
                v-bind:class="{'is-invalid': !validPassword(password) && passwordBlured, 'is-valid': validPassword(password) && passwordBlured}"
                @blur="passwordBlured = true">
                  <small class="invalid-feedback">8 caractères minimum dont un chiffre et une majucule invalide</small>
                  <small class="valid-feedback">Mot de passe valide</small>    
            </div>
              <a class="btn btn-lg bg fw-bold col-12 my-5 textColor" role="button" type="submit" title="envoyer le formulaire d'inscription" @click.prevent="submit()">{{text}}</a>
          </form>
        </div>
      </div>
    </div>

    <div class="col bg text-center imageLogo">
      <LogoRight :src="logoright"></LogoRight>
        <section v-if="success" class="alerte">
          <p class="fw-bold alert alert-success p-3">Félicitation l'inscription est validée, vous allez être redirigé sur la page de connexion !</p>
        </section>
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
        logoright: "/logos/icon-left-font-monochrome-black.svg",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        firstnameBlured: false,  //switch pour is-valid ou is-invalid
        lastnameBlured: false,
        emailBlured: false,
        passwordBlured: false,
        valid: false,
        success: false
      }
    },

    methods: {
      checkValidator() {
       if( this.validFirstname(this.firstname) && this.validLastname(this.lastname) && this.validEmail(this.email) && this.validPassword(this.password)){
          this.valid = true ;
          console.log(this.validFirstname(this.firstname))
          console.log(this.validFirstname(this.lastname))
          console.log(this.validEmail(this.email))
          console.log(this.validPassword(this.password))        
          console.log(this.valid)
        }
      },

      submit(){                   
        this.checkValidator();     
          if(this.valid){
            console.log(this.valid);
            console.log("envoi inscription");
            axios.post('http://localhost:3000/api/auth/signup', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
            })
            .then(response => {
            console.log(response);
            this.success = true;
              function displaySuccess() {
                window.location.href="http://localhost:8080/login"
              }
              setTimeout(displaySuccess, 3000);
            })          
            .catch(error => {console.log(error)});  
          }
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

<style>
.alerte {
  position: fixed;
  top: 200px;
}
</style>