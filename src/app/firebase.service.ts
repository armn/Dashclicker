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

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  public user: any;

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public gs: GameService,
    public as: AnalyticsService
  ) {
    //this.user =
  }

  getUserInformation() {
    if (this.auth.currentUser) {
      this.auth.currentUser.then(user => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      });
    } else {
      return of(null);
    }
  }

  isLoggedIn() {
    this.auth.currentUser.then(user => {
      this.user = this.afs.doc(`users/${user.uid}`).valueChanges();
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

          this.afs.doc(`users/${user.uid}`).update({
            clicks: clicks,
            clicksMax: clicksMax
          });

          this.gs.game.clicks = 0;
          this.as.deposit();
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
