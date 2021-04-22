  <template>
      <div class="container">
          <div class="row justify-content-center my-5">
              <div class="col-md-6 col">
                  <div class="card mt-5 col mx-auto">
                      <div class="card-body">
                          <form>
                              <div class="form-group">
                                  <label for="NewMessageTitle" class="mt-3">Votre titre</label>
                                  <input type="text" class="form-control mt-3" id="NewMessageTitle"
                                      placeholder="Veuillez renseigner le titre">
                              </div>
                              <div class="form-group">
                                  <label for="message" class="mt-3">Votre message</label>
                                  <textarea name="message" id="message" rows="4" class="form-control mt-3"
                                      placeholder="Renseignez votre message içi"></textarea>
                              </div>
                              <div class="form-group">
                                  <label for="NewMessageImage" class="mt-3">Ajouter une image</label>
                                  <input type="text" class="form-control mt-3" id="NewMessageImage"
                                      placeholder="Ajouter le lien de votre image">
                                      <button type="button" class="btn btn-primary mt-3">Ajouter</button>
                              </div>
                              <div class="form-group mt-5 col-8 mx-auto">
                                 <router-link to="/Message">
                                    <a role=button class="btn btn-primary form-control" title="valider votre nouveau message">Valider</a>
                                </router-link>   
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </template>