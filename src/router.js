import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/pluginComponent'
  },
  {
    name: 'pluginComponent',
    component: () => import('./view/pluginComponent'),
    meta: {
      title: '插件式组件'
    },
    children: [
      {
        name: 'component',
        path: 'component',
        component: () => import('./view/pluginComponent/components.vue'),
      }
    ]
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
