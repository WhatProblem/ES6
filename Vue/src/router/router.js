import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('@/view/Home')
        },
        {
            path: '/profile',
            component: () => import('../view/Profile.vue')
        }
    ]
})