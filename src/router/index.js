import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Registration from '../views/Registration.vue';
import Login from '../views/Login.vue';
import SinglePostPage from '../views/SinglePostPage.vue';
import ParticularUserPostsPage from '../views/ParticularUserPostsPage.vue';
import Admin from '../views/Admin.vue';
import EditingPage from '../views/EditingPage.vue';
import AddPostPage from '../views/AddPostPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/singlePostPage/:name/:id',
    name: 'SinglePostPage',
    component: SinglePostPage,
  },
  {
    path: '/particularUserPosts/:name',
    name: 'ParticularUserPostsPage',
    component: ParticularUserPostsPage,
  },
  {
    path: '/register',
    name: 'Registration',
    component: Registration,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter(to, from, next) {
      let token = localStorage.getItem('vue-blog-key');
      if (token !== null) {
        next();
      } else {
        next({
          name: 'Login',
        });
      }
    },
  },
  {
    path: '/editPosts',
    name: 'EditPosts',
    component: EditingPage,
    beforeEnter(to, from, next) {
      let token = localStorage.getItem('vue-blog-key');
      if (token !== null) {
        next();
      } else {
        next({
          name: 'Login',
        });
      }
    },
  },
  {
    path: '/addPost',
    name: 'AddPost',
    component: AddPostPage,
    beforeEnter(to, from, next) {
      let token = localStorage.getItem('vue-blog-key');
      if (token !== null) {
        next();
      } else {
        next({
          name: 'Login',
        });
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
