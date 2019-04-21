import Vue from 'vue'
import App from './App.vue'

import './assets/styles/global.styl'

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    // h 是vue中createElement函数，用来生成HTML DOM元素，
    // 这个函数的作用就是生成一个VNode节点，
    // render函数得到这个VNode节点之后，返回给Vue.js的mount函数渲染成真实的DOM节点，并挂载到根节点上
    render: (h) => h(App)
}).$mount(root);
