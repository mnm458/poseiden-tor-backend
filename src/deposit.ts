import { MerkleTree } from "./utils/merkleTree"
//@ts-ignore
import {buildPoseidon } from "circomlibjs";


export async function deposit (commitment: string, tree: MerkleTree){
    const HEIGHT = 20;
    const poseidon = await buildPoseidon();
    try{
    
         await tree.insert(commitment);
         return tree;
    } catch (error) {
        console.log(error);
        return error;
    }
   
}

