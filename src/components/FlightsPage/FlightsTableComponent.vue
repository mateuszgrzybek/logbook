<template>
    <table class="table is-hoverable" v-if="logbookEntries.length">
        <thead>
            <tr>
                <th>Pilot's name</th>
                <th>Aircraft ICAO</th>
                <th>Aicraft registration</th>
                <th>Departure airport ICAO</th>
                <th>Arrival airport ICAO</th>
                <th>Departure time</th>
                <th>Arrival time</th>
                <th>Flight time</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="logbookEntry in logbookEntries" :key="logbookEntry._id">
                <FlightsTableEntry :logbookEntry="logbookEntry" :userId="userId"></FlightsTableEntry>
            </tr>
        </tbody>
    </table>
</template>

<script>
import FlightsTableEntry from "./FlightsTableEntryComponent.vue";

export default {
    name: "FlightsTable",
    components: {
        FlightsTableEntry,
    },
    props: {
        logbookEntries: Array,
        userId: String,
    },
};
</script>

<style lang="scss" scoped></style>
