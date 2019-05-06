var UserServiceOwner = artifacts.require("./UserServiceOwner.sol");
//we deploy our contract 
module.exports = function(deployer) {
  deployer.deploy(UserServiceOwner);
};
