import UserServiceOwnerContract from "../build/contracts/UserServiceOwner.json";
//it will import our data from json 
import contract from "truffle-contract";

 //provider it will give us metamask in page provider
export default async(provider) => {
    //Parameters input are the json from the compilation of our contract
    const UserServiceOwner = contract(UserServiceOwnerContract);
   //It needs a provider which we pass already with the provider parameter in this case Metamask
    UserServiceOwner.setProvider(provider);
    //Once that we have our instance it will be  returned
    let instance = await UserServiceOwner.deployed();

    return instance;
};