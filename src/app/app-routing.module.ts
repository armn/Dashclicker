import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: "index.html", component: AppComponent },
  { path: "", redirectTo: "index.html", pathMatch: "full" },
  { path: "**", redirectTo: "index.html", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
