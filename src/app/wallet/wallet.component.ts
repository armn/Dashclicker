import { Component, OnInit, OnDestroy } from "@angular/core";
import { FirebaseService } from "../firebase.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"]
})
export class WalletComponent implements OnInit, OnDestroy {
  public user: any;
  private subscription: Subscription;
  constructor(public fb: FirebaseService) {}

  ngOnInit() {}

  wallet() {
    this.subscription = this.fb.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  logout() {
    this.fb.logout();
    this.subscription.unsubscribe();
    this.user = null;
  }

  deposit() {
    this.fb.deposit();
  }

  withdraw() {
    this.fb.withdraw();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
