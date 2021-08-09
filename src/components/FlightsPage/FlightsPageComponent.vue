<template>
    <section class="section is-info is-fullheight">
        <div class="container">
            <h1 class="title mb-6 has-text-white">
                Logbook entries
            </h1>
            <h2 class="subtitle has-text-white">
                Here you can find all your logbook entries.
            </h2>
            <router-link class="button is-white is-outlined mb-5" :to="{ name: 'NewFlight' }">
                <span class="icon">
                    <i class="fa fa-plus"></i>
                </span>
                <span>Log a new flight</span>
            </router-link>
            <div class="columns is-multiline">
                <div v-for="logbookEntry in logbookEntries" :key="logbookEntry._id" class="column is-one-third mb-6">
                    <FlightCard :logbookEntry="logbookEntry" @EntryDeleted="updateEntriesArray"></FlightCard>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { getAllEntries } from "../mongo-express-script";
import FlightCard from "./FlightCardComponent.vue";

export default {
    name: "FlightsPage",
    data() {
        return {
            logbookEntries: [],
        };
    },
    components: {
        FlightCard,
    },
    mounted() {
        getAllEntries().then(response => (this.logbookEntries = response.data));
    },
    activated() {
        getAllEntries().then(response => (this.logbookEntries = response.data));
    },
    methods: {
        updateEntriesArray(entry) {
            this.logbookEntries.splice(this.logbookEntries.indexOf(entry), 1);
        },
    },
};
</script>

<style lang="scss" scoped></style>
