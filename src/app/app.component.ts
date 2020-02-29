import { Component } from "@angular/core";
import { GameService } from "./game.service";
import { Game } from "./game.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(public gs: GameService) {}

  ngOnInit() {}
}
