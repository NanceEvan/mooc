import Vue from 'vue'

// 孙组件
const ChildComponent = {
    template: `
        <div>child component: {{data.value}}</div>
    `,
    // 在孙组件中， inject进来组件树上游的provide的数据
    // 但是inject进来的数据是非响应式的
    inject: ['data'],
    mounted () {
        console.log(this.data.value)
    },
};

// 子组件
const Com = {
    name: 'comp',
    components: {
        ChildComponent,
    },
    inject: ['data'],
    template: `
        <div>
            <div>comp: {{data.value}}</div>
            <child-component></child-component>
        </div>
    `,
    data () {
        return {

        }
    }
};

new Vue({
    el: '#root',
    components: {
       CompOne: Com,
    },
    // 通过provide暴露数据给子组件和孙组件
    provide() {
        // 这种方法相对来说是一种比较hank的方法， 不推荐使用
        const data = {};
        // 通过这种形式实现provide属性的响应式
        Object.defineProperty (data, 'value', {
            get: () => this.value,
            enumerable: true
        });
        return {
            grand: this,
            data
        }
    },
    template: `
    <div>
        <comp-one></comp-one>
        <input type="text" v-model="value">
    </div>
    `,
    data () {
        return {
            value: '123'
        }
    },
});
