import { Component, OnInit } from "@angular/core";
import { Boost } from "./boost.model";
import { AssetsService } from "../assets/assets.service";
import { BoostsService } from "./boosts.service";

@Component({
  selector: "app-boosts",
  templateUrl: "./boosts.component.html",
  styleUrls: ["./boosts.component.scss"]
})
export class BoostsComponent implements OnInit {
  boosts: Boost[];

  constructor(public bs: BoostsService, public ast: AssetsService) {}

  ngOnInit() {
    this.boosts = this.bs.boosts;
  }

  buyIcon(boost: Boost) {
    boost.owned += 1;
    const money = this.ast.assets.find(asset => asset.type == "money");
    const crypto = this.ast.assets.find(asset => asset.type == "crypto");

    money.amount -= boost.moneyCost;
    crypto.amount -= boost.cryptoCost;
  }

  canAfford(boost: Boost) {
    if (
      this.ast.money() >= boost.moneyCost &&
      this.ast.crypto() >= boost.cryptoCost
    ) {
      return false;
    }

    return true;
  }
}
