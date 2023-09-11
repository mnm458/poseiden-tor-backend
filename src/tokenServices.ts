import {Wallet, ethers} from "ethers";
import * as dotenv from "dotenv";
import { erc20Addr } from "./const/deployments";
import erc20 from '../abi/erc20.json';

dotenv.config();
let provider;
let signer;
let tokenContract;
const network = "maticmum";

export async function getZetlBalance(){
    const privateKey = '0x7c3a1bf2a8c167aef41d5907de0da241122a6fff26b0c11625e11ddd8badacbe';
    if (!privateKey) {
        throw new Error('PRIVATE_KEY environment variable is not set.');
    }
    provider = new ethers.providers.AlchemyProvider(network,"6qs-8tojSpa-UilUSQh_fV6B2552oMIC");
    signer = new ethers.Wallet(privateKey, provider);

    tokenContract = new ethers.Contract(erc20Addr, erc20.abi, signer)
    tokenContract.connect(signer);
    const balance = (await tokenContract.balanceOf("0x14299C00861767244D552B206dd9217EafA0196b")).toString();
    return balance;
}


export async function getPoolBalance(){
    const privateKey = '0x7c3a1bf2a8c167aef41d5907de0da241122a6fff26b0c11625e11ddd8badacbe';
    if (!privateKey) {
        throw new Error('PRIVATE_KEY environment variable is not set.');
    }
    provider = new ethers.providers.AlchemyProvider(network,"6qs-8tojSpa-UilUSQh_fV6B2552oMIC");
    signer = new ethers.Wallet(privateKey, provider);

    tokenContract = new ethers.Contract(erc20Addr, erc20.abi, signer)
    tokenContract.connect(signer);
    const balance = (await tokenContract.balanceOf("0xB7360BFDc08454C7ce325E486d076611a15eE048")).toString();
    return balance;
}