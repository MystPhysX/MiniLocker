import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import Web3 from 'web3'
import MLjson from "../json/MiniLocker.json";
import oldjson from "../json/OldContract.json";

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true,
    state,
    mutations: {
        registerWeb3Instance(state, payload) {
            console.log('registerWeb3instance Mutation being executed', payload)
            let result = payload
            let web3Copy = state.web3
            web3Copy.coinbase = result.coinbase
            web3Copy.balance = parseInt(result.balance, 10)
            state.web3 = web3Copy
        },
        registerDisplayInstance(state, payload) {
            let result = payload
            let ownerCopy = state.owner
            ownerCopy = result.owner
            state.owner = ownerCopy
        },
        registerSwapperInstance(state, payload) {
            let result = payload
            let balanceTokenOldCopy = state.web3.balanceTokenOld
            balanceTokenOldCopy = result.balanceTokenOld
            state.web3.balanceTokenOld = balanceTokenOldCopy
        }
    },
    actions: {
        async registerWeb3({ commit }) {
            console.log('registerWeb3 Action being executed')
            // Check if MetaMask is installed
            // MetaMask injects the global API into window.ethereum
            if (window.ethereum) {
                //await window.ethereum.enable();
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(window.ethereum);
                try {
                    // check if the chain to connect to is installed
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
                    });
                    let res = {}
                    web3.eth.getCoinbase()
                        .then(result => {
                            res.coinbase = result;
                            web3.eth.getBalance(res.coinbase)
                                .then(result => {
                                    res.balance = result;
                                    commit('registerWeb3Instance', res);
                                })
                        });
                } catch (error) {
                    // This error code indicates that the chain has not been added to MetaMask
                    // if it is not, then install it into the user MetaMask
                    if (error.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                    chainId: '0x38',
                                    chainName: 'Binance Smart Chain',
                                    nativeCurrency: {
                                        name: 'Binance Coin',
                                        symbol: 'BNB',
                                        decimals: 18
                                    },
                                    rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                    blockExplorerUrls: ['https://bscscan.com']
                                }]
                            });
                            let res = {}
                            web3.eth.getCoinbase()
                                .then(result => {
                                    res.coinbase = result;
                                    web3.eth.getBalance(res.coinbase)
                                        .then(result => {
                                            res.balance = result;
                                            commit('registerWeb3Instance', res);
                                        })
                                });
                        } catch (addError) {
                            console.error(addError);
                        }
                    }
                    console.error(error);
                }
            } else {
                // if no window.ethereum then MetaMask is not installed
                alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
            }
        },
        async registerDisplay({ commit }) {
            var web3conn = new Web3(window.ethereum);
            const contractFirst = new web3conn.eth.Contract(
                MLjson.output.abi,
                "0xC101DE032AaCE71049EFC61742d074cEA862d3d8"
            );
            let res = {}
            res.owner = await contractFirst.methods.owner.call().call();
            res.bnbfee = await contractFirst.methods.bnbFee.call().call();
            res.bnbfee = web3conn.utils.fromWei(res.bnbfee);
            //console.log(res)
            commit('registerDisplayInstance', res);
        },
        async registerSwapper({ commit, getters }) {
            var web3conn = new Web3(window.ethereum);
            const contractOld = new web3conn.eth.Contract(
                oldjson,
                "0xBddfE03f24C09505fB2DB5F9dF1589DAB17DdaAe"
            );
            let res = {}
            let address = getters.getCoinBase
            res.balanceTokenOld = await contractOld.methods.balanceOf(address).call();
            res.balanceTokenOld = web3conn.utils.fromWei(res.balanceTokenOld);
            console.log(res)
            commit('registerSwapperInstance', res);
        }
    },
    getters: {
        getCoinBase(state) {
            return state.web3.coinbase
        }
    }
})