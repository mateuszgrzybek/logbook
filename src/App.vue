<template>
    <Slideshow></Slideshow>
    <Navbar :isUserLoggedIn="isUserLoggedIn" :firstName="firstName" :lastName="lastName"></Navbar>
    <router-view />
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Slideshow from "./components/LandingPage/SlideshowComponent.vue";
import Navbar from "./components/LandingPage/NavbarComponent.vue";

export default {
    name: "App",
    components: {
        Slideshow,
        Navbar,
    },
    setup() {
        const store = useStore();
        const firstName = computed(() => store.state.firstName);
        const lastName = computed(() => store.state.lastName);
        const isUserLoggedIn = computed(() => store.state.isUserLoggedIn);

        return { firstName, lastName, isUserLoggedIn };
    },
};
</script>

<style lang="scss"></style>
