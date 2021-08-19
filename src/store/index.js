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
        aircraftTypes: [],
    },
    mutations: {
        userLogIn(state, payload) {
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.isUserLoggedIn = true;
            state.userId = payload.userId;
            state.userEntries = payload.userEntries;
            state.aircraftTypes = payload.aircraftTypes;
        },
        userLogOut(state) {
            state.isUserLoggedIn = false;
            state.firstName = "";
            state.lastName = "";
            state.userId = "";
            state.userEntries = [];
            state.aircraftTypes = [];
        },
        addUserEntry(state, payload) {
            const newUserEntryId = payload;
            state.userEntries.push(newUserEntryId);
        },
        deleteUserEntry(state, payload) {
            const entryToDeleteId = payload;
            state.userEntries.splice(state.userEntries.indexOf(entryToDeleteId), 1);
        },
        addAircraftType(state, payload) {
            const newEntryAircraftType = payload;
            state.aircraftTypes.push(newEntryAircraftType);
        },
        deleteAircraftType(state, payload) {
            const deletedEntryAircraftType = payload;
            state.aircraftTypes.splice(state.aircraftTypes.indexOf(deletedEntryAircraftType), 1);
        },
    },
});

export default store;
