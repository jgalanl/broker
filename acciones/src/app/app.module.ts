import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarteraComponent } from './modules/cartera/cartera.component';
import { VentaComponent } from './modules/venta/venta.component';
import { CompraComponent } from './modules/compra/compra.component';
import { LogInComponent } from './modules/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    CarteraComponent,
    VentaComponent,
    CompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
