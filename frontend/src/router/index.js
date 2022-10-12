import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Main/HomeComponent.vue";
import FlightsPage from "../components/FlightsPage/FlightsPageComponent.vue";
import FleetPage from "../components/FleetPage/FleetPageComponent.vue";
import NewFlightPage from "../components/FlightsPage/NewFlightPageComponent.vue";
import LoginPage from "../components/LoginPage/LoginPageComponent.vue";
import RegisterPage from "../components/LoginPage/RegisterPageComponent.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        props: true,
    },
    {
        path: "/flights",
        name: "Flights",
        component: FlightsPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/fleet",
        name: "Fleet",
        component: FleetPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/flights/add",
        name: "NewFlight",
        component: NewFlightPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage,
    },

    {
        path: "/register",
        name: "Register",
        component: RegisterPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // temporary, switch to cookies later (adjust backend to support it)
        if (sessionStorage.getItem("vuex") === null) {
            next({
                path: "/",
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
