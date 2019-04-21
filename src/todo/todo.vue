<template>
    <section class="real-app">
<!--        // @keyup.enter 只有敲下回车之后再调用addTodo-->
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么?"
            @keyup.enter="addTodo"
        />
    </section>
</template>

<script>
export default {
    name: "todo",
    methods: {
        addTodo () {
            console.log('enter key up')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .real-app
        width 700px
        margin 0 auto
        box-shadow 0 0 5px #666

    .add-input
        position relative
        margin 0
        width 100%
        font-size 24px
        font-family inherit
        font-weight inherit
        line-height 1.4em
        border 0
        outline none
        color inherit
        box-sizing border-box
        font-smoothing antialiased
        padding 16px 16px 16px 36px
        border none
        box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
</style>
