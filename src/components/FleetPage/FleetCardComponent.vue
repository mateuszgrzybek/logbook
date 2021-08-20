<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="aircraftType.aircraftPhoto" alt="Aircraft image" />
            </figure>
            <div class="card-aircraft-info">
                <h1 class="title has-text-white card-icao">{{ aircraftType.aircraftICAO }}</h1>
                <h2 class="subtitle has-text-white card-icao">{{ aircraftType.aircraftRegistration }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FleetCard",
    props: {
        aircraftType: Object,
    },
};
</script>

<style lang="scss" scoped>
.card {
    background-color: transparent;

    .card-image {
        img {
            filter: blur(1px) brightness(0.7);
        }

        .card-aircraft-info {
            position: absolute;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
