import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './modules/log-in/log-in.component';
import { HomeComponent } from './modules/home/home.component';
import { CarteraComponent } from './modules/cartera/cartera.component';
import { CompraComponent } from './modules/compra/compra.component';
import { VentaComponent } from './modules/venta/venta.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  { path: "login", component: LogInComponent },
  { path: "home", component: HomeComponent, children :[
    { path: "", component: CarteraComponent },
    { path: "cartera", component: CarteraComponent },
    { path: "compra", component: CompraComponent },
    { path: "venta", component: VentaComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
