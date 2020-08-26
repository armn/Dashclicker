import { Injectable } from "@angular/core";
import { Company } from "./company.model";
import { AssetsService } from "../assets/assets.service";

@Injectable({
  providedIn: "root",
})
export class CompaniesService {
  public companies: Company[];
  public multipliers: number[];
  public periods = 1;

  constructor(public as: AssetsService) {
    this.addCompanies();

    this.multipliers = [
      0.1,
      0.1,
      0.4,
      0.5,
      0.5,
      0.5,
      0.7,
      0.8,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      4,
      4,
      4,
      5,
      5,
      5,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      15,
      15,
      15,
      15,
      15,
      20,
      20,
      20,
      30,
      30,
      50,
      50,
      100,
    ];
  }

  addCompanies() {
    this.companies = [
      new Company(1, "Alert", "#E87826", "alert.svg", 100000000),
      new Company(2, "Array", "#f542bf", "array.svg", 10000000000),
      new Company(3, "Clear", "#5C5B62", "clear.svg", 1000000000000),
      new Company(4, "Const", "#00A200", "const.svg", 100000000000000),
      new Company(5, "JSON", "#BBB8B8", "json.svg", 10000000000000000),
      new Company(6, "Keyup", "#16B4DA", "keyup.svg", 1000000000000000000),
      new Company(
        7,
        "Mounted",
        "#235499",
        "mounted.svg",
        100000000000000000000
      ),
      new Company(
        8,
        "OnClick",
        "#FF494E",
        "onclick.svg",
        10000000000000000000000
      ),
      new Company(
        9,
        "Script",
        "#FBB62B",
        "script.svg",
        100000000000000000000000
      ),
      new Company(
        10,
        "SetTimeout",
        "#1A8BE8",
        "settimeout.svg",
        1000000000000000000000000
      ),
    ];
  }

  nextPeriod() {
    this.periods++;

    this.companies.forEach((company) => {
      company.previousShareCost = company.sharePrice;

      let multiplier = this.multipliers[
        Math.floor(Math.random() * this.multipliers.length)
      ];
      const rand = Math.random();
      const modifier = rand * multiplier;
      const adjuster = company.forecast ? company.forecast : modifier;

      company.sharePrice = company.sharePrice * adjuster;

      if (company.sharePrice <= 0) {
        company.sharePrice = 0.01;
      }

      company.forecast = rand * multiplier;

      if (company.owned) {
        if (!company.liquidated) {
          company.profit =
            (company.sharePrice - company.previousShareCost) *
            Math.random() *
            100000000;
          if (company.profit <= 0) {
            company.profit = 0;
          } else {
            const money = this.as.assets.find(
              (asset) => asset.type === "money"
            );
            money.amount = money.amount + company.profit;
          }
        }
        company.periods = company.periods - 1;
        if (company.periods <= 0) {
          company.liquidated = true;
        }
      }
    });
  }
}
