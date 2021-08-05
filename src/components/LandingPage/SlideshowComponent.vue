<template>
    <ul class="slideshow">
        <li>
            <span></span>
        </li>
        <li>
            <span></span>
        </li>
        <li>
            <span></span>
        </li>
        <li>
            <span></span>
        </li>
        <li>
            <span></span>
        </li>
        <li>
            <span></span>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Slideshow",
};
</script>

<style lang="scss" scoped>
.slideshow,
.slideshow:after {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 0;
}
.slideshow:after {
    content: "";
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
}
.slideshow {
    li {
        span {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            color: transparent;
            background-size: cover;
            background-position: 50% 50%;
            background-repeat: none;
            opacity: 0;
            z-index: 0;
            animation: imageAnimation 36s linear infinite 0s;
        }
    }
}

.slideshow {
    li:nth-child(1) {
        span {
            background-image: url("../../assets/images/unsplash_landing_cover1.jpg");
        }
    }
}
.slideshow {
    li:nth-child(2) {
        span {
            background-image: url("../../assets/images/unsplash_landing_cover2.jpg");
            animation-delay: 6s;
        }
    }
}
.slideshow {
    li:nth-child(3) {
        span {
            background-image: url("../../assets/images/unsplash_landing_cover3.jpg");
            animation-delay: 12s;
        }
    }
}
.slideshow {
    li:nth-child(4) {
        span {
            background-image: url("../../assets/images/unsplash_landing_cover4.jpg");
            animation-delay: 18s;
        }
    }
}
.slideshow {
    li:nth-child(5) {
        span {
            background-image: url("../../assets/images/unsplash_landing_cover5.jpg");
            animation-delay: 24s;
        }
    }
}
.slideshow {
    li:nth-child(6) {
        span {
            background-image: url("../../assets/images/unsplash_landing_cover6.jpg");
            animation-delay: 30s;
        }
    }
}
@keyframes imageAnimation {
    0% {
        opacity: 0;
        animation-timing-function: ease-in;
    }
    8% {
        opacity: 1;
        animation-timing-function: ease-out;
    }
    17% {
        opacity: 1;
    }
    25% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}
</style>
