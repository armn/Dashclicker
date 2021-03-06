import { Injectable } from "@angular/core";
import { AnalyticsStore } from "./analytics.model";
import { BehaviorSubject } from "rxjs";
import { Order } from "../market/market.model";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {
  worker: Worker;
  level: number;
  public boost_analytics: number = 1;
  constructor() {
    this.level = 1;
    this.startWorker();
  }

  startWorker() {
    if (typeof Worker !== "undefined") {
      // Create a new
      this.worker = new Worker("./analytics.worker", {
        name: "analytics",
        type: "module"
      });
      this.worker.onmessage = ({ data }) => {
        if (data.message === "analytics") {
          this.update(data);
        }
      };

      this.workerUpdate();
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  // @TODO: this is a mess, figure out refs/have single constant

  initialValues: AnalyticsStore = {
    visits: {
      name: "Visits",
      base: 0.01,
      amount: 0,
      tick: 0
    },
    views: {
      name: "Views",
      base: 0.001,
      amount: 0,
      tick: 0,
      modifier: 1.1,
      produces: {
        visits: 10,
        views: 1
      },
      cost: {
        visits: 10000,
        views: 1000
      },
      generators: 0
    },
    reads: {
      name: "Reads",
      base: 0.0001,
      amount: 0,
      tick: 0,
      modifier: 1.2,
      produces: {
        visits: 100,
        views: 10,
        reads: 1
      },
      cost: {
        visits: 10000,
        views: 1000,
        reads: 100
      },
      generators: 0
    },
    shares: {
      name: "Shares",
      base: 0.00001,
      amount: 0,
      tick: 0,
      modifier: 1.3,
      produces: {
        visits: 1000,
        views: 100,
        reads: 10,
        shares: 1
      },
      cost: {
        visits: 10000,
        views: 1000,
        reads: 100,
        shares: 10
      },
      generators: 0
    },
    downloads: {
      name: "Downloads",
      base: 0.000001,
      amount: 0,
      tick: 0,
      modifier: 1.4,
      cost: {
        visits: 1000000,
        views: 100000,
        reads: 10000,
        shares: 1000,
        downloads: 1
      },
      produces: {
        visits: 10000,
        views: 1000,
        reads: 100,
        shares: 10,
        downloads: 1
      },
      generators: 0
    }
  };

  analyticsStore: AnalyticsStore = {
    visits: {
      name: "Visits",
      base: 0.01,
      amount: 0,
      tick: 0
    },
    views: {
      name: "Views",
      base: 0.001,
      amount: 0,
      tick: 0,
      modifier: 1.1,
      produces: {
        visits: 10,
        views: 1
      },
      cost: {
        visits: 10000,
        views: 1000
      },
      generators: 0
    },
    reads: {
      name: "Reads",
      base: 0.0001,
      amount: 0,
      tick: 0,
      modifier: 1.2,
      produces: {
        visits: 100,
        views: 10,
        reads: 1
      },
      cost: {
        visits: 10000,
        views: 1000,
        reads: 100
      },
      generators: 0
    },
    shares: {
      name: "Shares",
      base: 0.00001,
      amount: 0,
      tick: 0,
      modifier: 1.3,
      produces: {
        visits: 1000,
        views: 100,
        reads: 10,
        shares: 1
      },
      cost: {
        visits: 10000,
        views: 1000,
        reads: 100,
        shares: 10
      },
      generators: 0
    },
    downloads: {
      name: "Downloads",
      base: 0.000001,
      amount: 0,
      tick: 0,
      modifier: 1.4,
      cost: {
        visits: 1000000,
        views: 100000,
        reads: 10000,
        shares: 1000,
        downloads: 1
      },
      produces: {
        visits: 10000,
        views: 1000,
        reads: 100,
        shares: 10,
        downloads: 1
      },
      generators: 0
    }
  };

  private _analytics = new BehaviorSubject<AnalyticsStore>({
    ...this.analyticsStore
  });
  readonly analytics$ = this._analytics.asObservable();

  get analytics(): AnalyticsStore {
    return this._analytics.getValue();
  }

  set analytics(val: AnalyticsStore) {
    this._analytics.next(val);
  }

  upgradeGenerators(level: number = 1) {
    this.level += 1;
    if (level) {
      this.level = this.level + this.level * (level * level);
    }
    this.analytics.views.cost = {
      visits: 10000,
      views: 1000
    };
    this.analytics.views.produces = {
      visits: 100 * this.level,
      views: 10 * this.level
    };

    this.analytics.reads.produces = {
      visits: 1000 * this.level,
      views: 100 * this.level,
      reads: 10 * this.level
    };
    this.analytics.reads.cost = {
      visits: 10000,
      views: 1000,
      reads: 100
    };

    this.analytics.shares.produces = {
      visits: 10000 * this.level,
      views: 1000 * this.level,
      reads: 100 * this.level,
      shares: 10 * this.level
    };
    this.analytics.shares.cost = {
      visits: 10000,
      views: 1000,
      reads: 100,
      shares: 10
    };

    this.analytics.downloads.cost = {
      visits: 1000000,
      views: 100000,
      reads: 10000,
      shares: 1000,
      downloads: 1
    };
    this.analytics.downloads.produces = {
      visits: 100000 * this.level,
      views: 10000 * this.level,
      reads: 1000 * this.level,
      shares: 100 * this.level,
      downloads: 10 * this.level
    };
    this.workerUpdate();
  }

  workerUpdate() {
    this.worker.postMessage({
      message: "analytics-update",
      data: {
        visits: {
          amount: this.analytics.visits.amount
        },

        views: {
          amount: this.analytics.views.amount,
          produces: this.analytics.views.produces,
          generators: this.analytics.views.generators
        },

        reads: {
          amount: this.analytics.reads.amount,
          produces: this.analytics.reads.produces,
          generators: this.analytics.reads.generators
        },

        shares: {
          amount: this.analytics.shares.amount,
          produces: this.analytics.shares.produces,
          generators: this.analytics.shares.generators
        },

        downloads: {
          amount: this.analytics.downloads.amount,
          produces: this.analytics.downloads.produces,
          generators: this.analytics.downloads.generators
        }
      }
    });
  }

  add(order: Order) {
    this.analytics[order.unit].amount += order.offer;
    this.workerUpdate();
  }

  gain(type: string, costs) {
    this.analytics[type].amount += 1;
    this.analytics[type].generators += 1;

    this.analytics.visits.amount -= costs.visits;
    this.analytics.views.amount -= costs.views;
    this.analytics.reads.amount -= costs.reads;
    this.analytics.shares.amount -= costs.shares;
    this.analytics.downloads.amount -= costs.downloads;

    switch (type) {
      case "views":
        this.analytics.views.cost = {
          visits:
            this.analytics.views.cost.visits *
            Math.pow(
              this.analytics.views.modifier,
              this.analytics.views.generators + 1
            ),
          views:
            this.analytics.views.cost.views *
            Math.pow(
              this.analytics.views.modifier,
              this.analytics.views.generators + 1
            )
        };
        break;
      case "reads":
        this.analytics.reads.cost = {
          visits:
            this.analytics.reads.cost.visits *
            Math.pow(
              this.analytics.reads.modifier,
              this.analytics.reads.generators + 1
            ),
          views:
            this.analytics.reads.cost.views *
            Math.pow(
              this.analytics.reads.modifier,
              this.analytics.reads.generators + 1
            ),
          reads:
            this.analytics.reads.cost.reads *
            Math.pow(
              this.analytics.reads.modifier,
              this.analytics.reads.generators + 1
            )
        };
        break;
      case "shares":
        this.analytics.shares.cost = {
          visits:
            this.analytics.shares.cost.visits *
            Math.pow(
              this.analytics.shares.modifier,
              this.analytics.shares.generators + 1
            ),
          views:
            this.analytics.shares.cost.views *
            Math.pow(
              this.analytics.shares.modifier,
              this.analytics.shares.generators + 1
            ),
          reads:
            this.analytics.shares.cost.reads *
            Math.pow(
              this.analytics.shares.modifier,
              this.analytics.shares.generators + 1
            ),
          shares:
            this.analytics.shares.cost.shares *
            Math.pow(
              this.analytics.shares.modifier,
              this.analytics.shares.generators + 1
            )
        };
        break;
      case "downloads":
        this.analytics.downloads.cost = {
          visits:
            this.analytics.downloads.cost.visits *
            Math.pow(
              this.analytics.downloads.modifier,
              this.analytics.downloads.generators + 1
            ),
          views:
            this.analytics.downloads.cost.views *
            Math.pow(
              this.analytics.downloads.modifier,
              this.analytics.downloads.generators + 1
            ),
          reads:
            this.analytics.downloads.cost.reads *
            Math.pow(
              this.analytics.downloads.modifier,
              this.analytics.downloads.generators + 1
            ),
          shares:
            this.analytics.downloads.cost.shares *
            Math.pow(
              this.analytics.downloads.modifier,
              this.analytics.downloads.generators + 1
            ),
          downloads:
            this.analytics.downloads.cost.downloads *
            Math.pow(
              this.analytics.downloads.modifier,
              this.analytics.downloads.generators + 1
            )
        };
        break;
    }

    this.workerUpdate();
  }

  update(message) {
    this.analytics.visits.tick = message.data.visits * this.boost_analytics;
    this.analytics.views.tick = message.data.views * this.boost_analytics;
    this.analytics.reads.tick = message.data.reads * this.boost_analytics;
    this.analytics.shares.tick = message.data.shares * this.boost_analytics;
    this.analytics.downloads.tick =
      message.data.downloads * this.boost_analytics;

    this.analytics.visits.amount += message.data.visits * this.boost_analytics;
    this.analytics.views.amount += message.data.views * this.boost_analytics;
    this.analytics.reads.amount += message.data.reads * this.boost_analytics;
    this.analytics.shares.amount += message.data.shares * this.boost_analytics;
    this.analytics.downloads.amount +=
      message.data.downloads * this.boost_analytics;
  }

  deposit() {
    this.analytics.visits.amount = 0;
    this.analytics.views.amount = 0;
    this.analytics.reads.amount = 0;
    this.analytics.shares.amount = 0;
    this.analytics.downloads.amount = 0;
  }

  decrease(visits, views, reads, shares, downloads) {
    this.analytics.visits.amount -= visits;
    this.analytics.views.amount -= views;
    this.analytics.reads.amount -= reads;
    this.analytics.shares.amount -= shares;
    this.analytics.downloads.amount -= downloads;
  }

  withdraw(data) {
    this.analytics.visits.amount += data.visits;
    this.analytics.views.amount += data.views;
    this.analytics.reads.amount += data.reads;
    this.analytics.shares.amount += data.shares;
    this.analytics.downloads.amount += data.downloads;
  }
  totalGenerators() {
    return (
      this.analytics.views.generators +
      this.analytics.reads.generators +
      this.analytics.shares.generators +
      this.analytics.downloads.generators
    );
  }

  restart() {
    this.level = 1;
    this.analytics = JSON.parse(JSON.stringify(this.initialValues));
    this.worker.postMessage({
      message: "stop"
    });
    this.workerUpdate();
  }

  applyBoost(amount: number) {
    this.boost_analytics = amount + 1;
  }
}
