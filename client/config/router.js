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

        scrollBehavior (to, from, savedPosition) {
            // 使用前端路由， 当切换到新路由时， 想要页面滚到顶部， 或者保持原先的关东位置， 就像重新加载页面那样
            // 这个功能只在HTML5 history 模式下可用
            // scrollBehavior方法接收to 和 from 路由对象， 第三个参数 savedPosition当且仅当popstate导航（通过浏览器的前进/后退按钮触发时才可以用）
            // 这个方法返回滚动信息的对象信息， just like: {x: number, y: number} {selector: string, offset?:{x: number, y:number}}
            // 如果返回一个falsy（不是false）的值， 或者返回一个空对象， 就不会发生滚动
            if (savedPosition) {
                return savedPosition
            } else {
                return {x: 0, y: 0}
            }
        },
        routes,
    })
}
