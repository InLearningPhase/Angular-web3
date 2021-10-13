import { Injectable } from "@angular/core";
import Web3 from "web3";
declare let window: any;

@Injectable()
export class Web3Service {

  private web3: Web3;
  private interface = require("../SmartContracts/build/demoABI.json")
  private contractDeployedAt = "0x7EAAE7BaC25Aa82cC47355E726efdBff9792EAF3";
  private exhibition = null;
  private accounts: string[];

  constructor() {
    this.createWeb3();
  }

  public async getOrganizer() {
    return await this.exhibition.methods.getOrganizer().call();
  }

  public async transferAmount(amount) {
    return await this.exhibition.methods.transferAmount().send({
      from: this.accounts[0], 
      value: this.web3.utils.toWei(amount, "ether") 
    });
  }

  public async pickWinner() {
    return await this.exhibition.methods.pickWinner().send({
      from: this.accounts[0]
    });
  }

  public async registration(name, address, phone, email, amount) {
    return await this.exhibition.methods.registration(name, phone, email).send({
      from: address,
      value: this.web3.utils.toWei(amount, "ether")
    });
  }

  public async getWinner() {
    return await this.exhibition.methods.getWinner().call();
  }

  public async getParticipants() {
    return await this.exhibition.methods.getParticipants().call();
  }

  public async getIsWinnerSelected() {
    return await this.exhibition.methods.getIsWinnerSelected().call();
  }

  public async getAccounts() {
    return await this.web3.eth.getAccounts();
  }

  // this method is used to create web3 object with MetaMask provider
  // create a exhibition contract instance
  private async createWeb3() {
    // Checking if Web3 has been injected by the browser (MetaMask)
    if (typeof window.web3 !== "undefined") {
      // Use MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);

      //create a exhibition contract instance
      this.exhibition = new this.web3.eth.Contract(
        this.interface, // contract interface
        this.contractDeployedAt // address where contract is deployed
      );

      this.accounts = await this.web3.eth.getAccounts();
      console.log(this.accounts);
    } else {
      console.log("No web3? Please trying with MetaMask!");
    }
  }
}