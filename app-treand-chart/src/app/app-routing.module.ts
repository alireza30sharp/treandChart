import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreandComponent } from './treand/treand.component';

const routes: Routes = [
{component:TreandComponent,path:'treand'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
