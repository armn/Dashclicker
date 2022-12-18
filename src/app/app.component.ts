import { Component } from "@angular/core";
import { GameService } from "./game.service";
// import { FirebaseService } from "./firebase.service";
import { Subscription } from "rxjs";
// import { AngularFireAnalytics } from "@angular/fire/analytics";
import { NbDialogService, NbDialogRef } from "@nebular/theme";
import { HelpComponent } from "./help/help.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(
    public gs: GameService,
    // public fb: FirebaseService,
    private dialogService: NbDialogService
  ) {}
  //user: any;
  //userMenu = [{ title: "Profile" }, { title: "Log out" }];
  //subscription: Subscription;

  ngOnInit() {}

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  openHelp() {
    this.dialogService.open(HelpComponent, {});
  }
}
