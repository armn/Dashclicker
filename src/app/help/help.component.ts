import { Component, OnInit } from "@angular/core";
import { AngularFireAnalytics } from "@angular/fire/analytics";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "app-help",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.scss"]
})
export class HelpComponent implements OnInit {
  constructor(
    private afAnalytics: AngularFireAnalytics,
    protected dialogRef: NbDialogRef<any>
  ) {}

  ngOnInit() {}

  logClick() {
    this.afAnalytics.logEvent("clicked_kofi");
  }

  close() {
    this.dialogRef.close();
  }
}
