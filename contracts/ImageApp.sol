// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*
* @author Aakrut
* @title Image App
*/
contract ImageApp {

    // events

    /* 
    * @title UploadImage
    * @dev log upload image
    * @param image id, image, description, published, tags, photographer
    */
    event UploadImage (
        uint256 imageId,
        string image,
        string description,
        string published,
        string tags,
        address photographer
      
    );

     /* 
    * @title UpdateImage
    * @dev log update image
    * @param image id, image, description, published, tags, photographer
    */
     event UpdateImage (
        uint256 imageId,
        string image,
        string description,
        string published,
        string tags ,
        address photographer
    );


    // state vars
    string private name;
    address private owner;

    using Counters for Counters.Counter;
    Counters.Counter private _imageIds;

    // Image Structure
    struct Image {
        uint256 imageId;
        string image;
        string description;
        string published;
        string tags;
        address photographer;
    }

    // 1 -> 1 , 3D Balls, Artist69, 3D render, 2022
    mapping(uint256 => Image) private idToImage;

    constructor(string memory _name) {
        console.log("Image App Name: ",_name);
        owner = msg.sender;
        name = _name;
    }

    /* 
    * @title uploadimage
    * @dev log upload image
    * @param  image, description, published, tags, published date
    */
    function uploadImage(string memory _image, string memory _description, string memory _tags, string memory _published) public {
        require(bytes(_image).length > 0 , "Please Provide Image");
        require(bytes(_description).length > 0,"Please Provide Description");
        require(bytes(_tags).length > 0 , "Please Provide Tags For Image");
        require(bytes(_published).length>0,"Please Provide Published Date for Image");

        _imageIds.increment();

        uint256 currentImageId = _imageIds.current();

        Image storage image = idToImage[currentImageId];
        image.imageId = currentImageId;
        image.image = _image;
        image.description = _description;
        image.published = _published;
        image.tags = _tags;
        image.photographer = msg.sender;
      

         emit UploadImage(currentImageId,_image,_description,_published,_tags,msg.sender);
    }

    /* 
    * @title updateimage
    * @dev log update image
    * @param image id, image, description, published, tags, published date
    */
    function updateImage(uint256 _imageId,string memory _image, string memory _description, string memory _tags, string memory _published) public  onlyOwner(_imageId) {
        require(_imageId > 0,"Sorry this Image Does not Exists");
        require(bytes(_image).length > 0 , "Please Provide Image");
        require(bytes(_description).length > 0,"Please Provide Description");
        require(bytes(_tags).length > 0 , "Please Provide Tags For Image");
        require(bytes(_published).length>0,"Please Provide Published Date for Image");

        Image storage image = idToImage[_imageId];
        image.image = _image;
        image.description = _description;
        image.published = _published;
        image.tags = _tags;
        image.photographer = msg.sender;
      
         emit UpdateImage(_imageId,_image,_description,_published,_tags,msg.sender);
    }

    /* 
    * @title getImage
    * @dev log get image
    * @param image id
    */
    function getImage(uint256 _id) public view returns (Image memory) {
        return idToImage[_id];
    }

    /* 
    * @title getImages
    * @dev log get images
    */
     function getImages() public view returns(Image[] memory) {
        // get the total image from id
        uint256 totalImages = _imageIds.current();

        // create fixed size array
        Image[] memory images = new Image[](totalImages);

        for(uint i=0; i<totalImages; i++) {
            uint currentId = i + 1;
            Image storage currentItem = idToImage[currentId];
            images[i] = currentItem;
        }
        return images;
    }

    /* 
    * @title onlyOwner
    * @dev check for validation if the sender is not the equal to the photographer then reverts
    * @param image id
    */
    modifier onlyOwner(uint256 _id) {
        require(msg.sender == idToImage[_id].photographer, "Please Update Your Own Image Not Others!");
        _;
    }

}