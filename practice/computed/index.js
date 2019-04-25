import Vue from 'vue'

new Vue({
    el: '#root',
    template: `
    <div>
<!--        <p>Name: {{fullname}}</p>-->
<!--        <p>Name: {{name()}}</p>-->
<!--        <p>Number: {{number}}</p>-->
<!--        <p><input type="text" v-model="number"></p>-->
<!--        <p><input type="text" v-model="fullname"></p>-->
        <p>Name: {{fullname}}</p>
        <p><input type="text" v-model="firstName"></p>
        <p><input type="text" v-model="lastName"></p>
    </div>
    `,
    data: {
        firstName: 'Ted',
        lastName: 'Zou',
        number: 0,
        fullname: ''
    },
    computed: {
        // computed 会在浏览器中进行缓存
        // fullname: {
        //     get () {
        //         return `${this.firstName} ${this.lastName}`
        //     },
        //     set (name) {
        //         const names = name.split(' ');
        //
        //         this.firstName = names[0];
        //         this.lastName = names[1];
        //     }
        // }
    },
    methods: {
        // name () {
        //     console.log('methods name');
        //     return this.firstName + ' ' + this.lastName
        // }
    },
    watch: {
        firstName: {
            handler (newVal, oldVal) {
                this.fullname = newVal + ' ' + this.lastName
            },
            immediate: true
        }
    }
});
