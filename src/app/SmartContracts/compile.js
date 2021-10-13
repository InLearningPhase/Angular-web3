const path = require("path");
const solc = require("solc");
const fileSystem = require("fs-extra");

//Preparing for bin folder
const exportPath = path.resolve(__dirname, "build");
fileSystem.removeSync(exportPath);

//Read the contract from voting path
const votingSource = fileSystem.readFileSync("demo.sol", "utf8");

var input = {
    language: 'Solidity',
    sources: {
        'demo.sol': {
            content: votingSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}

try{
    const output = JSON.parse(solc.compile(JSON.stringify(input)),1);

    for (let contract in output.contracts["demo.sol"]) {
        fileSystem.outputJSONSync(
          path.resolve(exportPath, "demoABI.json"),
          output.contracts["demo.sol"][contract].abi
        );
    
        fileSystem.outputJSONSync(
          path.resolve(exportPath, "demoBytecode.json"),
          output.contracts["demo.sol"][contract].evm.bytecode.object
        );
      }

}catch(error){
    console.log(error)};