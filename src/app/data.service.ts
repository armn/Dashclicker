import { Injectable } from "@angular/core";
import { AnalyticsService } from "./analytics/analytics.service";
import { AssetsService } from "./assets/assets.service";
import { BoostsService } from "./boosts/boosts.service";
import { GameService } from "./game.service";
import { MarketService } from "./market/market.service";
import { ProjectsService } from "./projects/projects.service";
import { TasksService } from "./tasks/tasks.service";

@Injectable({
  providedIn: "root",
})
export class LocalService {
  constructor(
    private gs: GameService,
    private ms: MarketService,
    private as: AnalyticsService,
    private ts: TasksService,
    private ast: AssetsService,
    private ps: ProjectsService,
    private bs: BoostsService
  ) {}

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public deposit(restart: boolean = false) {
    const current = JSON.parse(this.getData("dashclicker"));

    const clicks = current.clicks + this.gs.game.clicks || 0;

    const visits = current.visits + this.as.analytics.visits.amount || 0;

    const views = current.views + this.as.analytics.views.amount || 0;

    const reads = current.reads + this.as.analytics.reads.amount || 0;

    const shares = current.shares + this.as.analytics.shares.amount || 0;

    const downloads =
      current.downloads + this.as.analytics.downloads.amount || 0;

    const moneyObject = this.ast.assets.find((asset) => asset.type === "money");
    const cryptoObject = this.ast.assets.find(
      (asset) => asset.type === "crypto"
    );
    const money = current.money + moneyObject.amount || 0;

    const crypto = current.crypto + cryptoObject.amount || 0;

    /* Boosts */

    const current_boost_manual = current.boost_manual
      ? current.boost_manual
      : 0;
    const boost_manual =
      current_boost_manual +
      this.bs.boosts.find((boost) => boost.name == "boost_manual").owned;

    const current_boost_analytics = current.boost_analytics
      ? current.boost_analytics
      : 0;
    const boost_analytics =
      current_boost_analytics +
      this.bs.boosts.find((boost) => boost.name == "boost_analytics").owned;

    this.saveData(
      "dashclicker",
      JSON.stringify({
        clicks: clicks,
        visits: visits,
        views: views,
        reads: reads,
        shares: shares,
        downloads: downloads,
        money: money,
        crypto: crypto,
        boost_manual: boost_manual,
        boost_analytics: boost_analytics,
      })
    );

    this.gs.game.clicks = 0;
    this.as.deposit();
    this.bs.deposit();
    moneyObject.amount = 0;
    cryptoObject.amount = 0;

    if (restart) {
      this.gs.restart();
      this.ms.restart();
      this.as.restart();
      this.ts.restart();
      this.ps.restart();
    }
  }

  withdraw() {
    const current = JSON.parse(this.getData("dashclicker"));

    this.gs.game.clicks += current.clicks;
    const analytics = {
      visits: current.visits,
      views: current.views,
      reads: current.reads,
      shares: current.shares,
      downloads: current.downloads,
    };
    const money = this.ast.assets.find((asset) => asset.type == "money");
    const crypto = this.ast.assets.find((asset) => asset.type == "crypto");
    money.amount += current.money;
    crypto.amount += current.crypto;
    this.as.withdraw({ ...analytics });

    this.saveData(
      "dashclicker",
      JSON.stringify({
        clicks: 0,
        visits: 0,
        views: 0,
        reads: 0,
        shares: 0,
        downloads: 0,
        money: 0,
        crypto: 0,
        boost_manual: current.boost_manual,
        boost_analytics: current.boost_analytics,
      })
    );
  }

  //   // createOrder(order) {
  //   //   return this.afs.collection("orders").add({
  //   //     type: order.type,
  //   //     quantity: order.quantity,
  //   //     metric: order.metric,
  //   //     price: order.price,
  //   //     filled: false,
  //   //     creator: this.getCurrentUserId(),
  //   //     date: new Date().getTime()
  //   //   });
  //   // }

  //   getMyOrders() {
  //     return this.afs.collection("orders").valueChanges();
  //     // .pipe(
  //     //   map(actions =>
  //     //     actions.map(a => {
  //     //       const data = a.payload.doc.data();
  //     //       const id = a.payload.doc.id;

  //     //       let user = this.afs.doc(`users/${data["creator"]}`).valueChanges();

  //     //       return { id, ...data, user: user };
  //     //     })
  //     //   )
  //     // );
  //   }

  //   getOrder(id) {
  //     return this.afs.doc(`orders/${id}`).valueChanges();
  //   }

  //   fillOrder(id) {
  //     return this.afs.doc(`orders/${id}`).delete();
  //   }

  // updateOrder(id, order) {
  //   return this.afs.doc(`orders/${id}`).update({
  //     type: order.type,
  //     quantity: order.quantity,
  //     metric: order.metric,
  //     price: order.price,
  //     filled: false,
  //     creator: this.getCurrentUserId(),
  //     date: new Date().getTime()
  //   });
  // }
}
