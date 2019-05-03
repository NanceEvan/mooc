<template>
<header class="main-header">
<!--    <h1>SizerTodo</h1>-->
    <router-link tag="h1" to="/login">SizerTodo</router-link>
</header>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.main-header
    text-align center
    h1
        font-size 100px
        background-image linear-gradient(#167, #202d40)
        -webkit-background-clip text
        text-fill-color transparent
        -webkit-text-fill-color transparent
        margin 20px
</style>
