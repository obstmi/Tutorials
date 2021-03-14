import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import BaseIcon from '@/components/BaseIcon.vue';

import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

// automatic registration of a component for global use:
// Webpack looks for require.context() in the code while building, then requires every matching file to ensure it’s in your compiled bundle, even if it’s never used.
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

//keys() sind hier die Filenames:
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')));

  Vue.component(componentName, componentConfig.default || componentConfig);
});

// manual registration of a component for global use:
// Vue.component('BaseIcon', BaseIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
