import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { User } from 'src/app/data/user';
import { Subscription } from 'rxjs/internal/Subscription';
import { MainService } from 'src/app/services/main.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Accion } from 'src/app/data/accion';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent implements OnInit {
  dataSource = new MatTableDataSource();

  public displayedColumns = ['empresa', 'numero', 'precio_unitario', 'precio_actual', 'rentabilidad'];

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;

  public user: User = new User()
  public isLoading: boolean = true
  public interval

  constructor(private service: MainService) { }

  ngOnInit() {
    this.service.data.getUser(sessionStorage.getItem('user')).subscribe((data) => {
      this.user.cartera = data[0].cartera
      this.updateRentabilidad()
      this.isLoading = false
      this.dataSource.data = this.user.cartera
      this.interval = setInterval(() => {
        this.updateRentabilidad()
      }, 35000)
    })   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  updateRentabilidad(){
    this.user.cartera.forEach(accion => {
      this.service.api.getValue(accion.empresa).subscribe((data) => {
        accion.precio_actual = data['c']
        accion.rentabilidad = accion.numero * (accion.precio_actual - accion.precio_unitario)
      })
    });
    this.dataSource.data = this.user.cartera
  }

}
