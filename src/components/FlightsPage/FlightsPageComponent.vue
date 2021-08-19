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
            <FlightsTable
                :logbookEntries="logbookEntries"
                :userId="userId"
                v-if="isTableView"
                @EntryDeleted="updateEntriesArray"
            ></FlightsTable>
        </div>
    </section>
</template>

<script>
import { getAllEntries } from "../mongo-express-script";
import FlightCard from "./FlightCardComponent.vue";
import FlightsTable from "./FlightsTableComponent.vue";
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

        function deleteAircraftType(aircraftICAO) {
            store.commit("deleteAircraftType", aircraftICAO);
        }

        return { userId, userEntries, deleteUserEntry, deleteAircraftType };
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
        FlightsTable,
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

            let entriesWithMatchingAircraftICAO = 0;
            this.logbookEntries.forEach(logbookEntry => {
                if (logbookEntry.aircraftICAO === entry.aircraftICAO) {
                    entriesWithMatchingAircraftICAO++;
                }
            });
            if (entriesWithMatchingAircraftICAO === 0) {
                this.deleteAircraftType(entry.aircraftICAO);
            }
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
