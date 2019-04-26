import Vue from 'vue'

const com = {
    props: {
        active: {
            type: Boolean,
            required: true
        },
        msg: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            num: 0
        }
    },
    methods: {
        hclickHandle () {
            console.log('h1 clicked!');
            this.$emit('hclick');
        }
    },
    mounted () {
      console.log('com mounted')
    },
    template: `
        <div>
            <h1 @click="hclickHandle">num: {{num}}</h1>
            <p v-show="active">{{msg}}</p>
        </div>
    `
};

const com2 = {
    extends: com,
    data () {
        return {
            num: 2
        }
    },
    mounted() {
        console.log('com2 mounted')
        console.log(this.$parent.$options.name)
        this.$parent.text = 123
    }

};

// new Vue({
//     el: '#root',
//     components: {
//        com
//     },
//     template: `
//         <com :active="true" msg="message"></com>
//     `
//
// });

// const CompVue = Vue.extend(com);

// new CompVue({
//     el: '#root',
//     // 向props中传入数据
//     propsData: {
//         active: true,
//         msg: 'this is an message!'
//     },
//     data () {
//         // data可以直接通过这种方式进行键值对的覆盖，
//         // 但是props不能这样用， 需要使用propsData
//         return {
//             // 会覆盖com中的num
//             num: 1
//         }
//     },
//     mounted() {
//         // 先执行com中的mounted再执行extend之后的mounted
//         console.log('extend mounted')
//     }
// });

// 可以在new Vue的时候指定parent
// 但是在通过对象模式声明时， 指定parent无效
// parent尽量不要修改， 也不要修改parent中的属性
new Vue({
    el: '#root',
    name: 'root',
    components: {
       com2
    },
    data () {
      return {
          text: 233433
      }
    },
    template: `
        <div>
            <p>{{text}}</p>
            <com2 :active="true" msg="message"></com2>
        </div>
    `

});
