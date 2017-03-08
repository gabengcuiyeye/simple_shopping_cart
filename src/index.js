import 'babel-polyfill'
import Vue from 'vue'

Vue.config.devtools = true  //开启devtool调试

import VueResource from 'vue-resource'
Vue.use(VueResource);

import list from './components/list.vue'
new Vue({
    el: '#app',
    components: {
        'App': list
    }
});
