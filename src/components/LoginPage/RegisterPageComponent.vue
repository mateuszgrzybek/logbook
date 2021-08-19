<template>
    <div class="container">
        <section class="section is-info is-fullheight is-flex is-align-items-center is-flex-direction-column">
            <Form @submit="registerUser" class="column is-flex is-flex-direction-column is-5-desktop is-5-tablet is-12-mobile">
                <div class="input-wrapper mb-5">
                    <label for="firstName" class="title is-6 has-text-white">First name</label>
                    <Field rules="name" name="firstName" class="input" v-model="register.firstName" />
                    <ErrorMessage name="firstName" />
                </div>
                <div class="input-wrapper mb-5">
                    <label for="lastName" class="title is-6 has-text-white">Last name</label>
                    <Field rules="name" name="lastName" class="input" v-model="register.lastName" />
                    <ErrorMessage name="lastName" />
                </div>
                <div class="input-wrapper mb-5">
                    <label for="email" class="title is-6 has-text-white">Email address</label>
                    <Field rules="email" name="email" class="input" v-model="register.email" />
                    <ErrorMessage name="email" />
                </div>
                <div class="input-wrapper mb-5">
                    <label for="password" class="title is-6 has-text-white">Password</label>
                    <Field rules="password" type="password" name="password" class="input" v-model="register.password" />
                    <ErrorMessage name="password" />
                </div>
                <div class="input-wrapper mb-5">
                    <label for="passwordConfirmation" class="title is-6 has-text-white">Repeat password</label>
                    <Field name="passwordConfirmation" type="password" rules="passwordConfirmation:@password" class="input" />
                    <ErrorMessage name="passwordConfirmation" />
                </div>
                <div v-if="isRegistrationError" class="login-error-wrapper mb-5">
                    <p class="has-text-danger-dark has-text-centered has-text-weight-semibold">
                        User with that email address already exists
                    </p>
                </div>
                <button class="button is-white is-outlined" type="submit">
                    <span class="icon">
                        <i class="fa fa-user-plus"></i>
                    </span>
                    <span>Sign in</span>
                </button>
            </Form>
            <div class="column has-text-centered has-text-white">
                <span>If you've already registered before, </span>
                <router-link to="/login" class="has-text-grey-light">click here to log in.</router-link>
            </div>
        </section>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { createUser } from "../mongo-express-script";
import router from "../../router";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            register: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
            isRegistrationError: false,
        };
    },
    methods: {
        async registerUser() {
            const newUser = {
                firstName: this.register.firstName,
                lastName: this.register.lastName,
                email: this.register.email,
                password: this.register.password,
                logbookEntries: [],
            };

            createUser(newUser)
                .then(response => {
                    sessionStorage.setItem("jwt", response.data.token);
                    console.log("Success");
                    router.go(-1);
                })
                .catch(error => {
                    if (error.response.status === 409) {
                        this.isRegistrationError = true;
                    }
                    console.log(`An error has occured:\n${error}`);
                });
        },
    },
    watch: {
        register: {
            deep: true,
            handler() {
                this.isRegistrationError = false;
            },
        },
    },
};
</script>
