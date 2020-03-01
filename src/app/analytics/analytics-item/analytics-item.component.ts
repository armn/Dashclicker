import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-analytics-item",
  templateUrl: "./analytics-item.component.html",
  styleUrls: ["./analytics-item.component.scss"]
})
export class AnalyticsItemComponent implements OnInit {
  @Input() measurement: any;

  constructor() {}

  ngOnInit() {}
}
