import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Test from '@/views/Test'

import GoodsList from '@/views/goods/GoodsList'
import GoodsView from '@/views/goods/GoodsView'

// import Login from '@/views/member/Login'
// import Register from '@/views/member/Register'

// import Cart from '@/views/order/Cart'
import Order from '@/views/order/Order'
import Orderpayment from '@/views/order/OrderPayment'
import Payend from '@/views/order/Payend'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/goods/goodslist',
    name: 'GoodsList',
    component: GoodsList
  },
  {
    path: '/goods/view',
    name: 'GoodsView',
    component: GoodsView
  },
  {
    path: '/goods/view/:id',
    name: 'GoodsViewWithId',
    component: GoodsView
  },
  // {
  //   path: '/member/login',
  //   name: 'Login',
  //   component: Login
  // },
  // {
  //   path: '/member/register',
  //   name: 'Register',
  //   component: Register
  // },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: Cart
  // },
  {
    path: '/order/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/order/orderpayment',
    name: 'Orderpayment',
    component: Orderpayment,
    props: true
  },
  {
    path: '/order/payend',
    name: 'Payend',
    component: Payend
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
