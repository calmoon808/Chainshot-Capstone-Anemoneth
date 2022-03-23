import { ethers } from 'ethers';
import anemonethJSON from "../../utils/anemoneth.json" //change
const ProxyAddress = "";
const { ethereum } = window;
let provider;
let signer;
let contractInstance;

function contractCall() {

    ethereum.request({ method: 'eth_requestAccounts'});
    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
    contractInstance = new ethers.Contract(ProxyAddress, anemonethJSON.abi, signer);
    return contractInstance;
}

export default contractCall;
