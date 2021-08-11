<template>
    <section class="hero is-info is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h1 class="title">
                        Web based solution for your Logbook
                    </h1>
                    <h2 class="subtitle">
                        Access and keep track of your flight logs, wherever you are!
                    </h2>
                    <h1 class="title">Please log in or register.</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import router from "../../router";

export default {
    name: "LandingPage",
    components: {},
    props: {
        successfulLogin: Boolean,
        isUserLoggedIn: Boolean,
        user: {},
    },
    mounted() {
        if (this.successfulLogin) {
            router.go();
        }
    },
};
</script>

<style lang="scss" scoped>
.hero.is-info {
    background-color: transparent;
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
