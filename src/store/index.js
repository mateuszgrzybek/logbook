import { createStore } from "vuex";

const userStore = createStore({
    state: {
        isUserLoggedIn: false,
        firstName: "",
        lastName: "",
    },
    mutations: {
        userLogIn(state, payload) {
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.isUserLoggedIn = true;
        },
        userLogOut(state) {
            state.isUserLoggedIn = false;
            state.firstName = "";
            state.lastName = "";
        },
    },
});

export default userStore;
