import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  quantity = new FormControl("", [
    Validators.required,
    Validators.maxLength(42),
    Validators.pattern("^[0-9]*$")
  ]);

  constructor() {}

  ngOnInit() {}
}
