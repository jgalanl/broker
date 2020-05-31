import { Component, OnInit } from '@angular/core';
import { Accion } from 'src/app/data/accion';
import { MainService } from 'src/app/services/main.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  public s_user: Subscription;

  public cartera: Array<Accion>
  ventaForm: FormGroup
  public precio_unitario: number
  public importe: number
  public accion: Accion

  constructor(private formBuilder: FormBuilder, private service: MainService) {
    this.ventaForm = this.formBuilder.group({
      empresa: new FormControl("", [Validators.required]),
      fecha: new FormControl(new Date().toISOString().substr(0, 10), [Validators.required]),
      importe: new FormControl(""),
    })   
  }

  ngOnInit() {
    this.s_user = this.service.data.getUser(sessionStorage.getItem('user')).subscribe(data => {
      this.cartera = data[0].cartera
    })
  }

  getImporte(e: Accion){
    this.service.api.getValue(e.empresa).subscribe((data) => {
      this.precio_unitario = data['c']
      this.importe = this.precio_unitario * e.numero
      this.accion = e
    })
  }

  onSubmit(){
    this.service.data.deleteAccion(sessionStorage.getItem('user'), this.accion)
    .then((result) => {
      if(result){
        window.alert("Venta realizada correctamente.")
      } else {
        window.alert("Error al realizar la venta.")
      }
    })
  }

}
