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
  public acciones: Accion[]
  dataSource = new MatTableDataSource();
  public displayedColumns = ['empresa', 'numero', 'precio_compra', 'precio_actual', 'rentabilidad'];

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;

  public user: User = new User()
  public s_user: Subscription;

  constructor(private service: MainService) { }

  ngOnInit() {
    this.s_user = this.service.data.getUser(sessionStorage.getItem('user')).subscribe(data => {
      this.user = data[0]
      this.dataSource.data = this.user.cartera
      console.log(this.dataSource.data)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
  }

}
