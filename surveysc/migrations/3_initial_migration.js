const Complain = artifacts.require("Complain");

module.exports = function(deployer) {
  deployer.deploy(Complain);
};
