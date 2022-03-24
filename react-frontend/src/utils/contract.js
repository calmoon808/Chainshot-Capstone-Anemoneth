import { Contract } from '@ethersproject/contracts';
import { ethers } from 'hardhat';
import Dcs from './Dcs.json';

export const contractAddress = '0xDAF4a09A7184Ba13E8e28Ea6a2CEfd8995887451';


export const getContract = (ethereum) => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	var contract = new Contract(contractAddress, Dcs.abi, signer);
	return contract;
};

// export const getContract = (library, account) => {
// 	const signer = library.getSigner(account).connectUnchecked();
// 	var contract = new Contract(contractAddress, Dcs.abi, signer);
// 	return contract;
// };