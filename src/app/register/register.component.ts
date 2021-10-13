import { Component, OnInit } from "@angular/core";
import { Web3Service } from "../services/web3.service";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  showSpinner: boolean = false; 
  accounts: string[];
  constructor(private web3Service: Web3Service, private fb: FormBuilder) {}

  ngOnInit() {
    // get list of accounts of node
    this.web3Service.getAccounts().then(res => {
      this.form.patchValue({
        address: res[0]
      });
    });
    this.createForm();
  }

  // this function is used to create a from group with initial data value
  createForm() {
    this.form = this.fb.group({
      name: "",
      address: "",
      email: "",
      phone: "",
      amount: 0.00002
    });
  }

  // this function is called when submit registration
  onSubmit() {
    this.showSpinner = true;
    this.web3Service
      .registration(
        this.form.value.name,
        this.form.value.address,
        this.form.value.phone,
        this.form.value.email,
        this.form.value.amount.toString()
      )
      .then(res => {
        this.showSpinner = false;
        this.form.reset();
      });
  }
}