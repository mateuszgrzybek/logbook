import { createWebHistory, createRouter } from "vue-router";
import LandingPage from "../components/LandingPage/LandingPageComponent.vue";
import FlightsPage from "../components/FlightsPage/FlightsPageComponent.vue";
import NewFlightPage from "../components/FlightsPage/NewFlightPageComponent.vue";

const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
    },
    {
        path: "/flights",
        name: "Flights",
        component: FlightsPage,
    },
    {
        path: "/flights/add",
        name: "NewFlight",
        component: NewFlightPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
