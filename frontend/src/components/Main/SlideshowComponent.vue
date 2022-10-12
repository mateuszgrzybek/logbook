<template></template>

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
