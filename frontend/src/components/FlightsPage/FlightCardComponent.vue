<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="logbookEntry.planeSpottersPhotoSource" alt="Aircraft image" />
            </figure>
        </div>
        <div class="card-content">
            <p class="is-size-6 mb-3"><span class="has-text-weight-bold is-size-6">Pilot's name: </span>{{ logbookEntry.pilotName }}</p>
            <p class="is-size-6 mb-3"><span class="has-text-weight-bold is-size-6">Aircraft ICAO: </span>{{ logbookEntry.aircraftICAO }}</p>
            <p class="is-size-6 mb-3">
                <span class="has-text-weight-bold is-size-6">Aircraft registration: </span>{{ logbookEntry.aircraftRegistration }}
            </p>
            <p class="is-size-6 mb-3">
                <span class="has-text-weight-bold is-size-6">Departure airport ICAO: </span>{{ logbookEntry.depICAO }}
            </p>
            <p class="is-size-6 mb-3">
                <span class="has-text-weight-bold is-size-6">Arrival airport ICAO: </span>{{ logbookEntry.arrICAO }}
            </p>
            <p class="is-size-6 mb-3"><span class="has-text-weight-bold is-size-6">Departure time: </span>{{ logbookEntry.depTimeZulu }}</p>
            <p class="is-size-6 mb-3"><span class="has-text-weight-bold is-size-6">Arrival time: </span>{{ logbookEntry.arrTimeZulu }}</p>
            <p class="is-size-6"><span class="has-text-weight-bold is-size-6">Flight time: </span>{{ logbookEntry.flightTime }}</p>
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
import { deleteEntry, deleteUserEntry } from "../mongo-express-script";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    setup() {
        const store = useStore();
        const userId = computed(() => store.state.userId);

        return { userId };
    },
    name: "FlightCard",
    props: {
        logbookEntry: Object,
    },
    methods: {
        deleteEntry(entry) {
            const payload = {
                userId: this.userId,
                entryId: entry._id,
            };
            deleteUserEntry(payload).then(() => {
                deleteEntry(entry).then(response => {
                    if (response.status === 200) {
                        this.$emit("EntryDeleted", entry);
                    }
                });
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
