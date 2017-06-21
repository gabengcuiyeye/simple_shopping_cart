import 'babel-polyfill'
import Vue from 'vue'
Vue.config.devtools = true  //开启devtool调试
import VueResource from 'vue-resource'
Vue.use(VueResource);
import logIn from '../../../src/chatRoom/app/components/login.vue'
import chatting from '../../../src/chatRoom/app/components/chatting.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);
const router = new VueRouter();
// 路由map
router.map({
    '/login': {
        component: logIn
    },
    '/chatting': {
        component: chatting
    }
});

router.redirect({
    '*': '/login'
});

router.start(logIn, '#app');
