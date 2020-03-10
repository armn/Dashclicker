import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { FirebaseService } from "src/app/firebase.service";
import { Observable, of } from "rxjs";
import { NbToastrService } from "@nebular/theme";
import { AngularFireAnalytics } from "@angular/fire/analytics";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  user: any;
  constructor(
    private formBuilder: FormBuilder,
    private fb: FirebaseService,
    private ts: NbToastrService,
    private afAnalytics: AngularFireAnalytics
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  login() {
    this.fb.auth
      .signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .then(data => {
        this.afAnalytics.logEvent("user_logged_in");
        this.showToast(
          `Logged in as ${this.loginForm.value.email}`,
          "Login successful",
          "success"
        );
        this.fb.isLoggedIn();
      })
      .catch(err => {
        this.showToast(err.message, "Login failed", "danger");
      });
  }

  loginAnonymously() {
    this.fb.auth
      .signInAnonymously()
      .then(data => {
        this.afAnalytics.logEvent("user_registered_anonymous");

        this.fb.afs
          .doc(`users/${data.user.uid}`)
          .get()
          .toPromise()
          .then(doc => {
            if (doc.exists) {
              this.fb.isLoggedIn();
            } else {
              this.fb.afs.doc(`users/${data.user.uid}`).set({
                name: "Guest " + data.user.uid.slice(0, 5),
                clicks: 0,
                clicksMax: 0,
                visits: 0,
                visitsMax: 0,
                views: 0,
                viewsMax: 0,
                reads: 0,
                readsMax: 0,
                shares: 0,
                sharesMax: 0,
                downloads: 0,
                downloadsMax: 0,
                money: 0,
                moneyMax: 0,
                orders: 0,
                ordersMax: 0,
                projects: 0,
                projectsMax: 0,
                crypto: 0,
                cryptoMax: 0,
                boost_manual: 0,
                boost_analytics: 0,
                registered: new Date().getTime()
              });
              this.fb.isLoggedIn();
            }

            this.showToast(
              `Signed in as Guest ${data.user.uid.slice(0, 5)}`,
              "Sign in successful!",
              "success"
            );
          });
      })
      .catch(err => {
        this.showToast(err.message, "Sign in failed", "danger");
      });
  }

  forgot() {
    this.fb.auth
      .sendPasswordResetEmail(this.loginForm.value.email)
      .then(data => {
        this.showToast(
          `Password reset link has been e-mailed to ${this.loginForm.value.email}`,
          "Check your e-mail",
          "success"
        );
        this.fb.isLoggedIn();
      })
      .catch(err => {
        this.showToast(err.message, "Password reset failed", "danger");
      });
  }

  showToast(title, message, status) {
    this.ts.show(title, message, { status });
  }
}
