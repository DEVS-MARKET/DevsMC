import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("./pages/Home.vue")
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("./pages/Settings.vue")
    },
    {
        path: "/logs",
        name: "Logs",
        component: () => import("./pages/Logs.vue")
    },
    {
        path: "/authors",
        name: "Authors",
        component: () => import("./pages/Authors.vue")
    },
    {
        path: "/modpacks",
        name: "Modpacks",
        component: () => import("./pages/Modpacks.vue")
    },
    {
        path: "/modpacks/:index/mods",
        name: "Mods",
        component: () => import("./pages/Modpacks/ModsInstaller.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;