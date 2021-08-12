<template>
    <section class="section is-info is-fullheight">
        <div class="container">
            <Form @submit="createNewEntry">
                <div class="column is-5">
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
                    <div class="input-wrapper mb-5">
                        <label for="aircraftRegistration" class="title is-6 has-text-white">Aircraft registration</label>
                        <input name="aircraftRegistration" class="input" v-model="aircraftRegistration" />
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
                                    <div class="control">
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
                                    <div class="control">
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
                </div>
                <div class="column is-5">
                    <button type="submit" class="button is-white is-outlined">
                        <span class="icon">
                            <i class="fa fa-plane-arrival"></i>
                        </span>
                        <span>Submit new entry</span>
                    </button>
                </div>
            </Form>
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

        return { firstName, lastName, userId, userEntries };
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
            planeSpottersPhotoSource: "",
        };
    },
    methods: {
        createNewEntry() {
            axios.get(`https://api.planespotters.net/pub/photos/reg/${this.aircraftRegistration}`).then(response => {
                const photos = response.data.photos;
                this.planeSpottersPhotoSource = photos.length === 0 ? "" : photos[0].thumbnail_large.src;

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
                        this.userEntries.push(newEntryId);
                        router.go(-1);
                    });
                });
            });
        },
        updateFlightTime() {
            let difference = Math.abs(this.arrTimeZulu.getTime() - this.depTimeZulu.getTime()) / 1000 / 3600;
            this.flightTime = Math.round((difference + Number.EPSILON) * 100) / 100;
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

<style lang="scss" scoped></style>
