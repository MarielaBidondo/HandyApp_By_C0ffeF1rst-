var Migrations = artifacts.require("./Migrations.sol");
//First deployment
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
