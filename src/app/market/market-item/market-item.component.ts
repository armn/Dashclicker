import { Component, OnInit, Input } from "@angular/core";
import { PeopleService } from "../../data/people.service";
import { MarketService } from "../market.service";
import { GameService } from "../../game.service";
import { Relationship } from "../market.model";
import { first } from "rxjs/operators";
import { AnalyticsService } from "src/app/analytics/analytics.service";
@Component({
  selector: "[app-market-item]",
  templateUrl: "./market-item.component.html",
  styleUrls: ["./market-item.component.scss"]
})
export class MarketItemComponent implements OnInit {
  @Input() order: any;
  buyer: any;
  relationship: Relationship;

  constructor(
    private market: MarketService,
    public people: PeopleService,
    public gs: GameService,
    public as: AnalyticsService
  ) {}

  ngOnInit() {
    this.buyer = this.people.data.find(buyer => buyer.id == this.order.person);
    this.market.relationship$.pipe(first()).subscribe(result => {
      const exists = result.find(entry => entry.id == this.order.person);
      if (exists) {
        this.relationship = exists;
      }
    });
  }

  sell() {
    this.market.fillOrder(this.order.id);
    this.gs.remove(this.order.clicks);
    this.as.add(this.order);
  }

  reject() {
    this.market.rejectOrder(this.order.id);
  }

  hold() {
    this.market.holdOrder(this.order.id);
  }

  relationshipStatus(amount: number = 0) {
    switch (true) {
      case amount < 0.25:
        return "terrible";
        break;

      case amount >= 0.25 && amount < 0.4:
        return "bad";
        break;

      case amount >= 0.4 && amount < 0.6:
        return "average";
        break;

      case amount >= 0.6 && amount < 0.8:
        return "good";
        break;

      case amount >= 0.8:
        return "excellent";
        break;
    }
  }
}
