import { Component, OnInit, OnDestroy } from "@angular/core";
import { FirebaseService } from "../firebase.service";
import { Subscription } from "rxjs";
import { GameService } from "../game.service";
import { AnalyticsService } from "../analytics/analytics.service";
import { TasksService } from "../tasks/tasks.service";
import { ProjectsService } from "../projects/projects.service";
import { MarketService } from "../market/market.service";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"]
})
export class WalletComponent implements OnInit, OnDestroy {
  public user: any;
  private subscription: Subscription;
  public reloading: boolean;
  constructor(
    public fb: FirebaseService,
    private gs: GameService,
    private ms: MarketService,
    private as: AnalyticsService,
    private ts: TasksService,
    private ps: ProjectsService
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
  }

  deposit() {
    this.fb.deposit();
  }

  reload() {
    this.reloading = true;
    setTimeout(() => {
      this.reloading = false;
    }, 3000);

    this.fb.deposit(true);
  }

  withdraw() {
    this.fb.withdraw();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
