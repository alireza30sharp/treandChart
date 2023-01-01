import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeBarChartComponent } from './time-bar-chart/time-bar-chart.component';
import { TreandComponent } from './treand/treand.component';

const routes: Routes = [
{component:TreandComponent,path:'treand'},
{component:TimeBarChartComponent,path:'time'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
