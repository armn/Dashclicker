import { Component, OnInit } from "@angular/core";
import { GameService } from "../game.service";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { AnalyticsService } from "../analytics/analytics.service";
import { MarketService } from "../market/market.service";
import { AssetsService } from "../assets/assets.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit {
  constructor(
    public ts: TasksService,
    public gs: GameService,
    public as: AnalyticsService,
    public ast: AssetsService
  ) {}

  tasks = this.ts.tasks;

  toggle() {
    //this.checked = checked;
  }

  complete(task: Task) {
    this.ts.complete(task);
  }

  available(task: Task) {
    if (eval(task.evaluate)) {
      return false;
    } else {
      return true;
    }
  }

  availableTasks() {
    return this.tasks.filter(task => task.completed === false);
  }

  money() {
    const money = this.ast.assets.find(asset => asset.type == "money");
    return money.amount;
  }

  ngOnInit() {}
}
