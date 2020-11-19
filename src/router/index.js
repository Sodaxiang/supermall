import Vue from 'vue';
import Router from 'vue-router';

// 在VUE中路由遇到Error: Avoided redundant navigation to current location:报错显示是路由重复
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}
Vue.use(Router);

const Home = () => import('@/views/home/Home.vue');
const Category = () => import('@/views/category/Category.vue');
const Cart = () => import('@/views/cart/Cart.vue');
const Profile = () => import('@/views/profile/Profile.vue');
const Detail = () => import('@/views/detail/Detail.vue');

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/category',
        component: Category,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/detail/:iid',
        component: Detail,
    }
]
const router = new Router({
    routes,
    mode: 'history',
});

export default router;