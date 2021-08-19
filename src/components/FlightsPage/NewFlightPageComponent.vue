<template>
    <section class="section is-info is-fullheight">
        <div class="container">
            <div class="columns">
                <Form class="column is-half" @submit="createNewEntry">
                    <div class="input-wrapper mb-5">
                        <label for="firstName" class="title is-6 has-text-white">First name</label>
                        <input name="firstName" class="input" readonly v-model="firstName" />
                    </div>
                    <div class="input-wrapper mb-5">
                        <label for="lastName" class="title is-6 has-text-white">Last name</label>
                        <input name="lastName" class="input" readonly v-model="lastName" />
                    </div>
                    <div class="input-wrapper mb-5">
                        <label for="aircraftICAO" class="title is-6 has-text-white">Aircraft ICAO</label>
                        <Field rules="icao" name="aircraftICAO" class="input icao" maxlength="4" v-model="aircraftICAO" />
                        <ErrorMessage name="aircraftICAO" />
                    </div>
                    <div class="input-wrapper mb-3">
                        <label for="aircraftRegistration" class="title is-6 has-text-white">Aircraft registration</label>
                        <Field
                            rules="required"
                            name="aircraftRegistration"
                            class="input"
                            v-model="aircraftRegistration"
                            v-on:blur="getImgUrl"
                        />
                        <ErrorMessage name="aircraftRegistration" />
                    </div>
                    <div class="card is-hidden-tablet mb-5">
                        <header class="card-header">
                            <p class="card-header-title py-2 pl-3">
                                Aircraft photo
                            </p>
                            <button type="button" class="card-header-icon p-2" aria-label="more options">
                                <span class="icon">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </header>
                        <div class="card-image is-hidden">
                            <figure class="image is-3by2">
                                <img :src="planeSpottersPhotoSource" alt="Aircraft image" />
                            </figure>
                        </div>
                    </div>
                    <div class="input-wrapper mb-5">
                        <label for="depICAO" class="title is-6 has-text-white">Departure airport ICAO</label>
                        <Field rules="icao" name="depICAO" class="input icao" maxlength="4" v-model="depICAO" />
                        <ErrorMessage name="depICAO" />
                    </div>
                    <div class="input-wrapper mb-5">
                        <label for="arrICAO" class="title is-6 has-text-white">Arrival airport ICAO</label>
                        <Field rules="icao" name="arrICAO" class="input icao" maxlength="4" v-model="arrICAO" />
                        <ErrorMessage name="arrICAO" />
                    </div>
                    <div class="input-wrapper mb-5">
                        <label for="depTimeZulu" class="title is-6 has-text-white">Departure time</label>
                        <DatePicker v-model="depTimeZulu" mode="dateTime" color="blue" is-dark is24hr>
                            <template v-slot="{ inputValue, togglePopover }">
                                <div class="field has-addons">
                                    <div class="control">
                                        <button type="button" class="button" @click="togglePopover()">
                                            <span class="icon">
                                                <i class="fa fa-plane-departure"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div class="control is-expanded">
                                        <input :value="inputValue" class="input" readonly />
                                    </div>
                                </div>
                            </template>
                        </DatePicker>
                    </div>
                    <div class="input-wrapper mb-5">
                        <label for="arrTimeZulu" class="title is-6 has-text-white">Arrival time</label>
                        <DatePicker v-model="arrTimeZulu" mode="dateTime" color="blue" is-dark is24hr>
                            <template v-slot="{ inputValue, togglePopover }">
                                <div class="field has-addons">
                                    <div class="control">
                                        <button type="button" class="button" @click="togglePopover()">
                                            <span class="icon">
                                                <i class="fa fa-plane-arrival"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div class="control is-expanded">
                                        <input :value="inputValue" class="input" readonly />
                                    </div>
                                </div>
                            </template>
                        </DatePicker>
                    </div>
                    <div class="input-wrapper mb-5">
                        <label for="flightTime" class="title is-6 has-text-white">Flight time</label>
                        <Field rules="flightTime" name="flightTime" class="input" v-model="flightTime" readonly />
                        <ErrorMessage name="flightTime" />
                    </div>
                    <button type="submit" class="button is-white is-outlined">
                        <span class="icon">
                            <i class="fa fa-plane-arrival"></i>
                        </span>
                        <span>Submit new entry</span>
                    </button>
                </Form>
                <div
                    v-if="isMatchingPhoto"
                    class="is-hidden-mobile column is-half is-flex is-flex-direction-column is-justify-content-center"
                >
                    <figure class="image is-3by2">
                        <img :src="planeSpottersPhotoSource" class="aircraft-preview-image" alt="Aircraft image" />
                    </figure>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { DatePicker } from "v-calendar";
