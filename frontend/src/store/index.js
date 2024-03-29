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
        email: "",
        userId: "",
        userEntries: [],
        aircraftTypes: [
            {
                aircraftICAO: String,
                aircraftRegistration: String,
                aircraftPhoto: String,
            },
        ],
    },
    mutations: {
        userLogIn(state, payload) {
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.email = payload.email;
            state.isUserLoggedIn = true;
            state.userId = payload.userId;
            state.userEntries = payload.userEntries;
            state.aircraftTypes = payload.aircraftTypes;
        },
        userLogOut(state) {
            state.isUserLoggedIn = false;
            state.firstName = "";
            state.lastName = "";
            state.email = "";
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
            const newEntryAircraftType = {
                aircraftICAO: payload.aircraftICAO,
                aircraftRegistration: payload.aircraftRegistration,
                aircraftPhoto: payload.aircraftPhoto,
            };
            state.aircraftTypes.push(newEntryAircraftType);
        },
        deleteAircraftType(state, payload) {
            const deletedEntryAircraftType = {
                aircraftICAO: payload.aircraftICAO,
                aircraftRegistration: payload.aircraftRegistration,
                aircraftPhoto: payload.aircraftPhoto,
            };
            const matchingIndex = state.aircraftTypes.findIndex(
                (aircraftType) =>
                    aircraftType.aircraftICAO === deletedEntryAircraftType.aircraftICAO &&
                    aircraftType.aircraftRegistration === deletedEntryAircraftType.aircraftRegistration
            );
            state.aircraftTypes.splice(matchingIndex, 1);
        },
    },
});

export default store;
