import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Observable, of, Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  public user: Observable<any>;

  constructor(public auth: AngularFireAuth, public afs: AngularFirestore) {
    //this.user =
  }

  async signup(email, password) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        return this.afs
          .doc(`users/${data.user.uid}`)
          .set({ email: email, display_name: email });
      });
  }

  login(email, password) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        return of(true);
      })
      .catch(err => {
        console.log("Something went wrong:", err.message);
        return of(false);
      });
  }

  async guest() {
    return this.auth.signInAnonymously();
  }

  async getCurrentUserId() {
    await this.auth.currentUser.then(user => {
      return user.uid;
    });
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
  updateUser(name) {
    return this.afs
      .doc(`users/${this.getCurrentUserId()}`)
      .update({ display_name: name });
  }

  createOrder(order) {
    return this.afs.collection("orders").add({
      type: order.type,
      quantity: order.quantity,
      metric: order.metric,
      price: order.price,
      filled: false,
      creator: this.getCurrentUserId(),
      date: new Date().getTime()
    });
  }

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
