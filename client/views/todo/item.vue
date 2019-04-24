<template>
    <div :class="['todo-item',todo.completed?'completed':'']">
        <input
                type="checkbox"
                class="toggle"
                v-model="todo.completed"
        >
        <label>{{todo.content}}</label>
        <button class="destroy" @click="deleteTodo"></button>
    </div>
</template>
<script>
export default {
    props:{
        todo:{
            type:Object,
            required:true,
        }
    },
    methods:{
        deleteTodo(){
            // 子组件通过事件通知父组件
            // 父组件中会监听所有子组件中会触发的事件
            // 父组件通过在子组件标签中使用@del来监听子组件的del通知， 实现了父子组件间事件的解耦

            // 数据在哪生命的就在哪操作
            // todos是在todo组件声明的， 所以对todos的修改操作也应该在todo组件组件中操作，子组件只负责通过emit通知父组件
            this.$emit('del',this.todo.id)
        }
    }
}
</script>
<style lang="stylus" scoped>
.todo-item
    position relative
    background-color #fff
    font-size 24px
    border-bottom 1px solid rgba(0,0,0,0.06)
    &:hover
        .destroy:after
            content: '×'
    label
        white-space pre-line
        word-break break-all
        padding 15px 60px 15px 15px
        margin-left 45px
        display block
        line-height 1.2
        transition color 0.4s
    &.completed
        label
            color: #d9d9d9
            text-decoration line-through
.toggle
    text-align center
    width 40px
    height 40px
    line-height 40px
    position absolute
    top 0
    bottom 0
    margin auto 0
    border none
    appearance none
    outline none
    padding-left 5px
    cursor pointer
    &:after
        content url('../../assets/images/round.svg')
    &:checked:after
        content url('../../assets/images/done.svg')
.destroy
    position absolute
    top 0
    right 10px
    bottom 0
    width 40px
    height 40px
    margin auto 0
    font-size 30px
    color #cc9a9a
    margin-bottom 11px
    transition color 0.2s ease-out
    background-color transparent
    appearance none
    border-width 0
    cursor pointer
    outline none
</style>
