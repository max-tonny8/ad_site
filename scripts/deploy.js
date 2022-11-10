const { ethers } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("ImageApp");
  const contractDeploy = await contractFactory.deploy("Imagegram");

  await contractDeploy.deployed();

  console.log(`Contract Deployed at: ${contractDeploy.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
