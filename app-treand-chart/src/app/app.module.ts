import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import highmaps from 'highcharts/modules/map.src';
import exporting from 'highcharts/modules/exporting.src';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [more, exporting, highmaps, stock];
}
import { HIGHCHARTS_MODULES, ChartModule } from 'angular-highcharts';
import { TreandComponent } from './treand/treand.component';
import { NavBarTreandComponent } from './nav-bar-treand/nav-bar-treand.component';

@NgModule({
  declarations: [
    AppComponent,
    TreandComponent,
    NavBarTreandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule
  ],
  providers: [ { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules },],
  bootstrap: [AppComponent]
})
export class AppModule { }
