import { Component, OnInit } from "@angular/core";
import { Project } from "./project.model";
import { GameService } from "../game.service";
import { AnalyticsService } from "../analytics/analytics.service";
import { ProjectsService } from "./projects.service";
import { AssetsService } from "../assets/assets.service";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  animations: [
    trigger("inOutAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.15s ease-in", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("0.15s linear", style({ opacity: 0 }))
      ])
    ])
  ]
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

  specialProject(id: number) {
    if (Number.isInteger(id / 5)) {
      return true;
    } else {
      return false;
    }
  }

  complete(project: Project) {
    const money = this.ast.assets.find(asset => asset.name == "Money");
    const crypto = this.ast.assets.find(asset => asset.name == "Crypto");

    money.amount += project.money;
    crypto.amount += project.crypto;

    this.as.decrease(
      project.visits,
      project.views,
      project.reads,
      project.shares,
      project.downloads
    );
    project.completed = true;
    if (Number.isInteger(project.id / 5)) {
      this.as.upgradeGenerators(project.id);
    }
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

  canGenerate() {
    if (this.ps.availableProjects().length >= 6) {
      return true;
    }
    return false;
  }
}
