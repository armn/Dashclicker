import { Injectable } from "@angular/core";
import { Asset } from "./asset.module";
import { AssetsComponent } from "./assets.component";

@Injectable({
  providedIn: "root"
})
export class AssetsService {
  assets: Asset[];

  constructor() {
    this.assets = [];

    this.assets.push(
      new Asset("money", "Money", 0, false, 0, "$"),
      new Asset("crypto", "Crypto", 0, false, 0, "⛓")
      //new Asset("synergy", "Synergy", 0, false, 0, "⚭")
    );
  }

  money() {
    return this.assets.find(asset => asset.type === "money").amount;
  }

  crypto() {
    return this.assets.find(asset => asset.type === "crypto").amount;
  }
}
