import { Component, OnInit } from "@angular/core";

import { Web3Service } from "../services/web3.service";

@Component({
  selector: "app-organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.css"]
})
export class OrganizerComponent implements OnInit {
  showSpinner: boolean = false;
  participants: string[] = [];
  showWinner: boolean = false;
  winner: string = "";
  prizeAmount: number = 0.0002;
  constructor(private web3Service: Web3Service) {}

  ngOnInit() {

    // this method get all the participants of exhibition contract
    this.web3Service.getParticipants().then(res => {
      this.participants = res;
    });

    // this method get IsWinnerSelected status
    this.web3Service.getIsWinnerSelected().then(res => {
      this.showWinner = res;
      if (this.showWinner) {
        this.getWinner();
      }
    });
  }

  pickWinner() {
    this.showSpinner = true;
    this.web3Service.pickWinner().then(res => {
      this.showSpinner = false;
      this.showWinner = true;
      this.getWinner();
    });
  }

  // this function is used to get winner name
  getWinner() {
    this.web3Service.getWinner().then(res => {
      this.winner = res;
    });
  }

  transferAmount() {
    this.showSpinner = true;
    this.web3Service.transferAmount(this.prizeAmount.toString()).then(res => {
      this.showSpinner = false;
    });
  }
}