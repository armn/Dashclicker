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
        8
      )
    );
  }

  deposit() {
    this.boosts.forEach(boost => {
      boost.owned = 0;
    });
  }
}
