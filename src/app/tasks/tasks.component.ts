import { Component, OnInit } from "@angular/core";
import { GameService } from "../game.service";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { AnalyticsService } from "../analytics/analytics.service";
import { MarketService } from "../market/market.service";
import { AssetsService } from "../assets/assets.service";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
  animations: [
    trigger("inOutAnimation", [
      transition(":leave", [
        style({ opacity: 1 }),
        animate("0.25s cubic-bezier(.76,.3,.83,.67)", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TasksComponent implements OnInit {
  constructor(
    public ts: TasksService,
    public gs: GameService,
    public as: AnalyticsService,
    public ast: AssetsService
  ) {}

  //tasks = this.ts.tasks;

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
    return this.ts.tasks.filter(task => task.completed === false);
  }

  // @TODO - figure out a non-resource intensive way of implementing this
  // ableToComplete() {
  //   let available = 0;
  //   this.tasks.forEach(task => {
  //     if (eval(task.evaluate) == true) {
  //       available += 1;
  //     }
  //   });
  //   return String(available);
  // }

  money() {
    const money = this.ast.assets.find(asset => asset.type == "money");
    return money.amount;
  }

  ngOnInit() {}
}
