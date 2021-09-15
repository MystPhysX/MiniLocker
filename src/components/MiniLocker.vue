<template>
    <div class="minilocker">
        <video autoplay muted loop class="vidBack">
            <source src="../assets/Clip1.mp4" type="video/mp4" />
        </video>
        <p>Coming Soon</p>
    </div>
</template>

<script>
export default {
    name: "MiniLocker",
    props: {},
    data() {
        return {
            selected: "Token",
            address: "",
        };
    },
    computed: {
        web3() {
            return this.$store.state.web3;
        },
        showConnect() {
            if (window.ethereum && this.$store.state.web3.coinbase) {
                return false;
            } else {
                return true;
            }
        },
    },
    methods: {
        connect() {
            this.$store.dispatch("registerWeb3");
        },
        fee() {
            this.$store.dispatch("registerDisplay");
        },
    },
    watch: {
        showConnect: function () {
            this.fee();
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
    font-size: 6em;
    font-weight: bold;
    -webkit-text-stroke: 1px black;
    margin-top: 1em;
}
</style>
