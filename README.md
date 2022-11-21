# Blazon <img src="https://user-images.githubusercontent.com/67114280/202886252-41a2faa0-82a7-41b6-9cd5-4b5afc3945be.png" alt="logo" width="35px" height="35px" align="center" />

<img width="1600" alt="credit" src="https://user-images.githubusercontent.com/67114280/202843782-2eddd24a-f536-4fe1-af20-3300ac16d092.png">

### Blazon is Decentralize Image App Built with Next Js, Hardhat, Solidity, Arweave + Bundlr Client and all of the style magic with Tailwind CSS.

### Functionalities

- [x] Upload Image
- [x] Search Images
- [x] Image Details
- [x] Update Image Details
- [x] Download Image

### Stack

- Frontend : [Next Js](https://nextjs.org/)
- Smart Contract Lang : [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
- Indexing :  [The Graph](https://thegraph.com/en/)
- Dev Environment for ETH Software: [Hardhat](https://hardhat.org/)
- Testing: [Chaijs](https://www.chaijs.com/)
- File Storage : [Arweave](https://www.arweave.org/)
- Scaling Permenant Storage - [Bundlr.network](https://bundlr.network/)
- Network : [Polygon](https://polygon.technology/)
- Style : [Tailwind CSS](https://tailwindcss.com/)
- State management : [GraphQL Apollo Client](https://www.apollographql.com/)
- Toast: [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- Fonts - [Google Fonts](https://fonts.google.com/)
- Icons : [Iconsax React](https://iconsax-react.pages.dev/)
- Design : [Figma](https://www.figma.com/)



### Installation

####  Fork The Repo 

Click on the Right Side of the Top Bar to After the Watch button. <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/GitHub_Fork_Button.png" width="120px" />

Now It will be available in GitHub Account.

#### OR

#### Clone

- Clone this repo with url

```shell
git clone https://github.com/Aakrut/blazon
```

##### Setup

> Install npm dependencies using npm install

```shell
cd blazon && npm install
```

> Set up environment Variables I already Provided .env.example file.

> Create a .env file in the root directory.

> Set up required environment variables.

```
URL="POLYGON_TESTNET_URI"
PRIVATE_KEY="METAMASK_PRIVATE_KEY"
NEXT_PUBLIC_RPC_URL="POLYGON_TESTNET_URI"
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
NEXT_PUBLIC_GRAPHQL_URI="GRAPHQL_URL"
```

> In the Root Directory First Compile Your Smart Contract with This Following Command.

```shell
npx hardhat compile
```

> After Deploy Smart Contract to the Polygon Mumbai Testnet with this command.

```shell
npx hardhat run scripts/deploy.js --network mumbai
```

> Copy Smart Contract Address and replace it in with your "CONTRACT_ADDRESS"

```
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
```

## For Setting up Graph Protocol - [The Graph](https://thegraph.com/en/)

now replace the graph url with 
```
NEXT_PUBLIC_GRAPHQL_URI="GRAPHQL_URL"
```

Let's Run this command for dev

```shell
npm run dev
--or--
yarn dev
```

### Screenshots

<img width="1600" alt="blazon" src="https://user-images.githubusercontent.com/67114280/202843755-f1f24f23-440f-44e6-9116-a6a6a575a215.png">

<img width="1600" alt="dashboard" src="https://user-images.githubusercontent.com/67114280/202843762-396fa809-a243-4ceb-982c-00913650755a.png">

<img width="1600" alt="search" src="https://user-images.githubusercontent.com/67114280/202843768-7fb26609-afa1-4588-8db0-7e1535a4d1a9.png">

<img width="1600" alt="upload" src="https://user-images.githubusercontent.com/67114280/202843772-90e47d21-53bc-4f3f-87d1-ba4ff6b3182f.png">

<img width="1600" alt="image" src="https://user-images.githubusercontent.com/67114280/202843771-b19c0304-c12a-48e8-b6dc-84d26e7f60bf.png">

<img width="1600" alt="error" src="https://user-images.githubusercontent.com/67114280/202843763-f0d741e5-38e2-4898-8401-03f6ddbade6c.png">

<img width="1600" alt="responsive" src="https://user-images.githubusercontent.com/67114280/202843765-24f0d811-bda6-4bda-adf3-37cb080ed5a7.png">
