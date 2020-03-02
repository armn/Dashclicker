import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./analytics.service";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"]
})
export class AnalyticsComponent implements OnInit {
  constructor(public as: AnalyticsService) {}
  analytics: any;
  subscription: any;

  ngOnInit() {
    this.subscription = this.as.analytics$.subscribe(res => {
      this.analytics = res;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
