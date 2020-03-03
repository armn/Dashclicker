import { Injectable } from "@angular/core";
import { Task } from "./task.model";
import { GameService } from "../game.service";
import { MarketService } from "../market/market.service";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  tasks: Task[];
  constructor(public gs: GameService, public ms: MarketService) {
    this.tasks = [];
    this.initialTasks();
  }

  initialTasks() {
    let task = new Task();
    task = {
      id: 0,
      title: "10M clicks to give you a jump start",
      requirements: {
        evaluate: "true",
        description: `A gift for playing the prototype`
      },
      completed: false,
      reward: `this.gs.game.clicks += 10000000`
    };
    this.tasks.push(task);
    task = {
      id: 1,
      title: "Decrease click value, auto clicker and multiplier cost",
      requirements: {
        evaluate: "this.as.analytics.downloads.generators >= 1",
        description: "Requires 1 download generator"
      },
      completed: false,
      reward: `this.gs.game.costs = {
        clicks: 0,
        value: 10,
        auto: 100,
        multiplier: 1000
      }`
    };
    this.tasks.push(task);
    task = {
      id: 2,
      title: "Enable special deals in the market",
      requirements: {
        evaluate: "this.as.analytics.downloads.amount >= 100",
        description: "Requires 100 downloads"
      },
      completed: false,
      reward: `this.ms.enableSpecialDeals()`
    };
    this.tasks.push(task);
    task = {
      id: 3,
      title: "Decrease generator cost, increase generated measurements",
      requirements: {
        evaluate:
          "this.as.analytics.views.generator >= 5 && this.as.analytics.reads.generator >= 5 && this.as.analytics.shares.generator >= 5 && this.as.analytics.downloads.generator >= 5",
        description: "Have at least 5 of each generator"
      },
      completed: false,
      reward: `alert('This is the end of current gameplay, more features coming soon!')`
    };
    this.tasks.push(task);
  }

  complete(task: Task) {
    eval(task.reward);
    task.completed = true;
  }
}
