import { Injectable, ɵsetCurrentInjector } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Observable, of, Subscription } from "rxjs";
import { GameService } from "./game.service";
import { AnalyticsService } from "./analytics/analytics.service";
import { AssetsService } from "./assets/assets.service";
import { MarketService } from "./market/market.service";
import { TasksService } from "./tasks/tasks.service";
import { ProjectsService } from "./projects/projects.service";
import { BoostsService } from "./boosts/boosts.service";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  public user: any;

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    private gs: GameService,
    private ms: MarketService,
    private as: AnalyticsService,
    private ts: TasksService,
    private ast: AssetsService,
    private ps: ProjectsService,
    private bs: BoostsService
  ) {}

  logout() {
    this.auth.signOut();
    this.user = null;
  }
  isLoggedIn() {
    this.auth.currentUser.then(user => {
      if (user) {
        this.user = this.afs.doc(`users/${user.uid}`).valueChanges();
      }
    });
  }

  deposit(restart: boolean = false) {
    return this.auth.currentUser.then(user => {
      this.afs
        .doc(`users/${user.uid}`)
        .get()
        .toPromise()
        .then(current => {
          const clicks = current.data().clicks + this.gs.game.clicks || 0;
          const clicksMax =
            clicks > current.data().clicksMax
              ? clicks
              : current.data().clicksMax || 0;
          const visits =
            current.data().visits + this.as.analytics.visits.amount || 0;
          const visitsMax =
            visits > current.data().visitsMax
              ? visits
              : current.data().visitsMax || 0;
          const views =
            current.data().views + this.as.analytics.views.amount || 0;
          const viewsMax =
            views > current.data().viewsMax
              ? views
              : current.data().viewsMax || 0;

          const reads =
            current.data().reads + this.as.analytics.reads.amount || 0;
          const readsMax =
            reads > current.data().readsMax
              ? reads
              : current.data().readsMax || 0;

          const shares =
            current.data().shares + this.as.analytics.shares.amount || 0;
          const sharesMax =
            reads > current.data().sharesMax
              ? shares
              : current.data().sharesMax || 0;

          const downloads =
            current.data().downloads + this.as.analytics.downloads.amount || 0;
          const downloadsMax =
            reads > current.data().downloadsMax
              ? downloads
              : current.data().downloadsMax || 0;

          const moneyObject = this.ast.assets.find(
            asset => asset.type === "money"
          );
          const cryptoObject = this.ast.assets.find(
            asset => asset.type === "crypto"
          );
          const money = current.data().money + moneyObject.amount || 0;
          const moneyMax =
            money > current.data().moneyMax
              ? money
              : current.data().moneyMax || 0;

          const crypto = current.data().crypto + cryptoObject.amount || 0;
          const cryptoMax =
            crypto > current.data().cryptoMax
              ? crypto
              : current.data().cryptoMax || 0;

          /* Boosts */

          const current_boost_manual = current.data().boost_manual
            ? current.data().boost_manual
            : 0;
          const boost_manual =
            current_boost_manual +
            this.bs.boosts.find(boost => boost.name == "boost_manual").owned;

          const current_boost_analytics = current.data().boost_analytics
            ? current.data().boost_analytics
            : 0;
          const boost_analytics =
            current_boost_analytics +
            this.bs.boosts.find(boost => boost.name == "boost_analytics").owned;

          return this.afs
            .doc(`users/${user.uid}`)
            .update({
              clicks: clicks,
              clicksMax: clicksMax,
              visits: visits,
              visitsMax: visitsMax,
              views: views,
              viewsMax: viewsMax,
              reads: reads,
              readsMax: readsMax,
              shares: shares,
              sharesMax: sharesMax,
              downloads: downloads,
              downloadsMax: downloadsMax,
              money: money,
              moneyMax: moneyMax,
              crypto: crypto,
              cryptoMax: cryptoMax,
              boost_manual: boost_manual,
              boost_analytics: boost_analytics,
              seen: new Date().getTime()
            })
            .then(data => {
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
            });
        });
    });
  }

  withdraw() {
    this.auth.currentUser.then(user => {
      this.afs
        .doc(`users/${user.uid}`)
        .get()
        .toPromise()
        .then(current => {
          this.gs.game.clicks += current.data().clicks;
          const analytics = {
            visits: current.data().visits,
            views: current.data().views,
            reads: current.data().reads,
            shares: current.data().shares,
            downloads: current.data().downloads
          };
          const money = this.ast.assets.find(asset => asset.type == "money");
          const crypto = this.ast.assets.find(asset => asset.type == "crypto");
          money.amount += current.data().money;
          crypto.amount += current.data().crypto;
          this.as.withdraw({ ...analytics });

          this.afs.doc(`users/${user.uid}`).update({
            clicks: 0,
            visits: 0,
            views: 0,
            reads: 0,
            shares: 0,
            downloads: 0,
            money: 0,
            crypto: 0,
            seen: new Date().getTime()
          });
        });
    });
  }

  // createOrder(order) {
  //   return this.afs.collection("orders").add({
  //     type: order.type,
  //     quantity: order.quantity,
  //     metric: order.metric,
  //     price: order.price,
  //     filled: false,
  //     creator: this.getCurrentUserId(),
  //     date: new Date().getTime()
  //   });
  // }

  getMyOrders() {
    return this.afs.collection("orders").valueChanges();
    // .pipe(
    //   map(actions =>
    //     actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;

    //       let user = this.afs.doc(`users/${data["creator"]}`).valueChanges();

    //       return { id, ...data, user: user };
    //     })
    //   )
    // );
  }

  getOrder(id) {
    return this.afs.doc(`orders/${id}`).valueChanges();
  }

  fillOrder(id) {
    return this.afs.doc(`orders/${id}`).delete();
  }

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
