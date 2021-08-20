<template>
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
                    <NavButton v-if="!isUserLoggedIn" routeName="Login" btnText="Login" iconClass="fa-door-open"></NavButton>
                    <NavButton v-if="!isUserLoggedIn" routeName="Register" btnText="Register" iconClass="fa-user-plus"></NavButton>
                    <NavButton v-if="isUserLoggedIn" routeName="Flights" btnText="Flights" iconClass="fa-plane-departure"></NavButton>
                    <NavButton v-if="isUserLoggedIn" routeName="Fleet" btnText="Fleet" iconClass="fa-plane"></NavButton>
                    <NavButton
                        v-on:click="logUserOut"
                        v-if="isUserLoggedIn"
                        routeName="LandingPage"
                        btnText="Log Out"
                        iconClass="fa-door-open"
                    ></NavButton>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import NavButton from "./NavButtonComponent.vue";
import { useStore } from "vuex";

export default {
    name: "Navbar",
    components: {
        NavButton,
    },
    setup() {
        const store = useStore();

        function userLogOut() {
            store.commit("userLogOut");
        }

        return { userLogOut };
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
        logUserOut() {
            sessionStorage.clear();
            this.userLogOut();
        },
    },
    props: {
        isUserLoggedIn: Boolean,
    },
    mounted() {
        this.topFadeOverlay = document.querySelector(".top-fade-overlay");
        window.addEventListener("scroll", this.scrollHandler);
    },
    unmounted() {
        window.removeEventListener("scroll", this.scrollHandler);
    },
};
</script>

<style lang="scss" scoped>
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
