import { Component, OnInit, Input } from "@angular/core";
import { GameService } from "src/app/game.service";

@Component({
  selector: "app-click-item",
  templateUrl: "./click-item.component.html",
  styleUrls: ["./click-item.component.scss"]
})
export class ClickItemComponent implements OnInit {
  @Input() type: string;
  @Input() cardTitle: string;
  @Input() itemName: string;
  @Input() buttonName: string;

  // title: string;
  // name: string;

  constructor(public gs: GameService) {}

  ngOnInit() {}

  quantity(resource: string) {
    return this.gs.game[resource];
  }

  cost(resource: string) {
    return this.gs.game.costs[resource];
  }

  add(item: string) {
    this.gs.add(item);
  }

  canAfford(resource: string) {
    return this.gs.game.clicks >= this.gs.game.costs[resource] ? false : true;
  }

  next(resource: string) {
    switch (resource) {
      case "value":
        return this.gs.game.modifiers.value + this.gs.game.counts.value * 5;

      case "clicks":
        return this.gs.game.value;

      case "multiplier":
        return this.gs.game.multiplier;

      default:
        return 1;
    }
  }
}
