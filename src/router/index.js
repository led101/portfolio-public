import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Projects from '../views/Projects.vue'
import Blog from '../views/Blog.vue'
import Create from '../views/Create.vue'
import Contact from '../views/Contact.vue'
import Blogpost from '../views/Blogpost.vue'
import firebase from "firebase/app";
import "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    children: [{
      path: ':slug',
      name: 'Blogpost',
      component: Blogpost
    }]
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    beforeEnter(to, from, next) {

      let user = firebase.auth().currentUser;
      if(user){
        next();
      } 
      else {
        next('/');
      }
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
