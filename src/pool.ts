import {Wallet, ethers} from "ethers";
import * as dotenv from "dotenv";
import { poolAddr, erc20Addr } from "./const/deployments";
import pool from '../abi/pool.json';
import erc20 from '../abi/erc20.json';

dotenv.config();
let provider;
let signer;
let poolContract;
let tokenContract;
const network = "maticmum";


export async function wlClient(client: string){
    const privateKey = '0x7c3a1bf2a8c167aef41d5907de0da241122a6fff26b0c11625e11ddd8badacbe';
    if (!privateKey) {
        throw new Error('PRIVATE_KEY environment variable is not set.');
    }
    provider = new ethers.providers.AlchemyProvider(network,"6qs-8tojSpa-UilUSQh_fV6B2552oMIC");
    signer = new ethers.Wallet(privateKey, provider);
    poolContract = new ethers.Contract(poolAddr, pool.abi, signer)
    poolContract.connect(signer);
    const wlTx = await poolContract.whitelistClient(client);
    const receipt = await wlTx.wait();
    console.log(receipt.transactionHash);
    return receipt.transactionHash;
}
export async function depositFunds(amount: number){
    const privateKey = '0x7c3a1bf2a8c167aef41d5907de0da241122a6fff26b0c11625e11ddd8badacbe';
    if (!privateKey) {
        throw new Error('PRIVATE_KEY environment variable is not set.');
    }
    provider = new ethers.providers.AlchemyProvider(network,"6qs-8tojSpa-UilUSQh_fV6B2552oMIC");
    signer = new ethers.Wallet(privateKey, provider);
    poolContract = new ethers.Contract(poolAddr, pool.abi, signer);
    tokenContract = new ethers.Contract(erc20Addr, erc20.abi, signer)
    tokenContract.connect(signer);
    await tokenContract.approve(poolContract.address,amount);
    console.log("done")
    poolContract.connect(signer);
    const depositTx = await poolContract.deposit(amount);
    console.log( depositTx);
    const receipt = await depositTx.wait();
    return receipt.transactionHash;
}

export async function withdrawFunds(amount: number, address: string){
    const privateKey = '0x7c3a1bf2a8c167aef41d5907de0da241122a6fff26b0c11625e11ddd8badacbe';
    if (!privateKey) {
        throw new Error('PRIVATE_KEY environment variable is not set.');
    }
    provider = new ethers.providers.AlchemyProvider(network,"6qs-8tojSpa-UilUSQh_fV6B2552oMIC");
    signer = new ethers.Wallet(privateKey, provider);

    poolContract = new ethers.Contract(poolAddr, pool.abi, signer);
    poolContract.connect(signer);
    const withdrawTx = await poolContract.withdraw(amount, address);
    console.log(withdrawTx);
    const receipt = await withdrawTx.wait();
    return receipt.transactionHash;
}


export async function stakeFunds(amount: number, strategy: string){

}
