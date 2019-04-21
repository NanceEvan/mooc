<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'
export default {
    name: 'Item',
    components: {
        Header,
        Footer,
        Todo
    }
}
</script>

<style lang="stylus" scoped>
/*lang 指定处理语言，  scoped指定作用于在本文件内*/
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
#cover
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #555
    opacity 0.5
    z-index -1
</style>
