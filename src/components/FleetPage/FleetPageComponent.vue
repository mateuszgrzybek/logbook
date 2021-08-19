<template>
    <section class="section is-info is-fullheight-with-navbar">
        <div class="container">
            <h1 class="title mb-6 has-text-white">
                Fleet
            </h1>
            <h2 class="subtitle has-text-white">
                Here you can find all the aircraft types you've flown, based on your logbook entries.
            </h2>
            <h2 v-if="!aircraftTypes.length" class="subtitle has-text-white">
                You haven't logged any flights yet, thus no aircraft can be displayed as part of your fleet.
            </h2>
            <div v-if="aircraftTypes.length">
                <div v-for="aircraftType in aircraftTypes" :key="aircraftType">
                    <p class="has-text-white">{{ aircraftType }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    name: "FleetPage",
    setup() {
        const store = useStore();
        const aircraftTypes = computed(() => store.state.aircraftTypes);

        return { aircraftTypes };
    },
};
</script>

<style lang="scss" scoped></style>
