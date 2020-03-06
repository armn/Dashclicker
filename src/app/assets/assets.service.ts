import { Injectable } from "@angular/core";
import { Asset } from "./asset.module";

@Injectable({
  providedIn: "root"
})
export class AssetsService {
  assets: Asset[];

  constructor() {
    this.assets = [];

    this.assets.push(
      new Asset("money", "Money", 0, false, 0, "$")
      // new Asset("Crypto", 0, false, 0, "$")
    );
  }
}
