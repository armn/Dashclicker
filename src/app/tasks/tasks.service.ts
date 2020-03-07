import { Injectable } from "@angular/core";
import { Task } from "./task.model";
import { GameService } from "../game.service";
import { MarketService } from "../market/market.service";
import { AnalyticsService } from "../analytics/analytics.service";
import { ProjectsService } from "../projects/projects.service";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  tasks: Task[];
  constructor(
    public gs: GameService,
    public ms: MarketService,
    public as: AnalyticsService,
    public ps: ProjectsService
  ) {
    this.tasks = [];
    this.addTasks();
  }

  addTasks() {
    this.tasks.push(
      new Task(
        1,
        "Enable special deals in the market",
        "this.as.analytics.downloads.generators >= 1",
        "Have 1 downloads generator",
        "this.ms.enableSpecialDeals()",
        false
      ),
      new Task(
        2,
        "Reset click value, auto clicker and multiplier costs",
        "this.as.analytics.downloads.amount >= 100",
        "Have 100 downloads",
        `this.gs.game.costs = {
              clicks: 0,
              value: 10,
              auto: 100,
              multiplier: 1000
            }`,
        false
      ),
      new Task(
        3,
        "Reset click value, auto clicker and multiplier costs #2",
        "this.gs.game.counts.auto >= 20",
        "Have 20 auto clickers",
        `this.gs.game.costs = {
          clicks: 0,
          value: 10,
          auto: 100,
          multiplier: 1000
        }`,
        false
      ),
      new Task(
        4,
        "Reset click value, auto clicker and multiplier costs #3",
        "this.gs.game.counts.auto >= 30",
        "Have 30 auto clickers",
        `this.gs.game.costs = {
          clicks: 0,
          value: 10,
          auto: 100,
          multiplier: 1000
        }`,
        false
      ),
      new Task(
        5,
        "Reset click value, auto clicker and multiplier costs #4",
        "this.gs.game.counts.auto >= 40",
        "Have 40 auto clickers",
        `this.gs.game.costs = {
          clicks: 0,
          value: 10,
          auto: 100,
          multiplier: 1000
        }`,
        false
      ),
      new Task(
        6,
        "Reset click value, auto clicker and multiplier costs #5",
        "this.money() >= 5000",
        "Have $ 5K money",
        `this.gs.game.costs = {
          clicks: 0,
          value: 10,
          auto: 100,
          multiplier: 1000
        }`,
        false
      ),
      new Task(
        7,
        "Reset click value, auto clicker and multiplier costs #6",
        "this.gs.game.counts.auto >= 50",
        "Have 50 auto clickers",
        `this.gs.game.costs = {
          clicks: 0,
          value: 10,
          auto: 100,
          multiplier: 1000
        }`,
        false
      ),
      new Task(
        8,
        "Reset generator costs and increase measurement generation",
        "this.as.analytics.views.generators >= 5 && this.as.analytics.reads.generators >= 5 && this.as.analytics.shares.generators >= 5 && this.as.analytics.downloads.generators >= 5",
        "Have 5 of each generator",
        "this.as.upgradeGenerators()",
        false
      ),
      new Task(
        9,
        "Reset generator costs and increase measurement generation #2",
        "this.as.analytics.views.generators + this.as.analytics.reads.generators + this.as.analytics.shares.generators + this.as.analytics.downloads.generators >= 50",
        "Have 50 generators",
        "this.as.upgradeGenerators()",
        false
      ),

      new Task(
        10,
        "Reset generator costs and increase measurement generation #3",
        "this.as.analytics.downloads.generators >= 10",
        "Have 10 downloads generators",
        "this.as.upgradeGenerators()",
        false
      ),

      new Task(
        11,
        "Reset generator costs and increase measurement generation #4",
        "this.money() >= 50000",
        "Have 50K money",
        "this.as.upgradeGenerators()",
        false
      ),

      new Task(
        12,
        "Reset generator costs and increase measurement generation #5",
        "this.as.analytics.views.generators + this.as.analytics.reads.generators + this.as.analytics.shares.generators + this.as.analytics.downloads.generators >= 100",
        "Have 100 generators",
        "this.as.upgradeGenerators()",
        false
      ),
      new Task(
        13,
        "Reset generator costs and increase measurement generation #6",
        "this.as.analytics.views.generators + this.as.analytics.reads.generators + this.as.analytics.shares.generators + this.as.analytics.downloads.generators >= 150",
        "Have 150 generators",
        "this.as.upgradeGenerators()",
        false
      ),
      new Task(
        14,
        "Reduce current project costs & reset click value, auto clicker and multiplier costs",
        "this.as.analytics.views.generators + this.as.analytics.reads.generators + this.as.analytics.shares.generators + this.as.analytics.downloads.generators >= 200",
        "Have 200 generators",
        `this.ps.reduceCosts(); 
        this.gs.game.costs = {
          clicks: 0,
          value: 10,
          auto: 100,
          multiplier: 1000
        }`,
        false
      ),
      new Task(
        15,
        "Reduce current project costs & reset click value, auto clicker and multiplier costs #2",
        "this.as.analytics.views.generators + this.as.analytics.reads.generators + this.as.analytics.shares.generators + this.as.analytics.downloads.generators >= 250",
        "Have 250 generators",
        `this.ps.reduceCosts(); 
        this.gs.game.costs = {
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
