<template>
    <section class="section is-info is-fullheight">
        <div class="container">
            <div class="column is-5">
                <h1 class="title mb-6">
                    Logbook entries
                </h1>
                <h2 class="subtitle">
                    Here you can find all your logbook entries.
                </h2>
                <router-link class="button is-white is-outlined mb-5" :to="{ name: 'NewFlight' }">
                    <span class="icon">
                        <i class="fa fa-plus"></i>
                    </span>
                    <span>Log a new flight</span>
                </router-link>
                <div v-for="logbookEntry in logbookEntries" :key="logbookEntry._id" class="mb-6">
                    <p>Pilot's name: {{ logbookEntry.pilotName }}</p>
                    <p>Departure airport ICAO: {{ logbookEntry.depICAO }}</p>
                    <p>Arrival airport ICAO: {{ logbookEntry.arrICAO }}</p>
                    <p>Departure time: {{ logbookEntry.depTimeZulu }}</p>
                    <p>Arrival time: {{ logbookEntry.arrTimeZulu }}</p>
                    <p>Flight time: {{ logbookEntry.flightTime }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { getAllEntries } from "../mongo-express-script";

export default {
    name: "FlightsPage",
    data() {
        return {
            logbookEntries: null,
        };
    },
    mounted() {
        getAllEntries().then(response => (this.logbookEntries = response.data));
    },
};
</script>

<style lang="scss" scoped>
.container {
    .column {
        color: #fff;
        .title,
        .subtitle {
            color: #fff;
        }
    }
}
</style>
