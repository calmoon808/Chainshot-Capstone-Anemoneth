
import Dcs from '../../utils/Dcs.json';
import { ethers } from 'ethers';

export const contractAddress = '0x1cfA119F77Ecde7B8B9B7a75EE6Ce3C5dB2C49B5';
const { ethereum } = window;
export const getContract = () => {
	let provider = new ethers.providers.Web3Provider(ethereum) 
	let signer = provider.getSigner();
	var contract = new ethers.Contract(contractAddress, Dcs.abi, signer);
	return contract; 
};