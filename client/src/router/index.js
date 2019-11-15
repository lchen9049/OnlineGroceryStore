import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Profile from '@/components/profile';
import Product from '@/components/product';
import Cart from '@/components/cart';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    { path: '/', name: 'Home', component: Product },
    { path: '/Products/:info/:productType', name: 'Products', component: Product },
    { path: '/Profile/:info', name: 'Profile', component: Profile },
    { path: '/Cart/:info', name: 'Cart', component: Cart },
  ]
})
