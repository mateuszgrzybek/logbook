<template>
    <section class="section is-info is-fullheight-with-navbar">
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
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    setup() {
        const store = useStore();
        const userId = computed(() => store.state.userId);
        const userEntries = computed(() => store.state.userEntries);

        return { userId, userEntries };
    },
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
            this.userEntries.splice(this.userEntries.indexOf(entry._id), 1);
        },
    },
};
</script>

<style lang="scss" scoped>
section {
    height: calc(100vh - 3.25rem);
}
</style>
