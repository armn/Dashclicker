import { Injectable } from "@angular/core";
import { AnalyticsService } from "./analytics/analytics.service";
@Injectable({
  providedIn: "root"
})
export class GameService {
  public worker: Worker;

  private initial = {
    clicks: 0,
    value: 1,
    auto: 0,
    multiplier: 1,

    maxClicks: 0,
    priceModifier: 1.01,
    clicksPerSecond: 0,

    counts: {
      value: 0,
      auto: 0,
      multiplier: 0
    },

    modifiers: {
      value: 1.3,
      auto: 1.25,
      multiplier: 1.6
    },

    costs: {
      clicks: 0,
      value: 10,
      auto: 100,
      multiplier: 1000
    }
  };

  public game = {
    clicks: 0,
    value: 1,
    auto: 0,
    multiplier: 1,

    maxClicks: 0,
    priceModifier: 1.01,
    clicksPerSecond: 0,

    counts: {
      value: 0,
      auto: 0,
      multiplier: 0
    },

    modifiers: {
      value: 1.3,
      auto: 1.25,
      multiplier: 1.6
    },

    costs: {
      clicks: 0,
      value: 10,
      auto: 100,
      multiplier: 1000
    }
  };

  public market = {
    orderCount: 0,
    orders: []
  };

  constructor() {
    this.startWorker();
  }

  startWorker() {
    if (typeof Worker !== "undefined") {
      this.worker = new Worker("./game.worker", {
        name: "clicks",
        type: "module"
      });
      this.worker.onmessage = ({ data }) => {
        switch (data.message) {
          case "add":
            this.game.clicksPerSecond = data.clicks;
            this.game.clicks += data.clicks;
            if (this.game.clicks >= this.game.maxClicks) {
              this.game.maxClicks = this.game.clicks;
            }
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
    }
  }

  add(resource: string) {
    this.game.clicks = this.game.clicks - this.game.costs[resource];

    switch (resource) {
      case "clicks":
        this.game.clicks += this.game.value * this.game.multiplier;
        break;
      case "value":
        this.game.value += this.game.value / 5 + this.game.counts.value * 2 + 1;
        this.game.counts.value += 1;
        this.game.costs.value =
          this.game.costs.value *
            this.game.priceModifier *
            Math.pow(this.game.modifiers.value, this.game.counts.value) +
          this.game.costs.value / 10;
        break;
      case "auto":
        this.game.auto += 1;
        this.game.counts.auto += 1;
        this.game.costs.auto =
          this.game.costs.auto *
          this.game.priceModifier *
          Math.pow(this.game.modifiers.auto, this.game.counts.auto);
        break;
      case "multiplier":
        this.game.multiplier = this.game.multiplier * 2;
        this.game.counts.multiplier += 1;
        this.game.costs.multiplier =
          this.game.costs.multiplier *
          this.game.priceModifier *
          Math.pow(this.game.modifiers.multiplier, this.game.counts.multiplier);
        break;
    }

    if (this.game.clicks >= this.game.maxClicks) {
      this.game.maxClicks = this.game.clicks;
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

  remove(amount: number) {
    this.game.clicks = this.game.clicks - amount;
  }

  restart() {
    this.worker.postMessage({
      message: "stop"
    });

    this.game = JSON.parse(JSON.stringify(this.initial));

    this.worker.postMessage({
      message: "start",
      value: this.game.value,
      auto: this.game.auto,
      multiplier: this.game.multiplier
    });
  }
}
