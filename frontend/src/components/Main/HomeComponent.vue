<template>
    <div class="text-h2">
        <template v-if="isUserLoggedIn">Welcome to your personal logbook</template>
        <template v-else>Welcome to your personal logbook, {{ firstName }}</template>
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
