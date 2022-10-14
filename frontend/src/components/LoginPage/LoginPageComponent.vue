<template>
    <div class="container">
        <section class="section is-info is-fullheight is-flex is-align-items-center is-flex-direction-column">
            <Form @submit="loginUserAsync" class="column is-flex is-flex-direction-column is-5-desktop is-5-tablet is-12-mobile">
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
import { computed, ref } from "vue";
import jwt_decode from "jwt-decode";
import router from "../../router";
import handleCookie from "../../helpers/cookieHelper";

export default {
    setup() {
        const store = useStore();
        const firstName = computed(() => store.state.firstName);
        const lastName = computed(() => store.state.lastName);
        const isUserLoggedIn = computed(() => store.state.isUserLoggedIn);
        const userId = computed(() => store.state.userId);

        const login = {
            email: "",
            password: "",
        };
        const isLoginError = ref(false);

        const loginUserAsync = async () => {
            const loginCredentials = {
                email: login.email,
                password: login.password,
            };

            loginUser(loginCredentials)
                .then((response) => {
                    if (response.data.token !== null) {
                        const user = jwt_decode(response.data.token);
                        store.commit("userLogIn", {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            userId: user._id,
                            userEntries: user.logbookEntries,
                            aircraftTypes: user.aircraftTypes,
                        });
                        handleCookie.write("token", response.data.token);
                        router.push({ name: "Home" });
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        isLoginError.value = true;
                    }
                });
        };

        return { firstName, lastName, isUserLoggedIn, userId, loginUserAsync, login, isLoginError };
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
};
</script>
