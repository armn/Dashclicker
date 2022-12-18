import { Component, OnInit, OnDestroy } from "@angular/core";
// import { FirebaseService } from "../firebase.service";

import { Subscription } from "rxjs";
import { GameService } from "../game.service";
import { AnalyticsService } from "../analytics/analytics.service";
import { LocalService } from "../data.service";
@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
})
export class WalletComponent implements OnInit, OnDestroy {
  public user: any;
  public reloading: boolean;
  public loading: boolean;

  public boost_manual: boolean;
  public boost_analytics: boolean;

  constructor(
    // public fb: FirebaseService,
    public ls: LocalService,
    private gs: GameService,
    private as: AnalyticsService
  ) {}

  ngOnInit() {
    // this.userSubscription = this.fb.auth.user.subscribe((user) => {
    //   if (user) {
    //     this.fb.isLoggedIn();
    //   }
    // });
    if (this.ls.getData("dashclicker")) {
      this.user = JSON.parse(this.ls.getData("dashclicker"));
    } else {
      this.ls.saveData(
        "dashclicker",
        JSON.stringify({
          clicks: 0,
          clicksMax: 0,
          visits: 0,
          visitsMax: 0,
          views: 0,
          viewsMax: 0,
          reads: 0,
          readsMax: 0,
          shares: 0,
          sharesMax: 0,
          downloads: 0,
          downloadsMax: 0,
          money: 0,
          moneyMax: 0,
          crypto: 0,
          cryptoMax: 0,
          boost_manual: 0,
          boost_analytics: 0,
        })
      );

      this.user = JSON.parse(this.ls.getData("dashclicker"));
    }
  }

  wallet() {
    // this.subscription = this.fb.user.subscribe((user) => {
    //   if (user) {
    //     this.user = user;
    //   }
    // });
  }

  logout() {
    // this.fb.logout();
    // this.subscription.unsubscribe();
    // this.userSubscription.unsubscribe();
    // this.user = null;
    this.boost_manual = false;
    this.boost_analytics = false;
  }

  deposit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.ls.deposit();
    // this.fb.deposit();

    this.boost_manual = false;
    this.boost_analytics = false;
    this.gs.applyBoost(0);
    this.as.applyBoost(0);

    this.user = JSON.parse(this.ls.getData("dashclicker"));
  }

  reload() {
    this.reloading = true;
    setTimeout(() => {
      this.reloading = false;
    }, 100);

    // this.fb.deposit(true);
    this.ls.deposit(true);
    this.boost_manual = false;
    this.boost_analytics = false;
    this.gs.applyBoost(0);
    this.as.applyBoost(0);
    this.ls.withdraw();

    this.user = JSON.parse(this.ls.getData("dashclicker"));
  }

  withdraw() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 100);
    this.ls.withdraw();
    // this.fb.withdraw();

    this.user = JSON.parse(this.ls.getData("dashclicker"));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    // this.userSubscription.unsubscribe();
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
