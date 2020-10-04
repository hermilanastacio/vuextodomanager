import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false

new Vue({
  store, //Just add it here to inject store into root component
  render: h => h(App),
}).$mount('#app')
