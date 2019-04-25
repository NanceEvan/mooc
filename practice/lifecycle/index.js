import Vue from 'vue'

const app = new Vue({
   el: '#root',
   // template: '<div>{{text}}</div>',
   data: {
       text: 0
   },
    // 一般与DOM有关的操作会放在mounted中， 与数据绑定有关的操作会放在created或者mounted中。
    // beforeCreate, created, beforeMount, mounted都是一次性调用的。
    beforeCreate () {
       // undefined beforeCreate
       console.log(this.$el, 'beforeCreate')
    },
    created () {
       // undefined created
        console.log(this.$el, 'created')
    },
    // beforeMount和mounted在服务端渲染时是不会被调用的,服务端渲染的时候被调用的只有beforeCreate和created
    beforeMount () {
       // <div id="root"> beforeMount
        console.log(this.$el, 'beforeMount')
    },
    mounted () {
       // <div>0</div> mounted
        console.log(this.$el, 'mounted')
    },
    beforeUpdate () {
        console.log(this, 'beforeUpdate')
    },
    updated () {
        console.log(this, 'updated')
    },
    activated () {
        console.log(this, 'activated')
    },
    deactivated () {
        console.log(this, 'deactivated')
    },
    beforeDestroy () {
        console.log(this, 'beforeDestroy')
    },
    destroyed () {
        console.log(this, 'destroyed')
    },
    render(h) {
       // h 是vue中createElement方法
        console.log('render', h);
        // throw new TypeError('render error');
        return h('div', {}, this.text)
    },
    // renderError只有在开发时才会生效，正式上线时不会生效
    renderError (h, err) {
        // 只能捕获本组件内render方法中的错误
        // 不会捕获子组件内render方法中的错误
        return h('div', {}, err.stack)
    },
    // 可以用在正式开发环境中， 并且可以向上冒泡
    // 能捕获到子组件中的错误
    errorCaptured () {

    }
});

// setInterval( () =>{
//    app.text += 1
// }, 1000);

setTimeout(() =>{
   app.$destroy();
}, 10000);
