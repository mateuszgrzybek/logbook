<template>
    <div class="container">
        <section class="section is-info is-fullheight is-flex is-align-items-center is-flex-direction-column">
            <form class="column is-5-desktop is-5-tablet is-12-mobile">
                <div class="mb-5">
                    <label for="email" class="title is-6 has-text-white">Email address</label>
                    <input name="email" class="input" v-model="login.email" />
                </div>
                <div class="mb-5">
                    <label for="password" class="title is-6 has-text-white">Password</label>
                    <input name="password" class="input" v-model="login.password" />
                </div>
            </form>
            <button class="button is-white is-outlined mb-5" type="submit" v-on:click="loginUser">
                <span class="icon">
                    <i class="fa fa-door-open"></i>
                </span>
                <span>Log in</span>
            </button>
            <p class="has-text-white">
                If you don't have an account,
                <router-link to="/register" class="has-text-grey-light">click here to sign in.</router-link>
            </p>
        </section>
    </div>
</template>

<script>
import { loginUser } from "../mongo-express-script";
import router from "../../router";

export default {
    data() {
        return {
            login: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async loginUser() {
            const loginCredentials = {
                email: this.login.email,
                password: this.login.password,
            };

            loginUser(loginCredentials)
                .then(response => {
                    sessionStorage.setItem("jwt", response.data.token);
                    router.push({ name: "LandingPage", params: { successfulLogin: true, isUserLoggedIn: true } });
                })
                .catch(error => {
                    console.log(`An error has occured:\n${error}`);
                });
        },
    },
};
</script>
