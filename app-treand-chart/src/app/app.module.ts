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
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompareChartIssuesComponent } from './compare-chart-issues/compare-chart-issues.component';

@NgModule({
  declarations: [
    AppComponent,
    TreandComponent,
    NavBarTreandComponent,
    CompareChartIssuesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules },],
  bootstrap: [AppComponent]
})
export class AppModule { }
