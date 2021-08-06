<template>
    <Slideshow></Slideshow>
    <div class="hero-head">
        <nav class="navbar">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item" href="../">
                        Logbook
                    </a>
                    <span class="navbar-burger burger" data-target="navbarMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </div>
                <div id="navbarMenu" class="navbar-menu">
                    <div class="navbar-end">
                        <NavButton routeName="LandingPage" btnText="Home" iconClass="fa-home"></NavButton>
                        <NavButton routeName="Flights" btnText="Flights" iconClass="fa-plane-departure"></NavButton>
                        <NavButton btnText="Fleet" iconClass="fa-plane"></NavButton>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <router-view />
</template>

<script>
import Slideshow from "./components/LandingPage/SlideshowComponent.vue";
import NavButton from "./components/LandingPage/NavButtonComponent.vue";

export default {
    name: "App",
    components: {
        Slideshow,
        NavButton,
    },
};
</script>

<style lang="scss" scoped>
.hero-head {
    nav.navbar {
        background-color: transparent;
        .navbar-item,
        .navbar-burger {
            color: white;
        }
    }
}
</style>
