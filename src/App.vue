<template>
    <div id="app">
        <img id="logo" src="./assets/logo.png" />
        <div id="nav">
            <router-link to="/">Swapper</router-link> |
            <router-link to="/locker">Mini Locker</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss">
$body-bg: #1e1e1e;
$body-color: white;
$theme-colors: (
    "secondary": #f3ba2f,
);

@import "~@/assets/scss/vendors/bootstrap-vue/index";
@import "../node_modules/bootstrap/scss/bootstrap";

#app {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

#logo {
    height: 10em;
    margin-top: 5em;
}

#nav {
    padding: 2em;
}

#nav a {
    font-weight: bold;
    color: white;
}

#nav a.router-link-exact-active {
    color: #f3ba2f;
}

.card {
    margin-top: 2em;
}
.form-control {
    margin-bottom: 1em;
}

.vidBack {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
}

.card-header {
    color: #f3ba2f;
    font-weight: bold;
}

.btn {
    margin: 1em;
}
</style>
