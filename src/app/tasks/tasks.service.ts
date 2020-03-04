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
        "Get 10M clicks",
        "true",
        "A gift for playing the development version",
        "this.gs.game.clicks += 10000000",
        false
      ),
      new Task(
        1,
        "Decrease click value, auto clicker and multiplier cost",
        "this.as.analytics.downloads.generators >= 1",
        "Requires 1 downloads generator",
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
        "Requires 100 downloads",
        "this.ms.enableSpecialDeals()",
        false
      ),
      new Task(
        3,
        "Decrease generator costs, increase measurement generation",
        "this.as.analytics.views.generators >= 5 && this.as.analytics.reads.generators >= 5 && this.as.analytics.shares.generators >= 5 && this.as.analytics.downloads.generators >= 5",
        "Requires at least 5 of each generator",
        "this.as.upgradeGenerators(1)",
        false
      ),
      new Task(
        4,
        "Decrease generator costs and increase measurement generation even more",
        "this.as.analytics.views.generators + this.as.analytics.reads.generators + this.as.analytics.shares.generators + this.as.analytics.downloads.generators >= 50",
        "Have a total of at least 50 generators",
        "this.as.upgradeGenerators(2)",
        false
      )
    );
  }

  complete(task: Task) {
    task.completed = true;
    eval(task.reward);
  }
}
