import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("./layouts/Home.vue")
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("./layouts/Settings.vue")
    },
    {
        path: "/logs",
        name: "Logs",
        component: () => import("./layouts/Logs.vue")
    },
    {
        path: "/authors",
        name: "Authors",
        component: () => import("./layouts/Authors.vue")
    },
    {
        path: "/modpacks",
        name: "Modpacks",
        component: () => import("./layouts/Modpacks.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;