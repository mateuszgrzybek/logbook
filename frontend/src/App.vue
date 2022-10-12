<template>
    <VApp>
        <SideBar :isUserLoggedIn="isUserLoggedIn" :firstName="firstName" :lastName="lastName" :email="email"></SideBar>
        <VMain>
            <SlideShow></SlideShow>
            <router-view />
            <!-- main content -->
        </VMain>
    </VApp>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import SideBar from "./components/Main/SideBarComponent.vue";
import SlideShow from "./components/Main/SlideshowComponent.vue";

export default {
    name: "App",
    components: {
        SideBar,
        SlideShow,
    },
    setup() {
        const store = useStore();
        const firstName = computed(() => store.state.firstName);
        const lastName = computed(() => store.state.lastName);
        const email = computed(() => store.state.email);
        const isUserLoggedIn = computed(() => store.state.isUserLoggedIn);

        return { firstName, lastName, email, isUserLoggedIn };
    },
};
</script>

<style lang="scss"></style>
