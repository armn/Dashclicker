import { Component, OnInit } from "@angular/core";
import { MarketService } from "./market.service";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from "@angular/animations";
@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
  animations: [
    trigger("inAnimation", [
      transition(":enter", [
        style({ opacity: 0.5 }),
        animate("100ms cubic-bezier(.76,.3,.83,.67)", style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MarketComponent implements OnInit {
  orders: any;
  collapsed: boolean = false;
  constructor(public market: MarketService) {}

  ngOnInit() {
    this.market.generateOrder();
  }

  generateOrder() {
    this.market.generateOrder();
  }

  canGenerateOrder() {
    if (this.market.orders.filter((order) => order.held == true).length >= 5) {
      return true;
    }
    return false;
  }

  collapse() {
    this.collapsed = !this.collapsed;
  }
}
