import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../firebase.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"]
})
export class WalletComponent implements OnInit {
  public user: any;
  private subscription: Subscription;
  constructor(public fb: FirebaseService) {}

  ngOnInit() {}

  wallet() {
    this.subscription = this.fb.user.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(user);
      }
    });
  }

  ngOnDestry() {
    this.subscription.unsubscribe();
  }
}
