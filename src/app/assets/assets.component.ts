import { Component, OnInit } from "@angular/core";
import { AssetsService } from "./assets.service";

@Component({
  selector: "app-assets",
  templateUrl: "./assets.component.html",
  styleUrls: ["./assets.component.scss"]
})
export class AssetsComponent implements OnInit {
  public assets;

  constructor(public ast: AssetsService) {}

  ngOnInit() {
    this.assets = this.ast.assets;
  }
}
