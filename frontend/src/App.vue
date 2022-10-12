<template>
    <VApp>
        <SideBar :isUserLoggedIn="isUserLoggedIn" :firstName="firstName" :lastName="lastName" :email="email"></SideBar>
        <VMain>
            <v-parallax dark :src="parallaxImage">
                <v-row align="center" justify="center">
                    <v-col class="text-center" cols="12">
                        <router-view />
                        <!-- main content -->
                    </v-col>
                </v-row>
            </v-parallax>
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

        const parallaxImage = new URL("./assets/images/unsplash_landing_cover2.jpg", import.meta.url).href;

        return { firstName, lastName, email, isUserLoggedIn, parallaxImage };
    },
};
</script>

<style lang="scss"></style>