import { createNewEntry, addUserEntry } from "../mongo-express-script";
import { useStore } from "vuex";
import { computed } from "vue";
import router from "../../router";
import axios from "axios";

export default {
    name: "NewFlight",
    components: {
        DatePicker,
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const store = useStore();
        const firstName = computed(() => store.state.firstName);
        const lastName = computed(() => store.state.lastName);
        const userId = computed(() => store.state.userId);
        const userEntries = computed(() => store.state.userEntries);

        function addUserEntry(entryId) {
            store.commit("addUserEntry", entryId);
        }

        return { firstName, lastName, userId, userEntries, addUserEntry };
    },
    mounted() {
        this.enableCardVisibilityToggle();
    },
    data() {
        return {
            pilotName: `${this.firstName} ${this.lastName}`,
            depICAO: "",
            arrICAO: "",
            depTimeZulu: new Date(),
            arrTimeZulu: new Date(),
            flightTime: 0,
            aircraftICAO: "",
            aircraftRegistration: "",
            planeSpottersPhotoSource: require("../../assets/images/placeholder.png"),
            isMatchingPhoto: false,
        };
    },
    methods: {
        createNewEntry() {
            const newEntry = {
                pilotName: this.pilotName,
                depICAO: this.depICAO.toUpperCase(),
                arrICAO: this.arrICAO.toUpperCase(),
                depTimeZulu: this.depTimeZulu.toISOString(),
                arrTimeZulu: this.arrTimeZulu.toISOString(),
                flightTime: this.flightTime,
                aircraftICAO: this.aircraftICAO.toUpperCase(),
                aircraftRegistration: this.aircraftRegistration,
                planeSpottersPhotoSource: this.planeSpottersPhotoSource,
            };

            createNewEntry(newEntry).then(response => {
                const newEntryId = response.data._id;
                const userId = this.userId;
                const payload = {
                    entryId: newEntryId,
                    userId: userId,
                };
                addUserEntry(payload).then(() => {
                    this.addUserEntry(newEntryId);
                    router.go(-1);
                });
            });
        },
        updateFlightTime() {
            let difference = Math.abs(this.arrTimeZulu.getTime() - this.depTimeZulu.getTime()) / 1000 / 3600;
            this.flightTime = Math.round((difference + Number.EPSILON) * 100) / 100;
        },
        getImgUrl() {
            if (this.aircraftRegistration.length > 0) {
                axios.get(`https://api.planespotters.net/pub/photos/reg/${this.aircraftRegistration}`).then(response => {
                    const photos = response.data.photos;
                    if (photos.length > 0) {
                        this.planeSpottersPhotoSource = photos.length === 0 ? "" : photos[0].thumbnail_large.src;
                        this.isMatchingPhoto = true;
                    } else {
                        this.setPlaceholderImage();
                    }
                });
            } else {
                this.setPlaceholderImage();
            }
        },
        enableCardVisibilityToggle() {
            const mobileCardToggle = document.getElementsByClassName("card-header-icon")[0];
            const mobileCardImage = document.getElementsByClassName("card-image")[0];
            mobileCardToggle.addEventListener("click", () => {
                mobileCardImage.classList.toggle("is-hidden");
            });
        },
        setPlaceholderImage() {
            this.isMatchingPhoto = false;
            this.planeSpottersPhotoSource = require("../../assets/images/placeholder.png");
        },
    },
    watch: {
        depTimeZulu: function() {
            this.updateFlightTime();
        },
        arrTimeZulu: function() {
            this.updateFlightTime();
        },
    },
};
</script>

<style lang="scss" scoped>
.aircraft-preview-image {
    border-radius: 0.5rem;
    box-shadow: 0px 0px 30px 9px rgba(0, 0, 0, 0.5);
}
</style>
