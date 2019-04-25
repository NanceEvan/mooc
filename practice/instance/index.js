import Vue from 'vue'



// 指定el的挂在方式
// const app = new Vue({
//     // 这种使用方法， 因为要编译template的内容， 所以效率比较低一点
//     // el : template的内容要渲染的位置， 挂载过程中， 会把该节点整个替换
//     el: '#root',
//     template: '<div>this is a simple test</div>'
// });



// 不指定el的挂载方式
const app = new Vue({
    template: '<div ref="div">{{text}} {{obj.a}}</div>',
    data: {
        text: 'this is a message',
        obj: {}
    },
    watch: {
        // text (newText, oldText) {
        //     console.log(`${newText}`, `${oldText}`)
        // }
    }
});

app.$mount('#root');


app.text = 0;
let i = 0;
setInterval(() => {
    // vm.$options 是一个只读属性， options只用来初始化vue实例， 初始化完成之后修改options属性中的值是无效的
    // app.$options.data.text += 1;

    // Vue实例代理的dta对象上的素有属性， 因此访问vm.a等价于访问vm.$data.a
    // app.text += 1
    // app.$data.text += 1;
    // vue obj中的a未在生命时指定， 不会响应式渲染

    i ++;
    // app.obj.a = i;
    // app.$forceUpdate();
    //向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。
    // 它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性
    // (比如 this.myObject.newProperty = 'hi')
    app.$set(app.obj, 'a', i)
}, 1000);

/**  vue 实例属性 **/
// vm.$data
// 类型： Object
//          Vue实例观察的数据对象。
// console.log(app.$data);
// vm.$props
// 类型： Object
//          当前组件接收到的props对象。
// console.log(app.$props);
// vm.$el
// 类型： HTMLElement
//          Vue实例使用的根DOM元素
// console.log(app.$el);
// vm.$options
// 类型：Object
//          用于当前Vue实例的初始化选项。需要在选项中包含自定义属性时会有用处
// console.log(app.$options);

// render 方法： 下一次值发生变化， 需要重新渲染时才会生效
// app.$options.render = (h) => {
//     return h('div', {}, 'new render function')
// };

// vm.$root
//  类型： Vue instance
//  只读
//          当前组件树的根Vue实例。 如果当前实例没有父实例，此实例将会是其自己。
// console.log(app.$root === app);

// vm.$children
//  类型：Array<Vue instance>
//  只读
//          当前实例的直接子组件。$children不保证顺序，也不是响应式的。
// console.log(app.$children)

// vm.$slots
//  只读
//          用来访问被插槽分发的内容。每个具名插槽有其对应的属性（例如： v-slot:foo中的内容将会在vm.$slots.foo中被找到）
// vm.$scopedSlots
//  只读
//          用来访问作用域插槽。
// console.log(app.$slots);
// console.log(app.$scopedSlots);

// vm.$refs
//  只读
//      一个对象，持有注册过ref的素有DOM元素和组件实例
// console.log(app.$refs);

// vim.$isServer
//  只有在服务端渲染的时候用得到
// console.log(app.$isServer);

/** vue 实例方法 **/
// vm.$watch(expOrFn, callback, [options])
// 参数： {string | Function} expOrFn
//      {Function | Object} callback
//      {Object} [options]
//          {boolean} deep
//          {boolean} immediate
// 返回值： {Function} unwatch
//          观察Vue实例变化的一个表达式或计算属性函数。毁掉函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用函数代替
//      选项： deep： 监听对象内部值的变化。如果监听数组的变动不需要这么做
//            immediate：立即以表达式的当前值触发回调
// const unWatch = app.$watch('text', (newText, oldText) => {
//     console.log(`${oldText}`,`${newText}`)
// });
// 在app注销时， 需要注销掉watch
// 使用$watch方法， 需要自己注销掉watch
// 使用options写， vue会自动注销掉watch
// setTimeout(() =>{
//     unWatch()
// }, 2000);

// vm.$on(event, callback)
// 参数 {string | Array<string>} event
//     {Function} callback
//  监听当前实例上的自定义事件。事件可以由 vm.$emit触发。 回调函数会接收所有传入事件触发函数的额外参数
// app.$on('test', function (msg) {
//     console.log(msg)
// });
// once 只触发一次
// app.$once('test', function (msg) {
//     console.log(msg)
// });
//
// app.$emit('test', 'hi');

// 强制组件重新渲染一次 $forceUpdate()
// 不建议使用$forceUpdate()强制渲染， 因为耗费性能
// app.$forceUpdate()
