<template>
    <div id="slideshow">
        <VCarousel :show-arrows="false" hide-delimiters cycle continuous height="100vh" style="position: fixed; top: 0; left: 0">
            <div id="slideshow--overlay"></div>
            <v-carousel-item
                v-for="(image, i) in images"
                :key="i"
                :src="image.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
                cover
            ></v-carousel-item>
        </VCarousel>
    </div>
</template>

<script>
export default {
    name: "Slideshow",
    setup() {
        const images = [
            {
                src: new URL("../../assets/images/unsplash_landing_cover1.jpg", import.meta.url).href,
            },
            {
                src: new URL("../../assets/images/unsplash_landing_cover2.jpg", import.meta.url).href,
            },
            {
                src: new URL("../../assets/images/unsplash_landing_cover3.jpg", import.meta.url).href,
            },
            {
                src: new URL("../../assets/images/unsplash_landing_cover4.jpg", import.meta.url).href,
            },
            {
                src: new URL("../../assets/images/unsplash_landing_cover5.jpg", import.meta.url).href,
            },
            {
                src: new URL("../../assets/images/unsplash_landing_cover6.jpg", import.meta.url).href,
            },
        ];

        return { images };
    },
};
</script>
