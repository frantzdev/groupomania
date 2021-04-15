<template>
    <div class="container-full">
    <div class="row mx-auto">
      <div class="col-lg-4">
        <img class="rounded mx-auto d-block w-75" src="../../public/logos/icon-above-font.svg" alt="logo entreprise">

        <div class="row">
          <div class="col-lg-12 mb-3 text-center">
            <h2>Inscription</h2>
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
              
              <a class="btn btn-lg bg fw-bold col-12 my-5" role="button" type="submit">Soumettre</a>
            </form>
          </div>
        </div>
      </div>

      <div class="col bg text-center">
        <img src="../../public/logos/icon-left-font-monochrome-black.png" alt="logo" class="rounded mx-auto d-block w-75">
      </div>
    </div>
  </div>
</template>