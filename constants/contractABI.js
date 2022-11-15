export const ContractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "imageId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "published",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tags",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "photographer",
        type: "address",
      },
    ],
    name: "UpdateImage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "imageId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "published",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tags",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "photographer",
        type: "address",
      },
    ],
    name: "UploadImage",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getImage",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "imageId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "published",
            type: "string",
          },
          {
            internalType: "string",
            name: "tags",
            type: "string",
          },
          {
            internalType: "address",
            name: "photographer",
            type: "address",
          },
        ],
        internalType: "struct ImageApp.Image",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getImages",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "imageId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "published",
            type: "string",
          },
          {
            internalType: "string",
            name: "tags",
            type: "string",
          },
          {
            internalType: "address",
            name: "photographer",
            type: "address",
          },
        ],
        internalType: "struct ImageApp.Image[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_imageId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tags",
        type: "string",
      },
      {
        internalType: "string",
        name: "_published",
        type: "string",
      },
    ],
    name: "updateImage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tags",
        type: "string",
      },
      {
        internalType: "string",
        name: "_published",
        type: "string",
      },
    ],
    name: "uploadImage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];