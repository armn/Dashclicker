import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { FirebaseService } from "../../firebase.service";
import { NbToastrService } from "@nebular/theme";

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
    private ts: NbToastrService
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
        this.fb.afs.doc(`users/${data.user.uid}`).set({
          display_name: this.registerForm.value.email.substring(
            0,
            this.registerForm.value.email.lastIndexOf("@")
          ),
          uid: data.user.uid
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

  guest() {
    this.fb.guest();
  }

  showToast(title, message, status) {
    this.ts.show(title, message, { status });
  }
}
