import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("./views/Login.vue"),
    },
    {
        path: "/play",

        component: () => import("./layouts/App.vue"),
        children: [
            {
                path: "",
                component: () => import("./views/Home.vue"),
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;