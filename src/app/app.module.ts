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
  NbSelectModule,
  NbDialogModule,
  NbToastrModule,
  NbContextMenuModule,
  NbMenuModule,
  NbIconModule,
  NbBadgeModule,
  NbDialogRef,
  NbDialogConfig,
  NbAlertModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { AppRoutingModule } from "./app-routing.module";

// import { AngularFireModule } from "@angular/fire";
// import { AngularFirestoreModule } from "@angular/fire/firestore";
// import { AngularFireAuthModule } from "@angular/fire/auth";
// import { AngularFireAnalyticsModule } from "@angular/fire/analytics";
// import * as firebase from "firebase";
// import "firebase/firestore";

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

// import { environment } from "../environments/environment";
// import { LoginComponent } from "./wallet/login/login.component";
// import { RegisterComponent } from "./wallet/register/register.component";
import { AssetsComponent } from "./assets/assets.component";
import { BoostsComponent } from "./boosts/boosts.component";
import { HelpComponent } from "./help/help.component";
// import { CompaniesComponent } from "./companies/companies.component";

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
    OrdersComponent,
    AssetsComponent,
    BoostsComponent,
    HelpComponent,
    // CompaniesComponent,
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
    NbDialogModule.forChild(),
    NbToastrModule.forRoot(),
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbBadgeModule,
    NbAlertModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    // AngularFireAnalyticsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
