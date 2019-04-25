import Vue from 'vue'

new Vue({
    el: '#root',
    template: `
        <div>
            <div @click="handleClick">{{isActive ? "yes" : "no"}}</div>
            <div>{{arr.join(" ")}}</div>
            <p v-html="html" :class="rrr"></p>
        </div>
    `,
    data: {
        isActive: false,
        arr: [1, 2, 3],
        html: '<span>123</span>',
        rrr: 'red'
    },
    methods: {
      handleClick () {
          console.log('click')
      }
    },
    style: `
        .red{
            color: red;
        }
    `
});
