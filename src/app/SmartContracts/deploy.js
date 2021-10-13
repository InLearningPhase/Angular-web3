// It is used to sign transactions for web3 wallet.
const HDWalletProvider = require("truffle-hdwallet-provider");

// It is used to interact with Ethereum smart contracts
const Web3 = require("web3");

// // Interface and bytecode object from compiled exhibition contract
// const { interface, bytecode } = require("./build/exhibition.json");

const interface = require("./build/demoABI.json")
const bytecode = require("./build/demoBytecode.json")

const address = "0x7919678833C39985b92C6F545aF260C2c2448A0C";

const privateKey = "01bf8352da43f4e9b224c7d9c3e4be9938719b37c6687391040bc5f24fa4ed6e"

// console.log(interface, bytecode)

// // list of 12 words key to connect account. You can get this key when you setup a MetaMask
// var mnemonic =
//   "stove scene lunar grape weekend dance weekend crisp fluid swamp cycle agent";

// // Infur rinkeby API url.
// // Specify ethereum network need to connect to
// var accessToken = "https://rinkeby.infura.io/AJzACQv9DEFVUKsFYFV2";

// // Create a wallet provider to connect outside rinkeby network
// const provider = new HDWalletProvider(mnemonic, accessToken, 1);

// Create a new instance of web3 with wallet provider and ulock the rinkeby account
// const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

// This function is used to deploy contract
const deploy = async () => {

  const provider = new HDWalletProvider(privateKey,"https://ropsten.infura.io/v3/934c43ca25a2481599aa7a9383691fc7")

  const web3 = new Web3(provider);
  // Get list of accounts
  const accounts = await web3.eth.getAccounts();

  const ABI = interface;

  // Create a contract with exhibition ABI, then deply with bytecode
  // and then finally send a transaction to rinkeby network with gas
  // and which account its deploy from
  const result = await new web3.eth.Contract(ABI)
    .deploy({
      data: bytecode
    })
    .send({ from: address, gas: "5000000" });
  // Note this address. It will be used to create contract instance from Angular 5 application.
  console.log("contract deployed to", result.options.address);
};

// Call deploy function.
deploy();