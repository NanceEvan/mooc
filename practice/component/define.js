import Vue from 'vue'

const com = {
    template: `
    <div>
        <div v-show="active">{{text}}</div>
        <p>{{msgOne}}</p>
        <input type="button" @click="clickHandle">
    </div>
    `,
    props: {
        // props 中的值是通过父组件传递过来的， 在逻辑上， 子组件不能主动的改变从父组件传递过来的值
        // 如果希望这些值发生改变， 应该通过子组件触发事件通知外部组件， 外部组件更改props中的值
        active: {
            type: Boolean,
            // required: true
            default: false,
            validator (value){
                // 验证值是否符合要求
            }
        },
        msgOne: String,
        obj: {
            type: Object,
            default () {
                return {

                }
            }
        }
    },
    data () {
        return {
            text:' This is an component'
        }
    },
    methods: {
        clickHandle() {
            this.$emit('comClick')
        }
    }
};

// 定义组件 方法一
// Vue.component('Comp', compnoent);

new Vue({
   el: '#root',
   template: `
        <comp :active="active" msg-one="this is message prop" @comClick="comClickHandle"></comp>
    `,
    data () {
       return {
           active: true
       }
    },
    components: {
       // 定义组件 方法二
       Comp: com
    },
    methods: {
       comClickHandle () {
           this.active = !this.active
       }
    }
});
