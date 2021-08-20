<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="aircraftType.aircraftPhoto" alt="Aircraft image" />
            </figure>
            <h1 class="title has-text-white card-icao">{{ aircraftType.aircraftICAO }}</h1>
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
            filter: blur(2px) brightness(0.5);
        }

        .card-icao {
            position: absolute;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
