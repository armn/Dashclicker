import { Component, OnInit, Input } from "@angular/core";
import { AnalyticsStore } from "../analytics.model";
import { AnalyticsService } from "../analytics.service";

@Component({
  selector: "app-analytics-item",
  templateUrl: "./analytics-item.component.html",
  styleUrls: ["./analytics-item.component.scss"]
})
export class AnalyticsItemComponent implements OnInit {
  @Input() measurement: any;
  @Input() analytic: string;

  constructor(public as: AnalyticsService) {}

  ngOnInit() {}

  gain() {
    const costs = {
      visits: this.measurement.cost.visits || 0,
      views: this.measurement.cost.views || 0,
      reads: this.measurement.cost.reads || 0,
      shares: this.measurement.cost.shares || 0,
      downloads: this.measurement.cost.downloads || 0
    };
    this.as.gain(this.analytic, costs);
  }

  buttonChecker() {
    if (this.as.analytics.visits.amount < this.measurement.cost.visits) {
      return true;
    } else if (this.as.analytics.views.amount < this.measurement.cost.views) {
      return true;
    } else if (this.as.analytics.reads.amount < this.measurement.cost.reads) {
      return true;
    } else if (this.as.analytics.shares.amount < this.measurement.cost.shares) {
      return true;
    } else if (
      this.as.analytics.downloads.amount < this.measurement.cost.downloads
    ) {
      return true;
    } else {
      return false;
    }
  }
}
