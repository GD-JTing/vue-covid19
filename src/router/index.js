import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
}, {
    path: '/city/:city',
    name: 'City',
    component: () =>
        import ("../views/CityView.vue"),
    props: true
}, {
    path: '/spring/:city',
    name: 'SpringView',
    component: () =>
        import ("../views/SpringView.vue"),
    props: true
}]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router