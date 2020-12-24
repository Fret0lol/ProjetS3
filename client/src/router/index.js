import Vue from "vue";
import VueRouter from "vue-router";
import VueJwtDecode from "vue-jwt-decode";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/User/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/membre/:email",
    name: "afficherMembre",
    component: () => import("../views/User/UserInfo.vue"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/membre/:email/edit",
    name: "modifierMembre",
    component: () => import("../views/User/UserEdit.vue"),
    props: true,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      console.log(to.params.email);
      console.log(localStorage.getItem("jwt"));
      let token = localStorage.getItem("jwt");
      if (token === null) {
        next({
          path: "/login",
        });
      } else {
        let decoded = VueJwtDecode.decode(token);
        if (decoded.email === to.params.email) {
          next();
        } else {
          next({
            path: "/",
          });
        }
      }
    },
  },

  // {
  //   path: "/moncompte/modifier",
  //   name: "userInfoEdit",
  //   component: () => import("../")
  // },
  {
    path: "/annuaire-membres",
    name: "AnnuaireMembres",
    component: () => import("../views/AnnuaireMembres.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: () => import("../views/AdminUsers.vue"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem("jwt");
      if (token === null) {
        next({
          path: "/login",
        });
      } else {
        let decoded = VueJwtDecode.decode(token);
        if (decoded.statut === "Administrateur") {
          next();
        } else {
          next({
            path: "/",
          });
        }
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
