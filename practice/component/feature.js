import Vue from 'vue'

const ChildCom = {
    template: '<div>child component</div>',
    inject: ['grand'],
    mounted() {
        console.log(this.grand)
    }
};

const Com = {
    name: 'com',
    components: {
        ChildCom
    },
    template: `
        <div :style="style">
            <div class="header">
                <slot name="header"></slot>    
            </div>
            <div class="body">
                <slot name="body"></slot>
            </div>
            <slot value="345" :aaa="style"></slot>
            <hr>
            <child-com></child-com>
        </div>
    `,
    data () {
        return {
            style: {
                width: '500px',
                height: '200px',
                border: '1px solid #aaa'
            },
            text: 'test'

        }
    }
};

new Vue({
    components: {
        CompOne: Com
    },
    el: '#root',
    data () {
        return {
            value: '123'
        }
    },
    provide () {
      return {
          // 在父级中通过provide提供的变量， 子级中可以通过inject声明后直接使用
          // provide默认不是响应式的
          grand: this
      }
    },
    template: `
    <div>
        <!-- vue 中的组件并不是传统的html标签-->
        <comp-one ref="comp">
            <span slot="header">this is header</span>
            <span slot="body">this is body</span>
            <span slot-scope="ss" ref="span">{{ss.value}} {{ss.aaa}} {{value}}</span>
        </comp-one>  
    </div>  
    `,
    mounted() {
        // console.log(this.$refs.comp); // 组件本身
        // console.log(this.$refs.comp.style); // 组件上的数据
        // console.log(this.$refs.span); // 节点本身
    }
});
