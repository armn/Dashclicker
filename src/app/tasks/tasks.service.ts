import { Injectable } from "@angular/core";
import { Task } from "./task.model";
import { GameService } from "../game.service";
import { MarketService } from "../market/market.service";
import { AnalyticsService } from "../analytics/analytics.service";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  tasks: Task[];
  constructor(
    public gs: GameService,
    public ms: MarketService,
    public as: AnalyticsService
  ) {
    this.tasks = [];
    this.addTasks();
  }

  addTasks() {
    this.tasks.push(
      new Task(
        0,
        "Receive a gift of 1K clicks",
        "true",
        "",
        "this.gs.game.clicks += 1000",
        false
      ),
      new Task(
        1,
        "Decrease click value, auto clicker and multiplier cost",
        "this.as.analytics.downloads.generators >= 1",
        "Have at least 1 downloads Generator",
        `this.gs.game.costs = {
              clicks: 0,
              value: 10,
              auto: 100,
              multiplier: 1000
            }`,
        false
      ),
      new Task(
        2,
        "Enable special deals in the market",
        "this.as.analytics.downloads.amount >= 100",
        "Have at least 100 downloads",
        "this.ms.enableSpecialDeals()",
        false
      ),
      new Task(
        3,
        "Decrease generator costs, increase Measurement generation",
        "this.as.analytics.views.generators >= 5 && this.as.analytics.reads.generators >= 5 && this.as.analytics.shares.generators >= 5 && this.as.analytics.downloads.generators >= 5",
        "Have at least 5 of each Generator",
        "this.as.upgradeGenerators(1)",
        false
      ),
      new Task(
        4,
        "Decrease generator costs and increase Measurement generation even more",
        "this.as.analytics.views.generators + this.as.analytics.reads.generators + this.as.analytics.shares.generators + this.as.analytics.downloads.generators >= 50",
        "Have a total of 50 Generators",
        "this.as.upgradeGenerators(2)",
        false
      ),
      new Task(
        5,
        "Decrease click value, auto clicker and multiplier cost again",
        "this.gs.game.counts.auto >= 20",
        "Have 20 Auto clickers",
        `this.gs.game.costs = {
          clicks: 0,
          value: 10,
          auto: 100,
          multiplier: 1000
        }`,
        false
      )
    );
  }

  complete(task: Task) {
    task.completed = true;
    eval(task.reward);
  }
}
