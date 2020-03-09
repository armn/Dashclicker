import { Injectable } from "@angular/core";
import { Boost } from "./boost.model";

@Injectable({
  providedIn: "root"
})
export class BoostsService {
  public boosts: Boost[];
  constructor() {
    this.boosts = [];

    this.loadBoosts();
  }

  loadBoosts() {
    this.boosts.push(
      new Boost(
        "boost_manual",
        "person-add",
        "Increase manual click value",
        16000,
        6
      ),
      new Boost(
        "boost_analytics",
        "bar-chart-2",
        "Increase analytics generation",
        100000000,
        10
      )
    );
  }

  deposit() {
    this.boosts.forEach(boost => {
      boost.owned = 0;
    });
  }
}
