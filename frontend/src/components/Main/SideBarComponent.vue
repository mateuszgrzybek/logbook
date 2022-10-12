<template>
    <VNavigationDrawer expand-on-hover rail>
        <VList v-if="isUserLoggedIn">
            <VListItem
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                :title="`${firstName} ${lastName}`"
                :subtitle="email"
            ></VListItem>
        </VList>
        <VDivider v-if="isUserLoggedIn"></VDivider>
        <VList density="compact" nav>
            <VListItem prepend-icon="" title="Home" value="home" :to="{ name: 'Home' }"></VListItem>
            <template v-if="!isUserLoggedIn">
                <VListItem prepend-icon="" title="Log in" value="login" :to="{ name: 'Login' }"></VListItem>
                <VListItem prepend-icon="" title="Register" value="register" :to="{ name: 'Register' }"></VListItem>
            </template>
            <template v-else>
                <VListItem prepend-icon="" title="Log out" value="log out"></VListItem>
                <VListItem prepend-icon="" title="Flights" value="flights" :to="{ name: 'Flights' }"></VListItem>
                <VListItem prepend-icon="" title="Fleet" value="fleet" :to="{ name: 'Fleet' }"></VListItem>
            </template>
        </VList>
    </VNavigationDrawer>
</template>

<script>
export default {
    name: "SideBar",
    props: {
        isUserLoggedIn: Boolean,
        firstName: String,
        lastName: String,
        email: String,
    },
    components: {},
    setup() {},
};
</script>

<style lang="scss" scoped></style>
