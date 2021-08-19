<template>
    <section class="section is-info is-fullheight-with-navbar">
        <div class="container">
            <h1 class="title mb-6 has-text-white">
                Logbook entries
            </h1>
            <h2 class="subtitle has-text-white">
                Here you can find all your logbook entries.
            </h2>
            <router-link class="button is-white is-outlined mb-5 mr-5" :to="{ name: 'NewFlight' }">
                <span class="icon">
                    <i class="fa fa-plus"></i>
                </span>
                <span>Log a new flight</span>
            </router-link>
            <button class="button is-white is-outlined mb-5" v-on:click="switchView()">
                <span class="icon">
                    <i class="fa fa-table"></i>
                </span>
                <span>{{ changeViewText }}</span>
            </button>
            <h2 v-if="!logbookEntries.length" class="subtitle has-text-white">
                You haven't logged any flights yet.
            </h2>
            <div v-if="!isTableView" class="columns is-multiline">
                <div v-for="logbookEntry in logbookEntries" :key="logbookEntry._id" class="column is-one-third mb-6">
                    <FlightCard :logbookEntry="logbookEntry" @EntryDeleted="updateEntriesArray"></FlightCard>
                </div>
            </div>
            <table v-if="isTableView" class="table">
                <thead>
                    <tr>
                        <th><abbr title="Pilot">Pilot's name</abbr></th>
                        <th><abbr title="Acf. ICAO">Aircraft ICAO</abbr></th>
                        <th><abbr title="Acf. reg.">Aicraft registration</abbr></th>
                        <th><abbr title="Dep. ICAO">Departure airport ICAO</abbr></th>
                        <th><abbr title="Arr. ICAO">Arrival airport ICAO</abbr></th>
                        <th><abbr title="Dep. time">Departure time</abbr></th>
                        <th><abbr title="Arr. time">Arrival time</abbr></th>
                        <th><abbr title="Flt. Time">Flight time</abbr></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="logbookEntry in logbookEntries" :key="logbookEntry._id">
                        <td>{{ logbookEntry.pilotName }}</td>
                        <td>{{ logbookEntry.aircraftICAO }}</td>
                        <td>{{ logbookEntry.aircraftRegistration }}</td>
                        <td>{{ logbookEntry.depICAO }}</td>
                        <td>{{ logbookEntry.arrICAO }}</td>
                        <td>{{ logbookEntry.depTimeZulu }}</td>
                        <td>{{ logbookEntry.arrTimeZulu }}</td>
                        <td>{{ logbookEntry.flightTime }}</td>
                        <td>
                            <button type="button" class="button" v-on:click="deleteEntry(logbookEntry)">
                                <span class="icon mr-1">
                                    <i class="fa fa-trash"></i>
                                </span>
                                <span>Delete</span>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="button">
                                <span class="icon mr-1">
                                    <i class="fa fa-pen"></i>
                                </span>
                                <span>Edit</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
import { getAllEntries } from "../mongo-express-script";
import FlightCard from "./FlightCardComponent.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    setup() {
        const store = useStore();
        const userId = computed(() => store.state.userId);
        const userEntries = computed(() => store.state.userEntries);

        function deleteUserEntry(entryId) {
            store.commit("deleteUserEntry", entryId);
        }

        return { userId, userEntries, deleteUserEntry };
    },
    name: "FlightsPage",
    data() {
        return {
            logbookEntries: [],
            changeViewText: this.isTableView ? "Switch to card view" : "Switch to table view",
            isTableView: false,
        };
    },
    components: {
        FlightCard,
    },
    mounted() {
        getAllEntries().then(response => {
            this.userEntries.forEach(userEntry => {
                response.data.forEach(responseEntry => {
                    if (userEntry === responseEntry._id) {
                        this.logbookEntries.push(responseEntry);
                    }
                });
            });
        });
    },
    methods: {
        updateEntriesArray(entry) {
            this.logbookEntries.splice(this.logbookEntries.indexOf(entry), 1);
            this.deleteUserEntry(entry._id);
        },
        switchView() {
            this.isTableView = !this.isTableView;
            this.changeViewText = this.isTableView ? "Switch to card view" : "Switch to table view";
        },
    },
};
</script>

<style lang="scss" scoped>
section {
    height: calc(100vh - 3.25rem);
}
</style>
