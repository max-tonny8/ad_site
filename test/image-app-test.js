const { ethers } = require("hardhat");
const expect = require("chai").expect;

describe("Music App", async function() {
    it("Should Upload Photo", async function () {
        const contractFactory = await ethers.getContractFactory("ImageApp");
        const contractDeploy = await contractFactory.deploy("Imagegram");

        await contractDeploy.deployed();

        await contractDeploy.uploadImage(
            "Abstract",
            "3D Rendered Abstract",
            "2022",
            "3D Render",
        );

        let imageId = await contractDeploy.getImage(1);

        expect(imageId[1]).to.equal("Abstract");
    })

    it("Should Update Photo", async function () {
        const contractFactory = await ethers.getContractFactory("ImageApp");
        const contractDeploy = await contractFactory.deploy("Imagegram");

        await contractDeploy.deployed();

         await contractDeploy.uploadImage(
           "Abstract",
           "3D Rendered Abstract",
           "2022",
           "3D Render"
         );

         let imageId = await contractDeploy.getImage(1);

        expect(imageId[1]).to.equal("Abstract");
        
        await contractDeploy.updateImage(
          1,
          "3D Abstract",
          "3D Rendered",
          "2022",
          "3D Render"
        );

        expect(imageId[1]).to.equal("Abstract");
    })
})