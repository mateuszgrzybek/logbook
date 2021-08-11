<template>
    <div class="container">
        <section class="section is-info is-fullheight is-flex is-align-items-center is-flex-direction-column">
            <form class="column is-5-desktop is-5-tablet is-12-mobile">
                <div class="mb-5">
                    <label for="firstName" class="title is-6 has-text-white">First name</label>
                    <input name="firstName" class="input" v-model="register.firstName" />
                </div>
                <div class="mb-5">
                    <label for="lastName" class="title is-6 has-text-white">Last name</label>
                    <input name="lastName" class="input" v-model="register.lastName" />
                </div>
                <div class="mb-5">
                    <label for="email" class="title is-6 has-text-white">Email address</label>
                    <input name="email" class="input" v-model="register.email" />
                </div>
                <div class="mb-5">
                    <label for="password" class="title is-6 has-text-white">Password</label>
                    <input name="password" class="input" v-model="register.password" />
                </div>
            </form>
            <button class="button is-white is-outlined mb-5" type="submit" v-on:click="registerUser">
                <span class="icon">
                    <i class="fa fa-user-plus"></i>
                </span>
                <span>Sign in</span>
            </button>
            <p class="has-text-white">
                If you've already registered before,
                <router-link to="/login" class="has-text-grey-light">click here to log in.</router-link>
            </p>
        </section>
    </div>
</template>
<script>
import { createUser } from "../mongo-express-script";
import router from "../../router";

export default {
    data() {
        return {
            register: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async registerUser() {
            const newUser = {
                firstName: this.register.firstName,
                lastName: this.register.lastName,
                email: this.register.email,
                password: this.register.email,
            };

            createUser(newUser)
                .then(response => {
                    sessionStorage.setItem("jwt", response.data.token);
                    console.log("Success");
                    router.go(-1);
                })
                .catch(error => {
                    console.log(`An error has occured:\n${error}`);
                });
        },
    },
};
</script>
