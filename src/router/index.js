import { createRouter, createWebHistory } from "vue-router";

// vue项目自带路由
const routes= [
  {
    path: "/",
    name: "Home",
    component: ()=> import('../components/Index.vue')
  },
];

const routers = [...routes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routes]
});

export default router;
