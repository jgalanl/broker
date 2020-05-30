import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

//Firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

//Anguarl Material
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from "@angular/material";
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material' 
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarteraComponent } from './modules/cartera/cartera.component';
import { VentaComponent } from './modules/venta/venta.component';
import { CompraComponent } from './modules/compra/compra.component';
import { LogInComponent } from './modules/log-in/log-in.component';
import { HomeComponent } from './modules/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    CarteraComponent,
    VentaComponent,
    CompraComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  exports : [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
