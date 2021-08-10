<template>
    <Slideshow></Slideshow>
    <div class="hero-head">
        <nav class="navbar is-fixed-top">
            <div class="top-fade-overlay"></div>
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
    data() {
        return {
            topFadeOverlay: Element,
        };
    },
    methods: {
        scrollHandler() {
            this.setOverlay(this.topFadeOverlay);
        },
        setOverlay(overlay) {
            if (window.scrollY !== 0) {
                overlay.classList.add("overlay-active");
            } else {
                overlay.classList.remove("overlay-active");
            }
        },
    },
    mounted() {
        this.topFadeOverlay = document.querySelector(".top-fade-overlay");
        console.log(this.topFadeOverlay);
        window.addEventListener("scroll", this.scrollHandler);
    },
    unmounted() {
        window.removeEventListener("scroll", this.scrollHandler);
    },
};
</script>

<style lang="scss">
.hero-head {
    nav.navbar {
        background: transparent;
        .navbar-item,
        .navbar-burger {
            color: white;
        }
    }
}
.top-fade-overlay {
    position: absolute;
    pointer-events: none;
    transition: opacity 0.3s;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0.75);
    &.overlay-active {
        opacity: 1;
    }
}
</style>
