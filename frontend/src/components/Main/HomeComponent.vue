<template>
    <div class="container">
        <section class="hero is-fullheight is-justify-content-center">
            <div class="has-text-white">
                <template v-if="!isUserLoggedIn">
                    <div class="is-size-2">Welcome to your personal logbook</div>
                    <div class="is-size-4">Please log in or register to use the full featureset of the application</div>
                </template>
                <template v-else>Welcome to your personal logbook, {{ firstName }}</template>
            </div>
        </section>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    name: "HomePage",
    components: {},
    setup() {
        const store = useStore();
        const isUserLoggedIn = computed(() => store.state.isUserLoggedIn);
        const firstName = computed(() => store.state.firstName);

        return { isUserLoggedIn, firstName };
    },
};
</script>

<style lang="scss" scoped></style>
