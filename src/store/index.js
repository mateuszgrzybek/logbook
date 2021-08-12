import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        }),
    ],
    state: {
        isUserLoggedIn: false,
        firstName: "",
        lastName: "",
        userId: "",
        userEntries: [],
    },
    mutations: {
        userLogIn(state, payload) {
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.isUserLoggedIn = true;
            state.userId = payload.userId;
            state.userEntries = payload.userEntries;
        },
        userLogOut(state) {
            state.isUserLoggedIn = false;
            state.firstName = "";
            state.lastName = "";
            state.userId = "";
            state.userEntries = [];
        },
    },
});

export default store;
