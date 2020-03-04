import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"]
})
export class WalletComponent implements OnInit {
  quantity = new FormControl("", [
    Validators.required,
    Validators.maxLength(42),
    Validators.pattern("^[0-9]*$")
  ]);

  constructor() {}

  ngOnInit() {
    //quantity = new FormControl()
  }
}
