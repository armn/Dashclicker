import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbActionsModule,
  NbButtonModule,
  NbUserModule,
  NbListModule,
  NbToggleModule,
  NbPopoverModule,
  NbTooltipModule,
  NbCheckboxModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbInputModule,
  NbSelectModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { ClicksComponent } from "./clicks/clicks.component";
import { ClickItemComponent } from "./clicks/click-item/click-item.component";
import { NumbersPipe } from "./numbers.pipe";
import { MarketComponent } from "./market/market.component";
import { MarketItemComponent } from "./market/market-item/market-item.component";
import { TasksComponent } from "./tasks/tasks.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { AnalyticsItemComponent } from "./analytics/analytics-item/analytics-item.component";
import { WalletComponent } from "./wallet/wallet.component";
import { TradingComponent } from "./trading/trading.component";
import { ProjectsComponent } from "./projects/projects.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrdersComponent } from "./orders/orders.component";

import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    ClicksComponent,
    ClickItemComponent,
    NumbersPipe,
    MarketComponent,
    MarketItemComponent,
    TasksComponent,
    AnalyticsComponent,
    AnalyticsItemComponent,
    WalletComponent,
    TradingComponent,
    ProjectsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "dashclicker" }),
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbUserModule,
    NbEvaIconsModule,
    NbListModule,
    NbToggleModule,
    NbPopoverModule,
    NbTooltipModule,
    NbCheckboxModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbInputModule,
    NbSelectModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
