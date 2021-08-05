<template>
    <span class="navbar-item">
        <a class="button is-white is-outlined" href="#">
            <span class="icon">
                <i class="fa" :class="iconClass"></i>
            </span>
            <span>{{ btnText }}</span>
        </a>
    </span>
</template>

<script>
export default {
    name: "NavButton",
    props: {
        btnText: String,
        iconClass: String,
    },
};
</script>

<style lang="scss" scoped></style>
