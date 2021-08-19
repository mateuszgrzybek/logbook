<template>
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
</template>

<script>
import { deleteEntry, deleteUserEntry } from "../mongo-express-script";

export default {
    name: "FlightsTableEntry",
    props: {
        logbookEntry: Object,
        userId: String,
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
                        this.$parent.$emit("EntryDeleted", entry);
                    }
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
