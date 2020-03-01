import { Component, OnInit } from "@angular/core";
import { GameService } from "../game.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit {
  constructor(public gs: GameService) {}

  ngOnInit() {}
}
