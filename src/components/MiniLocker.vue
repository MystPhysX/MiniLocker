<template>
    <div class="minilocker">
        <video autoplay muted loop class="vidBack">
            <source src="../assets/Clip1.mp4" type="video/mp4" />
        </video>
        <b-button v-if="showConnect" @click="connect()">Load Locker</b-button>
        <div class="connected" v-if="!showConnect">
            <b-container>
                <b-row>
                    <b-col sm>
                        <b-card
                            bg-variant="dark"
                            header="Wallet"
                            header-tag="header"
                        >
                            <b-card-text>{{ web3.coinbase }}</b-card-text>
                        </b-card>
                    </b-col>
                    <b-col sm>
                        <b-card
                            bg-variant="dark"
                            header="Balance"
                            header-tag="header"
                        >
                            <b-card-text>{{ web3.balance }} BNB</b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
            <b-container>
                <b-row>
                    <b-col sm>
                        <b-card
                            bg-variant="dark"
                            header="List of Deposits by Token or Withdrawal Address"
                            header-tag="header"
                        >
                            <b-form-input
                                v-model="address"
                                placeholder="Enter the address..."
                            ></b-form-input>
                            <b-form-group v-slot="{ ariaDescribedby }">
                                <b-form-radio-group
                                    id="radio-group-1"
                                    v-model="selected"
                                    :aria-describedby="ariaDescribedby"
                                    name="radio-sub-component"
                                >
                                    <b-form-radio value="Token"
                                        >Token Address</b-form-radio
                                    >
                                    <b-form-radio value="Withdrawal"
                                        >Withdrawal Address</b-form-radio
                                    >
                                </b-form-radio-group>
                            </b-form-group>
                            <b-button @click="connect()">Load</b-button>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm>
                        <b-card
                            bg-variant="dark"
                            header="Search For a Deposit via ID"
                            header-tag="header"
                        >
                            <b-form-input
                                type="number"
                                placeholder="Enter the deposit id..."
                            ></b-form-input>
                            <b-button @click="connect()">Load</b-button>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>
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
</style>
