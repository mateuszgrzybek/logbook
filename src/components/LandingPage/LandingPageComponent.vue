<template>
    <section class="hero is-info is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div v-if="!isUserLoggedIn" class="column is-6 is-offset-3">
                    <h1 class="title">
                        Web based solution for your Logbook
                    </h1>
                    <h2 class="subtitle">
                        Access and keep track of your flight logs, wherever you are!
                    </h2>
                    <h1 class="title">Please log in or register.</h1>
                </div>
                <div v-if="isUserLoggedIn" class="column is-6 is-offset-3">
                    <h1 class="title">Hello {{ firstName }} {{ lastName }}</h1>
                    <h2 class="subtitle pb-0 pt-4">
                        Welcome to your personal logbook.
                    </h2>
                    <h2 class="subtitle pt-0">
                        Whenever you need it, wherever you are.
                    </h2>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

export default {
    name: "LandingPage",
    components: {},
    setup() {
        const store = useStore();
        const firstName = computed(() => store.state.firstName);
        const lastName = computed(() => store.state.lastName);
        const isUserLoggedIn = computed(() => store.state.isUserLoggedIn);

        function userLogIn() {
            store.commit("userLogIn", {
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                userId: this.user._id,
                userEntries: this.user.logbookEntries,
                aircraftTypes: this.user.aircraftTypes,
            });
        }

        return { firstName, lastName, isUserLoggedIn, userLogIn };
    },
    data() {
        return {
            user: {},
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (from.name === "Login") {
                const token = sessionStorage.getItem("jwt");
                if (token !== null) {
                    const decoded = jwt_decode(token);
                    vm.user = decoded;
                    vm.userLogIn();
                }
            }
            if (from.name === "Register") {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 10000,
                    timerProgressBar: true,
                });
                Toast.fire({
                    title: "Registration complete",
                    text: "You can now log in with the provided credentials",
                    icon: "success",
                });
            }
        });
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
