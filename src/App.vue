<template>
    <Slideshow></Slideshow>
    <Navbar></Navbar>
    <router-view />
</template>

<script>
import Slideshow from "./components/LandingPage/SlideshowComponent.vue";
import Navbar from "./components/LandingPage/NavbarComponent.vue";

export default {
    name: "App",
    components: {
        Slideshow,
        Navbar,
    },
};
</script>

<style lang="scss"></style>
