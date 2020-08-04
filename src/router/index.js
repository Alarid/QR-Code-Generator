import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/save',
    name: 'Save QR Code',
    props: true,
    component: () => import(/* webpackChunkName: "qrCodeSave" */ '../views/QRCodeSave.vue'),
    beforeEnter(to, from, next) {
      let allow = true;
      if (!to.params.url) {
        console.log('URL missing in request, navigation to QRCodeSave not allowed');
        allow = false;
      }
      next(allow);
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
