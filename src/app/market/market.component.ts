import { Component, OnInit } from "@angular/core";
import { MarketService } from "./market.service";
import {
  trigger,
  state,
  style,
  animate,
  transition
  // ...
} from "@angular/animations";
@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
  animations: [
    trigger("inAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("150ms linear", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MarketComponent implements OnInit {
  orders: any;
  constructor(public market: MarketService) {}

  ngOnInit() {}

  generateOrder() {
    this.market.generateOrder();
  }
}
