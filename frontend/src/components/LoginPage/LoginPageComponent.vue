<template>
    <div class="container">
        <section class="section is-info is-fullheight is-flex is-align-items-center is-flex-direction-column">
            <Form @submit="loginUser" class="column is-flex is-flex-direction-column is-5-desktop is-5-tablet is-12-mobile">
                <div class="input-wrapper mb-5">
                    <label for="email" class="title is-6 has-text-white">Email address</label>
                    <Field rules="email" name="email" class="input" v-model="login.email" />
                    <ErrorMessage name="email" />
                </div>
                <div class="input-wrapper mb-5">
                    <label for="password" class="title is-6 has-text-white">Password</label>
                    <Field rules="required" type="password" name="password" class="input" v-model="login.password" />
                    <ErrorMessage name="password" />
                </div>
                <div v-if="isLoginError" class="login-error-wrapper mb-5">
                    <p class="has-text-danger-dark has-text-centered has-text-weight-semibold">
                        Couldn't find a user matching your credentials
                    </p>
                </div>
                <button class="button is-white is-outlined" type="submit">
                    <span class="icon">
                        <i class="fa fa-door-open"></i>
                    </span>
                    <span>Log in</span>
                </button>
            </Form>
            <p class="column has-text-centered has-text-white">
                If you don't have an account,
                <router-link to="/register" class="has-text-grey-light">click here to sign in.</router-link>
            </p>
        </section>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { loginUser } from "../mongo-express-script";
import { useStore } from "vuex";
import { computed } from "vue";
import router from "../../router";

export default {
    setup() {
        const store = useStore();
        const firstName = computed(() => store.state.firstName);
        const lastName = computed(() => store.state.lastName);
        const isUserLoggedIn = computed(() => store.state.isUserLoggedIn);
        const userId = computed(() => store.state.userId);

        return { firstName, lastName, isUserLoggedIn, userId };
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            login: {
                email: "",
                password: "",
            },
            user: {},
            isLoginError: false,
        };
    },
    methods: {
        async loginUser() {
            const loginCredentials = {
                email: this.login.email,
                password: this.login.password,
            };

            loginUser(loginCredentials)
                .then((response) => {
                    if (response.data.token !== null) {
                        sessionStorage.setItem("jwt", response.data.token);
                        router.push({ name: "Home" });
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        this.isLoginError = true;
                    }
                });
        },
    },
    watch: {
        login: {
            deep: true,
            handler() {
                this.isLoginError = false;
            },
        },
    },
};
</script>
