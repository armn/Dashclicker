import { Component, OnInit } from "@angular/core";
import { CompaniesService } from "./companies.service";
import { Company } from "./company.model";
import { AssetsService } from "../assets/assets.service";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.scss"],
})
export class CompaniesComponent implements OnInit {
  public collapsed: boolean = false;
  public companies: Company[];
  private maxShares = 100000000;
  constructor(public cs: CompaniesService, public as: AssetsService) {}

  ngOnInit() {
    this.companies = this.cs.companies;
  }

  buy(company: Company) {
    //company.sharesOwned += 10000;

    const money = this.as.assets.find((asset) => asset.type === "money");

    const sharesToBuy = Math.floor(money.amount / company.sharePrice);
    const maxBuy = this.maxShares - company.sharesOwned;
    let actualBuy;
    if (sharesToBuy >= maxBuy) {
      actualBuy = maxBuy;
    } else if (sharesToBuy < maxBuy) {
      actualBuy = sharesToBuy;
    }

    company.sharesOwned += actualBuy;
    money.amount = money.amount - company.sharePrice * actualBuy;
  }

  claim(company: Company) {
    const money = this.as.assets.find((asset) => asset.type === "money");
    money.amount = money.amount + company.sharePrice * this.maxShares;

    company.owned = true;
    company.periods = this.ownedCompanies.length * this.cs.periods;
  }

  sell(company: Company) {
    const money = this.as.assets.find((asset) => asset.type === "money");
    const sharesToSell = company.sharesOwned * company.sharePrice;
    money.amount = money.amount + sharesToSell;
    company.sharesOwned = 0;
  }

  ownedPercent(company: Company) {
    return Math.round((company.sharesOwned / company.shares) * 100);
  }

  get availableCompanies() {
    return this.companies.filter((x) => x.owned == false);
  }

  get ownedCompanies() {
    return this.companies.filter((x) => x.owned == true);
  }

  forecast(company: Company) {}

  nextPeriod() {
    this.cs.nextPeriod();
  }

  canSell(company: Company) {
    return company.sharesOwned ? false : true;
  }

  canBuy(company: Company) {
    const money = this.as.assets.find((asset) => asset.type === "money");
    if (money.amount >= company.sharePrice) {
      return false;
    } else {
      return true;
    }
  }

  public profit(company: Company) {
    if (company.owned) {
    }
  }

  takeProfits() {}
}
