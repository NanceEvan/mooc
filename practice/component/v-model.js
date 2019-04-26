// vue中组件v-model双向绑定
import Vue from 'vue'

const component = {
    props: {
      value: String
    },
    methods: {
        handleInput (e) {
            this.$emit('input', e.target.value)
        }
    },
    template: `
    <div>
        <input type="text" @input="handleInput" :value="value">
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
            <comp-one :value="value" @input="input"></comp-one>
        </div>
    `
});
