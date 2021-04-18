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
              <input type="text" class="form-control" id="InputFirstName" placeholder="Prénom"
                pattern="^[A-Za-z\é\è\ê\ -]{2,30}$', 'g" v-model="firstname">
              <small></small>

              <label for="InputLastName" class="form-label"></label>
              <input type="text" class="form-control" id="InputLastName" placeholder="Nom"
                pattern="^[A-Za-z\é\è\ê\ -]{2,30}$', 'g" v-model="lastname">
              <small></small>

              <label for="InputEmail" class="form-label"></label>
              <input type="email" class="form-control" id="InputEmail" placeholder="Email"
                pattern="^[a-zA-Z0-9-._]+[@]{1}[a-zA-Z0-9-._]+[.]{1}[a-z]{2,10}$" v-model="email">
              <small></small>
        
              <label for="InputPassword" class="form-label"></label>
              <input type="password" class="form-control" id="InputPassword" placeholder="Mot de passe"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="password">
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
      // Button,
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
        msg: []    
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
        }  
    }
  }
</script>

