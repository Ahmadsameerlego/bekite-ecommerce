import { comma } from 'postcss/lib/list'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../pages/Home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../pages/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../pages/Register.vue'),
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () =>
            import ('../pages/Cart.vue'),
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: () =>
            import ('../pages/Checkout.vue'),
    },
    {
        path: '/thank-you',
        name: 'ThankYou',
        component: () =>
            import ('../pages/ThankYou.vue'),
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ('../pages/Profile.vue'),
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () =>
            import ('../pages/Contact.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../pages/About.vue'),
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () =>
            import ('../pages/Privacy.vue'),
    },
    {
        path: '/terms',
        name: 'Terms',
        component: () =>
            import ('../pages/Terms.vue'),
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: () =>
            import ('../pages/notifications.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router