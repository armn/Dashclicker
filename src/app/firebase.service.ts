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

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  public user: any;

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public gs: GameService,
    public as: AnalyticsService,
    public ast: AssetsService
  ) {
    //this.user =
  }

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

  deposit() {
    this.auth.currentUser.then(user => {
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
          const money = current.data().money + moneyObject.amount || 0;
          const moneyMax =
            money > current.data().moneyMax
              ? money
              : current.data().moneyMax || 0;

          this.afs.doc(`users/${user.uid}`).update({
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
            seen: new Date().getTime()
          });

          this.gs.game.clicks = 0;
          this.as.deposit();
          moneyObject.amount = 0;
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
          money.amount += current.data().money;

          this.as.withdraw({ ...analytics });

          this.afs.doc(`users/${user.uid}`).update({
            clicks: 0,
            visits: 0,
            views: 0,
            reads: 0,
            shares: 0,
            downloads: 0,
            money: 0,
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
