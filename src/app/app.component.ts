import { Component } from "@angular/core";
import { GameService } from "./game.service";
import { FirebaseService } from "./firebase.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(public gs: GameService, public fb: FirebaseService) {}
  user: any;
  userMenu = [{ title: "Profile" }, { title: "Log out" }];
  subscription: Subscription;

  ngOnInit() {
    // this.subscription = this.fb.getUserInformation().subscribe(user => {
    //   this.user = user;
    // });
    // console.log(this.user);

    this.user = this.fb.auth.currentUser;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
