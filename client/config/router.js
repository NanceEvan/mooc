import Router from 'vue-router'
import routes from './routes'

export default () => {
    // 需要用到服务端渲染， 如果一直使用同一个router的话可能造成内存溢出
    return new Router({
        // localhost:8000/app
        mode: 'history',
        // // local:8000/#/app
        // // mode: 'hash',
        // 非强制性的， 即使配置了base也可以直接访问不加base的url路径
        // base: '/base/',

        // linkActive 和 linkExactActive的区别就是
        // 如 两个link-router /login 和 /login/exact
        // 当处于 /login/exact时， /login 的class为'active-link'， /login/exact的class为'active-link exact-active-link'
        // 当处于 /login时， /login的class为'active-link exact-active-link' /login/exact的class为''
        // linkActive应该是linkExactActive的子集
        // linkActiveClass: 'active-link',
        // linkExactActiveClass: 'exact-active-link',
        routes,
    })
}
