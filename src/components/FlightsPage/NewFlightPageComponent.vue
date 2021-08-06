<template>
    <section class="section is-info is-fullheight">
        <div class="container">
            <form>
                <div class="column is-5">
                    <div class="mb-5">
                        <label for="pilotName" class="title is-6 has-text-white">Pilot's name</label>
                        <input name="pilotName" class="input" v-model="pilotName" />
                    </div>
                    <div class="mb-5">
                        <label for="depICAO" class="title is-6 has-text-white">Departure airport ICAO</label>
                        <input name="depICAO" class="input" v-model="depICAO" />
                    </div>
                    <div class="mb-5">
                        <label for="arrICAO" class="title is-6 has-text-white">Arrival airport ICAO</label>
                        <input name="arrICAO" class="input" v-model="arrICAO" />
                    </div>
                    <div class="mb-5">
                        <label for="depTimeZulu" class="title is-6 has-text-white">Departure time</label>
                        <DatePicker v-model="depTimeZulu" mode="dateTime" color="blue" is-dark>
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
                    <div class="mb-5">
                        <label for="arrTimeZulu" class="title is-6 has-text-white">Arrival time</label>
                        <DatePicker v-model="arrTimeZulu" mode="dateTime" color="blue" is-dark>
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
                    <div class="mb-5">
                        <label for="flightTime" class="title is-6 has-text-white">Flight time</label>
                        <input name="flightTime" class="input" v-model="flightTime" readonly />
                    </div>
                </div>
                <div class="column is-5">
                    <button type="button" class="button is-white is-outlined" v-on:click="createNewEntry">
                        <span class="icon">
                            <i class="fa fa-plane-arrival"></i>
                        </span>
                        <span>Submit new entry</span>
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { DatePicker } from "v-calendar";
import { createNewEntry } from "../mongo-express-script";
import router from "../../router";

export default {
    name: "NewFlight",
    components: {
        DatePicker,
    },
    data() {
        return {
            pilotName: "",
            depICAO: "",
            arrICAO: "",
            depTimeZulu: new Date(),
            arrTimeZulu: new Date(),
            flightTime: 0,
        };
    },
    methods: {
        createNewEntry() {
            const newEntry = {
                pilotName: this.pilotName,
                depICAO: this.depICAO,
                arrICAO: this.arrICAO,
                depTimeZulu: this.depTimeZulu.toISOString(),
                arrTimeZulu: this.arrTimeZulu.toISOString(),
                flightTime: this.flightTime,
            };

            createNewEntry(newEntry);
            router.go(-1);
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
