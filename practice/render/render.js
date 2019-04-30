import Vue from 'vue'

const Comp = {
    // template会被编译成render函数
    // template: `
    //     <div :style="style">
    //         <slot></slot>
    //         <div>{{this.props1}}</div>
    //     </div>
    // `,
    props: {
        'aaa': {
            required: true
        }
    },
    data () {
        return {
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            },
        }
    },
    render (createElement) {
        return createElement(
            'div',
            {
                style: this.style
            },
            // 默认插槽调用
            // this.$slots.default
            [
                this.$slots.default,
                this.aaa
            ]
        )
    },
    mounted () {
        console.log(this.$props)
    }
};

new Vue({
    el: '#root',
    components: {
      Comp
    },
    data () {
      return {
          value: '123'
      }
    },
    // template: `
    // <div>
    //     <comp ref="comp">
    //         <span ref="span">this is a slot: {{value}}</span>
    //     </comp>
    // </div>
    // `,
    render(createElement) {
        // 参数createElement为创建节点的函数
        // createElement有三个参数：
        //  创建节点的名字， 可以是组件， 也可以是普通的dom节点
        //  节点上的属性
        //  节点内容， 如果是另一个节点， 则必须作为一个数组进行传递， 如果是字符串则不需要使用数组
        return createElement(
            'comp',
            {
                ref: 'comp'
            }, [
                createElement(
                    'span', {
                        ref: 'span',
                        props: {
                            aaa: 'tst'
                        }
                    },
                    'this is  a slot: ' + this.value)
            ]
        )
    }
});
