import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbActionsModule,
  NbButtonModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { AppRoutingModule } from "./app-routing.module";
import { ClicksComponent } from "./clicks/clicks.component";
import { ClickItemComponent } from "./clicks/click-item/click-item.component";
import { NumbersPipe } from "./numbers.pipe";

@NgModule({
  declarations: [
    AppComponent,
    ClicksComponent,
    ClickItemComponent,
    NumbersPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "dashclicker" }),
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbEvaIconsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
