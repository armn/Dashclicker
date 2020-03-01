import { Injectable } from "@angular/core";
import { AnalyticsStore } from "./analytics.model";
import { BehaviorSubject } from "rxjs";
import { Order } from "../market/market.model";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {
  constructor() {}

  initialValues = {
    visits: {
      name: "Visits",
      base: 0.01,
      amount: 0
    },
    views: {
      name: "Views",
      base: 0.001,
      amount: 0
    },
    reads: {
      name: "Reads",
      base: 0.0001,
      amount: 0
    },
    shares: {
      name: "Shares",
      base: 0.00001,
      amount: 0
    },
    downloads: {
      name: "Downloads",
      base: 0.0000001,
      amount: 0
    }
  };
  private _analytics = new BehaviorSubject<AnalyticsStore>({
    ...this.initialValues
  });
  readonly analytics$ = this._analytics.asObservable();

  get analytics(): AnalyticsStore {
    return this._analytics.getValue();
  }

  set analytics(val: AnalyticsStore) {
    this._analytics.next(val);
  }

  setInitialValue() {
    this.analytics.visits;
  }

  add(order: Order) {
    this.analytics[order.unit].amount += order.offer;
  }
}
