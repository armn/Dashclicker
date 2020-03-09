import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Order, Relationship } from "./market.model";
import { GameService } from "../game.service";
import { AnalyticsService } from "../analytics/analytics.service";
import { first } from "rxjs/operators";
import { PeopleService } from "../data/people.service";

@Injectable({
  providedIn: "root"
})
export class MarketService {
  constructor(
    private gs: GameService,
    private as: AnalyticsService,
    private ps: PeopleService
  ) {}

  specialDeals = true;
  public orderCount: number = 0;
  private _orders = new BehaviorSubject<Order[]>([]);
  private _relationship = new BehaviorSubject<Relationship[]>([]);

  readonly orders$ = this._orders.asObservable();
  readonly relationship$ = this._relationship.asObservable();

  get orders(): Order[] {
    return this._orders.getValue();
  }

  set orders(val: Order[]) {
    this._orders.next(val);
  }

  get relationship(): Relationship[] {
    return this._relationship.getValue();
  }

  set relationship(val: Relationship[]) {
    this._relationship.next(val);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateOrder() {
    this.orderCount += 1;

    if (this.orders.length >= 5) {
      this.orders.shift();
    }

    const randomNumber = this.getRandomInt(1, 100);
    let orderType: string;

    switch (true) {
      case randomNumber <= 50:
        orderType = "visits";
        break;
      case randomNumber > 50 && randomNumber <= 75:
        orderType = "views";
        break;
      case randomNumber > 75 && randomNumber <= 90:
        orderType = "reads";
        break;
      case randomNumber >= 90 && randomNumber < 100:
        orderType = "shares";
        break;
      case randomNumber == 100:
        orderType = "downloads";
        break;
    }

    let specialDealLottery = this.getRandomInt(1, 10);
    let isSpecialDeal = false;
    if (this.specialDeals && specialDealLottery === 7) {
      isSpecialDeal = true;
    }

    //let basePrice;
    // this.as.analytics.pipe(first()).subscribe(result => {
    //   basePrice = result[orderType].base;
    // });

    const basePrice = this.as.analytics[orderType].base * 10;

    const randomPerson = this.getRandomInt(1, 200);

    let buyer = this.ps.data.find(buyer => buyer.id == randomPerson);

    const clickOffer = Math.ceil(
      this.getRandomInt(1, this.gs.game.clicks) * (Math.random() * 5)
    );

    const offer = isSpecialDeal
      ? Math.ceil(basePrice * clickOffer * buyer.random) * 10
      : Math.ceil(basePrice * clickOffer * buyer.random);

    const order = {
      id: this.orderCount,
      person: randomPerson,
      clicks: clickOffer,
      offer: offer,
      unit: orderType,
      special: isSpecialDeal
    };

    this.orders = [...this.orders, { ...order }];
  }

  fillOrder(id: number) {
    const order = this.orders.find(order => order.id === id);
    let relationship = this.relationship.find(
      entry => entry.id == order.person
    );

    if (relationship) {
      relationship.value += 1;
    } else {
      const newRelationship = {
        id: order.person,
        value: 1
      };

      this.relationship.push({ ...newRelationship });
    }

    this.orders = this.orders.filter(entry => entry.id !== order.id);
  }

  rejectOrder(id: number) {
    const order = this.orders.find(order => order.id === id);
    let relationship = this.relationship.find(
      entry => entry.id == order.person
    );

    if (relationship) {
      relationship.value -= 1;
    } else {
      const newRelationship = {
        id: order.person,
        value: -1
      };

      this.relationship.push({ ...newRelationship });
    }

    this.orders = this.orders.filter(entry => entry.id !== order.id);
  }

  // enableSpecialDeals() {
  //   this.specialDeals = true;
  // }

  restart() {
    //this.specialDeals = false;
    this.orderCount = 0;
    this.orders = [];
    //this.relationship = [];
  }
}
