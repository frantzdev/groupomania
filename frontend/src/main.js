import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false

//importation de moment sous forme de fonction globale pour modifier le format de la date et l'heure
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY à hh:mm')
    }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
