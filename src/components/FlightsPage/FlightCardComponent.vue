<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="logbookEntry.planeSpottersPhotoSource" alt="Aircraft image" />
            </figure>
        </div>
        <div class="card-content">
            <p class="subtitle">Pilot's name: {{ logbookEntry.pilotName }}</p>
            <p class="subtitle">Aircraft ICAO: {{ logbookEntry.aircraftICAO }}</p>
            <p class="subtitle">Aircraft registration: {{ logbookEntry.aircraftRegistration }}</p>
            <p class="subtitle">Departure airport ICAO: {{ logbookEntry.depICAO }}</p>
            <p class="subtitle">Arrival airport ICAO: {{ logbookEntry.arrICAO }}</p>
            <p class="subtitle">Departure time: {{ logbookEntry.depTimeZulu }}</p>
            <p class="subtitle">Arrival time: {{ logbookEntry.arrTimeZulu }}</p>
            <p class="subtitle">Flight time: {{ logbookEntry.flightTime }}</p>
        </div>
        <footer class="card-footer">
            <a type="button" class="card-footer-item" v-on:click="deleteEntry(logbookEntry)">
                <span class="icon mr-1">
                    <i class="fa fa-trash"></i>
                </span>
                <span>Delete</span>
            </a>
            <a type="button" class="card-footer-item">
                <span class="icon mr-1">
                    <i class="fa fa-pen"></i>
                </span>
                <span>Edit</span>
            </a>
        </footer>
    </div>
</template>

<script>
import { deleteEntry } from "../mongo-express-script";

export default {
    name: "FlightCard",
    props: {
        logbookEntry: Object,
    },
    methods: {
        deleteEntry(entry) {
            deleteEntry(entry).then(response => {
                if (response.status === 200) {
                    this.$emit("EntryDeleted", entry);
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
a {
    color: #7a7a7a;
}
</style>
