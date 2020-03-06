import { Injectable } from "@angular/core";
import { Project } from "./project.model";
import { GameService } from "../game.service";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  public projects: Project[];
  public current: Project;
  public modifier: number;
  public moneyModifier: number;

  constructor(public gs: GameService) {
    this.projects = [];
    this.modifier = 0.21;
    this.moneyModifier = 0.42;
  }

  generate() {
    const lastProject =
      this.projects.length > 0 ? this.projects[this.projects.length - 1].id : 0;
    const currentProject = lastProject + 1;
    this.projects.push(
      new Project(
        currentProject,
        Math.ceil(Math.pow(1000000, currentProject * this.modifier) * 10),
        Math.ceil(Math.pow(100000, currentProject * this.modifier) * 10),
        Math.ceil(Math.pow(10000, currentProject * this.modifier) * 10),
        Math.ceil(Math.pow(1000, currentProject * this.modifier) * 10),
        Math.ceil(Math.pow(100, currentProject * this.modifier) * 10),
        Math.ceil(Math.pow(10, currentProject * this.moneyModifier))
      )
    );
  }

  availableProjects() {
    return this.projects.filter(project => project.completed == false);
  }
}