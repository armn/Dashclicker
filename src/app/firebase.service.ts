import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(public auth: AngularFireAuth, public afs: AngularFirestore) {}

  async signup(email, password) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        return this.afs
          .doc(`users/${data.user.uid}`)
          .set({ email: email, display_name: email });
      });
  }

  async getCurrentUserId() {
    await this.auth.currentUser.then(user => {
      return user.uid;
    });
  }

  async getUserInformation() {
    // await this.auth.currentUser.then(user => {
    //   uid = user.uid;
    // });
    return this.afs.doc(`users/${this.getCurrentUserId()}`).valueChanges();
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
