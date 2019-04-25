import Vue from 'vue'

new Vue({
    el: '#root',
    template: `
    <div>
    <!--        <div v-text="'Text: ' + text"></div>-->
        <div><input type="button" @click="clickHandle">button</div>
        <div v-show="active">Text: {{text}}</div>    
        <div v-html="html" v-if="show"></div>
        <br>
        <div v-if="flag">flag is false</div>
        <div v-else>flag is true</div>
        <br>
        <div v-for="(item, index) in arr" :key="index">{{item}}</div>
        <hr>
        <div v-for="(v, k, index) in obj" :key="k">{{k}}, {{v}}, {{index}}</div>
        <hr>
        <input type="text" v-model.lazy ="msg">
        <div>{{msg}}</div>
        <input type="checkbox" v-model="active">
        <div>
            <input type="checkbox" v-for="(item, index) in arr" :key="item" :value="item" v-model="checkarr"">
        </div>
        <hr>
        <div>
            <input type="radio" v-model="picked" value="one">
            <input type="radio" v-model="picked" value="two">
        </div>
    </div>

` ,
    data: {
        text: 0,
        active: false,
        picked: '',
        html: `<span>this is html</span>`,
        show: false,
        flag: false,
        arr: ['a', 'b', 'c'],
        obj: {
            a: 123,
            b: 123,
            c: 345
        },
        msg: 'test',
        checkarr: []
    },
    methods: {
        clickHandle () {
            // this.active = !this.active;
            // this.show = !this.show;
            this.flag = !this.flag;
        }
    }
});
