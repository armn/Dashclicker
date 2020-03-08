import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { FirebaseService } from "../../firebase.service";
import { NbToastrService } from "@nebular/theme";
import { AngularFireAnalytics } from "@angular/fire/analytics";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fb: FirebaseService,
    private ts: NbToastrService,
    private afAnalytics: AngularFireAnalytics
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  register() {
    this.fb.auth
      .createUserWithEmailAndPassword(
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .then(data => {
        this.afAnalytics.logEvent("user_registered");

        this.fb.afs.doc(`users/${data.user.uid}`).set({
          name: this.registerForm.value.email.substring(
            0,
            this.registerForm.value.email.lastIndexOf("@")
          ),
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
          registered: new Date().getTime()
        });
        this.fb.isLoggedIn();
        this.showToast(
          `Registered as ${this.registerForm.value.email}`,
          "Registration successful!",
          "success"
        );
      })
      .catch(err => {
        this.showToast(err.message, "Registration failed", "danger");
      });
  }

  showToast(title, message, status) {
    this.ts.show(title, message, { status });
  }
}
