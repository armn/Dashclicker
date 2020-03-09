import { Component, OnInit, OnDestroy } from "@angular/core";
import { FirebaseService } from "../firebase.service";
import { Subscription } from "rxjs";
import { GameService } from "../game.service";
import { AnalyticsService } from "../analytics/analytics.service";
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
  public boost_analytics: boolean;

  constructor(
    public fb: FirebaseService,
    private gs: GameService,
    private as: AnalyticsService
  ) {}

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
    this.boost_analytics = false;
  }

  deposit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.fb.deposit();

    this.boost_manual = false;
    this.boost_analytics = false;
    this.gs.applyBoost(0);
    this.as.applyBoost(0);
  }

  reload() {
    this.reloading = true;
    setTimeout(() => {
      this.reloading = false;
    }, 1000);

    this.fb.deposit(true);
    this.boost_manual = false;
    this.boost_analytics = false;
    this.gs.applyBoost(0);
    this.as.applyBoost(0);
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
        } else {
          this.gs.applyBoost(0);
        }
        break;
      case "boost_analytics":
        this.boost_analytics = !this.boost_analytics;
        if (this.boost_analytics) {
          this.as.applyBoost(amount);
        } else {
          this.as.applyBoost(0);
        }
        break;
    }
  }

  boostEnabled(type: string) {}
}
