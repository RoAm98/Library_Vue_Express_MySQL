import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import AddBook from '../views/AddBook.vue'
import BookList from '../views/BookList.vue'
import RentList from '../views/Rentlist.vue'
import AddCustomers from '../views/AddCustomers.vue'
import CustomerList from '../views/CustomerList.vue'

global.backendurl="http://localhost:3000"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBook
  },
  {
    path:'/booklist',
    name:'BookList',
    component: BookList
  },
  {
    path:'/rentlist',
    name:'RentList',
    component: RentList
  },
  {
    path:'/addcustomers',
    name:'Customers',
    component: AddCustomers
  },
  {
    path:'/customerlist',
    name:'CustomerList',
    component: CustomerList
  }
]

const router = new VueRouter({
  routes
})

export default router
