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
    path: "/forum",
    name: "forum",
    props:true,
    component: () => import("../views/forum/forums.vue")
  },
  {
    path:"/forum/addForum",
    name:"addForum",
    component: () => import("../views/forum/ajouterForum.vue")
  },
  {
    path:"/forum/:titreForum",
    name: "listeSujet",
    component : () => import("../views/forum/listeSujet"),
    props: true
  },
  {path:"/forum/:titreForum/:idSujet",
  name: "Sujet post",
  props : true,
  component : () => import("../views/forum/listeCommentaire.vue")
},
  {
    path: "/forum/:titreForum/addSujet",
    name : "addSujet",
    props : true,
    component : () => import("../views/forum/addSujet")
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
    path: "/membre/:nomUtilisateur",
    name: "afficherMembre",
    component: () => import("../views/User/UserInfo.vue"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/membre/:nomUtilisateur/edit",
    name: "modifierMembre",
    component: () => import("../views/User/UserEdit.vue"),
    props: true,
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
        if (decoded.nomUtilisateur === to.params.nomUtilisateur) {
          next();
        } else {
          next({
            path: "/",
          });
        }
      }
    },
  },
  {
    path: "/membre/:email/edit/:update",
    name: "modifierFormation",
    component: () => import("../views/UpdateFormation.vue"),
    props: true,
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
  {
    path: "/admin/signalements",
    name: "AdminSignal",
    component: () => import("../views/AdminSignal.vue"),
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
  // Routes formations
  {
    path: "/addFormation",
    name: "Ajout Formation",
    component: () => import("../views/Formations/AjoutFormation.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/editFormation",
    name: "Edit Formation",
    component: () => import("../views/Formations/ModifierFormation.vue"),
    props: true,
    meta: {
      requiresAuth: true
    }
  }
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
