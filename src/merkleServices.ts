import { MerkleTree } from "./utils/merkleTree"


export async function deposit (commitment: string, tree: MerkleTree){
    try{
         await tree.insert(commitment);
         return tree;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function withdraw(leafIndex: number, tree: MerkleTree){
    const { root, path_elements, path_index } = await tree.path(
        leafIndex
   );
}
