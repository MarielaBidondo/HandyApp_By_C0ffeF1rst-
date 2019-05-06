import Web3 from 'web3';

//Method that it will allow us to verify if Metamask is installed
const getWeb3 = () => {
    return new Promise( (resolve, reject) => {
        window.addEventListener('load', function() {
            let web3 = window.web3;
         //This it will allow us to use our version of web3 to get compatibility
        //version .1 of web3 allow us to work async await
        //old version only works with call backs
            if(typeof web3 !== undefined) {
                web3 = new Web3(web3.currentProvider);
                 //web3.CP is a metaMask in page provider
                resolve(web3);
            } else {
                //if we don't have installed metamask we let the user know!
                console.error("No provider found, please install Metamask");
                reject();
            }
        });
    });
};
//we need to use this, the has to be exported
export default getWeb3;
