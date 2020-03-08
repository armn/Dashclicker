import { Component, OnInit, OnDestroy } from "@angular/core";
import { FirebaseService } from "../firebase.service";
import { Subscription } from "rxjs";
import { GameService } from "../game.service";
@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"]
})
export class WalletComponent implements OnInit, OnDestroy {
  public user: any;
  private subscription: Subscription;
  public reloading: boolean;
  public loading: boolean;

  public boost_manual: boolean;

  constructor(public fb: FirebaseService, private gs: GameService) {}

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
    this.boost_manual = false;
  }

  deposit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.fb.deposit();

    this.boost_manual = false;
    this.gs.applyBoost(0);
  }

  reload() {
    this.reloading = true;
    setTimeout(() => {
      this.reloading = false;
    }, 1000);

    this.fb.deposit(true);
    this.boost_manual = false;
    this.gs.applyBoost(0);
  }

  withdraw() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.fb.withdraw();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleBoost(type: string, amount: number) {
    switch (type) {
      case "boost_manual":
        this.boost_manual = !this.boost_manual;
        if (this.boost_manual) {
          this.gs.applyBoost(amount);
          this.boost_manual = true;
        } else {
          this.gs.applyBoost(0);
        }
    }
  }

  boostEnabled(type: string) {}
}
