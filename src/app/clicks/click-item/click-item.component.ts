import { Component, OnInit, Input } from "@angular/core";
import { GameService } from "src/app/game.service";

@Component({
  selector: "app-click-item",
  templateUrl: "./click-item.component.html",
  styleUrls: ["./click-item.component.scss"]
})
export class ClickItemComponent implements OnInit {
  @Input() resource: string;
  @Input() cardTitle: string;
  @Input() itemName: string;

  constructor(public gs: GameService) {}

  ngOnInit() {}

  quantity() {
    return this.gs.game[this.resource];
  }

  cost() {
    return this.gs.game.costs[this.resource];
  }

  add() {
    this.gs.add(this.resource);
  }

  canAfford() {
    return this.gs.game.clicks >= this.gs.game.costs[this.resource]
      ? false
      : true;
  }

  next() {
    switch (this.resource) {
      case "value":
        return this.gs.game.value / 5 + this.gs.game.counts.value * 2 + 1;

      case "clicks":
        return (
          this.gs.game.value * this.gs.game.multiplier * this.gs.boost_manual
        );

      case "multiplier":
        return this.gs.game.multiplier;

      default:
        return 1;
    }
  }
}
