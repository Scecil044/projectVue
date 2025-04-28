import { createWebHistory, createRouter} from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/auth/Login.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import GuestLayout from "../layouts/GuestLayout.vue";
import Users from "../pages/users/Users.vue";
import Dashboard from "../pages/Dashboard.vue";

const routes =[
    {
        path:"/",
        component: GuestLayout,
        meta:{
            requiresAuth:false,
        },
        children:[
            {
                path:"",
                name:"Home",
                component:Home,
            },
        ]
    },
    {
        path:"/app",
        component:AdminLayout,
        meta:{
            requiresAuth:true,
        },
        children:[
            {
                path:"users",
                name:"Users",
                component:Users,
            },
            {
                path:"dashboard",
                name:"Dashboard",
                component:Dashboard,
            },
        ]
    },
    {
        path:"/auth",
        component: AuthLayout,
        meta:{
            requiresAuth:false,
        },
        children:[
            {
                path:"login",
                name:"Login",
                component:Login,
            }
        ]
    },
    {
        path:"/:pathMatch(.*)*",
        name:"NotFound",
        component: ()=> import("../pages/NotFound.vue")
    }
   
];
const router = createRouter({
    history:createWebHistory(),
    routes,
})

// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !localStorage.getItem("token")) {
//         next({ name: "Login" });
//     } else if (!to.meta.requiresAuth && localStorage.getItem("token")) {
//         next({ name: "Home" });
//     } else {
//         next();
//     }
// });

export default router;