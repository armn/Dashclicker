import { Injectable } from "@angular/core";
import { Game } from "./game.model";
import { of, Observable, VirtualTimeScheduler } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService {
  public worker: Worker;

  public game = {
    clicks: 0,
    value: 1,
    auto: 0,
    multiplier: 1,

    priceModifier: 1.05,
    clicksPerSecond: 0,

    counts: {
      value: 0,
      auto: 0,
      multiplier: 0
    },

    modifiers: {
      value: 1.25,
      auto: 1.12,
      multiplier: 1.8
    },

    costs: {
      clicks: 0,
      value: 10,
      auto: 100,
      multiplier: 1000
    }
  };

  constructor() {
    this.startWorker();
  }

  startWorker() {
    if (typeof Worker !== "undefined") {
      this.worker = new Worker("./game.worker", { type: "module" });
      this.worker.onmessage = ({ data }) => {
        switch (data.message) {
          case "add":
            this.game.clicksPerSecond = data.clicks;
            this.game.clicks += data.clicks;
            break;
        }
      };
      this.worker.postMessage({
        message: "start",
        value: this.game.value,
        auto: this.game.auto,
        multiplier: this.game.multiplier
      });
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  add(resource: string) {
    this.game.clicks = this.game.clicks - this.game.costs[resource];

    switch (resource) {
      case "clicks":
        this.game.clicks += this.game.value;
        break;
      case "value":
        this.game.value +=
          this.game.modifiers.value + this.game.counts.value * 5;
        this.game.counts.value += 1;
        this.game.costs.value =
          this.game.costs.value *
          Math.pow(this.game.modifiers.value, this.game.counts.value);
        break;
      case "auto":
        this.game.auto += 1;
        this.game.counts.auto += 1;
        this.game.costs.auto =
          this.game.costs.auto *
          Math.pow(this.game.modifiers.auto, this.game.counts.auto);
        break;
      case "multiplier":
        this.game.multiplier = this.game.multiplier * 2;
        this.game.counts.multiplier += 1;
        this.game.costs.multiplier =
          this.game.costs.multiplier *
          Math.pow(this.game.modifiers.multiplier, this.game.counts.multiplier);
        break;
    }

    if (resource !== "clicks") {
      const data = {
        message: "update",
        value: this.game.value,
        auto: this.game.auto,
        multiplier: this.game.multiplier
      };

      this.worker.postMessage({ ...data });
    }
  }
}
