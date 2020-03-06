import { Component, OnInit } from "@angular/core";
import { Project } from "./project.model";
import { GameService } from "../game.service";
import { AnalyticsService } from "../analytics/analytics.service";
import { ProjectsService } from "./projects.service";
import { AssetsService } from "../assets/assets.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
  constructor(
    public gs: GameService,
    public as: AnalyticsService,
    public ps: ProjectsService,
    public ast: AssetsService
  ) {}

  projects: Project[];
  current: Project;

  ngOnInit() {
    this.projects = this.ps.projects;
    this.current = this.ps.current;
  }

  progress(type) {
    return Math.floor(
      (this.ps.current[type + "Given"] / this.ps.current[type]) * 100
    );
  }

  complete(project) {
    const money = this.ast.assets.find(asset => asset.name == "Money");
    money.amount += project.money;
    this.as.decrease(
      project.visits,
      project.views,
      project.reads,
      project.shares,
      project.downloads
    );
    project.completed = true;
  }

  canComplete(project) {
    if (
      this.as.analytics.visits.amount >= project.visits &&
      this.as.analytics.views.amount >= project.views &&
      this.as.analytics.reads.amount >= project.reads &&
      this.as.analytics.shares.amount >= project.shares &&
      this.as.analytics.downloads.amount >= project.downloads
    ) {
      return false;
    }

    return true;
  }

  generateProject() {
    this.ps.generate();
  }
}
