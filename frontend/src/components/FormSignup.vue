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
                pattern="^[A-Za-z\é\è\ê\ -]{2,30}$', 'g">
              <small></small>

              <label for="InputLastName" class="form-label"></label>
              <input type="text" class="form-control" id="InputLastName" placeholder="Nom"
                pattern="^[A-Za-z\é\è\ê\ -]{2,30}$', 'g">
              <small></small>


              <label for="InputEmail" class="form-label"></label>
              <input type="email" class="form-control" id="InputEmail" placeholder="Email"
                pattern="^[a-zA-Z0-9-._]+[@]{1}[a-zA-Z0-9-._]+[.]{1}[a-z]{2,10}$">
              <small></small>

              <label for="InputPassword" class="form-label"></label>
              <input type="password" class="form-control" id="InputPassword" placeholder="Mot de passe"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$">
              <small></small>
            </div>

            <Button :text="text"></Button>
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
  import Button from '../components/Button'
  import LogoForm from '../components/LogoForm'
  import LogoRight from '../components/LogoRight'
  export default {
    name: 'FormSignup',
    components: {
      Button,
      LogoForm,
      LogoRight
    },
    data() {
      return {
        text: "Soumettre",
        title: "Inscription",
        logoform: "/logos/icon-above-font.svg",
        logoright: "/logos/icon-left-font-monochrome-black.png"
      }
    }
  }
</script>