<template>
    <section class="hero is-info is-fullheight">
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
                            <NavButton btnText="Home" iconClass="fa-home"></NavButton>
                            <NavButton btnText="Flights" iconClass="fa-plane-departure"></NavButton>
                            <NavButton btnText="Fleet" iconClass="fa-plane"></NavButton>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h1 class="title">
                        Web based solution for your Logbook
                    </h1>
                    <h2 class="subtitle">
                        Access and keep track of your flight logs, wherever you are!
                    </h2>
                    <h1 class="title">Coming soon</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavButton from "./NavButtonComponent.vue";
import Slideshow from "./SlideshowComponent.vue";

export default {
    name: "LandingPage",
    components: {
        NavButton,
        Slideshow,
    },
};
</script>

<style lang="scss" scoped>
.hero.is-info {
    background-color: #808080;
}
.hero .nav,
.hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
}
.hero .subtitle {
    padding: 3rem 0;
    line-height: 1.5;
}
</style>
