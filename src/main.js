import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

// import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

// import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";
// import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/auth",
    redirect: "/auth/login",
    name: "Login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("isAuth");

  if (to.path !== "/auth/login" && !isAuth) {
    return next({ path: "/auth/login" });
  } else if (to.path == "/auth/login" && isAuth) {
    return next({ path: "/" });
  }
  next();
});

const myV3App = createApp(App);
myV3App.use(VueToast).use(VueLoading).use(router);
// add more functionality to myV3App

// now we're ready to mount
myV3App.mount("#app");
