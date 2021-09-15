<template>
    <div class="swapper">
        <video autoplay muted loop class="vidBack">
            <source src="../assets/Clip3.mp4" type="video/mp4" />
        </video>
        <b-button v-if="showConnect" @click="connect()"
            >Connect Wallet</b-button
        >
        <div class="connected" v-if="!showConnect">
            <b-container>
                <b-row align-h="center">
                    <b-col sm="6">
                        <b-card
                            bg-variant="dark"
                            header="Swap Tokens"
                            header-tag="header"
                        >
                            <b-card-text
                                >Balance:
                                {{ web3.balanceTokenOld }} MINIBNB</b-card-text
                            >
                            <b-form-input
                                v-model="amount"
                                placeholder="Amount..."
                                type="number"
                            ></b-form-input>
                            <b-alert :show="error" variant="danger">{{
                                errorMsg
                            }}</b-alert>
                            <b-alert :show="success" variant="success">{{
                                successMsg
                            }}</b-alert>
                            <b-button
                                :disabled="approval"
                                @click="approve()"
                                v-html="approveBTN"
                            ></b-button>
                            <b-button v-if="approval" @click="send()" v-html="sendBTN"
                                ></b-button
                            >
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import Web3 from "web3";
import oldjson from "../json/OldContract.json";
import swapjson from "../json/SwapContract.json";

export default {
    name: "Swapper",
    props: {},
    data() {
        return {
            amount: 0,
            approval: false,
            approveBTN: "Approve",
            error: false,
            errorMsg: "",
            sendBTN: "Send",
            success: false,
            successMsg: ""
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
        approve() {
            this.error = false;
            this.success = false;
            if (this.amount <= 0) {
                this.error = true;
                this.errorMsg = "Amount has to be greater than 0";
                return;
            }
            this.approveBTN =
                '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
            var web3conn = new Web3(window.ethereum);
            const contractOld = new web3conn.eth.Contract(
                oldjson,
                "0xBddfE03f24C09505fB2DB5F9dF1589DAB17DdaAe"
            );
            let vm = this;
            contractOld.methods
                .approve(this.web3.coinbase, this.amount)
                .send({ from: this.web3.coinbase })
                .on("confirmation", function () {
                    vm.approval = true;
                    vm.approveBTN = "Approved";
                })
                .on("error", function (error) {
                    vm.error = true;
                    vm.errorMsg = error.message;
                    vm.approveBTN = "Approve";
                });
        },
        send() {
            this.error = false;
            this.success = false;
            if (this.amount <= 0) {
                this.error = true;
                this.errorMsg = "Amount has to be greater than 0";
                return;
            }
            this.sendBTN =
                '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
            var web3conn = new Web3(window.ethereum);
            const contractSwap = new web3conn.eth.Contract(
                swapjson,
                "0xccFcf91241FD00279D5F17B3121fF17E33b7a76c"
            );
            let amountWei = web3conn.utils.toWei(this.amount);
            let vm = this;
            contractSwap.methods
                .minibnbswap(amountWei)
                .send({ from: this.web3.coinbase })
                .on("confirmation", function (receipt) {
                    vm.success = true;
                    vm.successMsg = vm.amount + " MINIBNB successfully sent. Tx is " + receipt.transactionHash
                    vm.successBTN = "Send";
                })
                .on("error", function (error) {
                    vm.error = true;
                    vm.errorMsg = error.message;
                    vm.successBTN = "Send";
                });
        },
        balance() {
            this.$store.dispatch("registerSwapper");
        },
    },
    watch: {
        showConnect: function () {
            this.balance();
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
