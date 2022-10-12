<template>
    <span class="navbar-item">
        <router-link class="button is-white is-outlined" :to="{ name: routeName }">
            <span class="icon">
                <i class="fa" :class="iconClass"></i>
            </span>
            <span>{{ btnText }}</span>
        </router-link>
    </span>
</template>

<script>
export default {
    name: "NavButton",
    props: {
        routeName: String,
        btnText: String,
        iconClass: String,
    },
};
</script>

<style lang="scss" scoped></style>
