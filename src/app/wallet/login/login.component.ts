import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { FirebaseService } from "src/app/firebase.service";
import { Observable, of } from "rxjs";
import { NbToastrService } from "@nebular/theme";

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
    private ts: NbToastrService
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

  guest() {
    this.fb.guest();
  }

  showToast(title, message, status) {
    this.ts.show(title, message, { status });
  }
}
