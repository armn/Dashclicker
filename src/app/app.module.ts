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
  NbListModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { AppRoutingModule } from "./app-routing.module";
import { ClicksComponent } from "./clicks/clicks.component";
import { ClickItemComponent } from "./clicks/click-item/click-item.component";
import { NumbersPipe } from "./numbers.pipe";
import { MarketComponent } from "./market/market.component";
import { MarketItemComponent } from "./market/market-item/market-item.component";
import { GameService } from "./game.service";
import { TasksComponent } from "./tasks/tasks.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { AnalyticsItemComponent } from './analytics/analytics-item/analytics-item.component';

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
    AnalyticsItemComponent
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
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {}
