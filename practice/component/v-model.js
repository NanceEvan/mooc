// vue中组件v-model双向绑定
import Vue from 'vue'

const component = {
    model: {
      prop: 'val',
      event: 'change'
    },
    props: {
        value: String,
        val: String
    },
    methods: {
        handleInput (e) {
            this.$emit('change', e.target.value)
        }
    },
    template: `
    <div>
        <input type="text" @input="handleInput" :value="val">
    </div>
    `
};

new Vue({
    el: '#root',
    data () {
      return {
          value: '123'
      }
    },
    components: {
        CompOne: component,
    },
    methods: {
        input (val) {
            this.value = val
        }
    },
    template: `
        <div>
<!--            <comp-one :value="value" @input="input"></comp-one>-->
            <comp-one v-model="value"></comp-one>
        </div>
    `
});
