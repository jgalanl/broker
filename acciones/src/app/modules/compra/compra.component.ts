import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  public empresas: Array<string>
  compraForm: FormGroup

  public simbolo: string
  public precio_unitario: number
  public importe: number

  constructor(private formBuilder: FormBuilder, private service: MainService) {
    this.compraForm = this.formBuilder.group({
      empresa: new FormControl("", [Validators.required]),
      fecha: new FormControl(new Date().toISOString().substr(0, 10)),
      acciones: new FormControl(1, [Validators.required,]),
      importe: new FormControl(""),
    })

    this.getEmpresas()
   
  }

  ngOnInit() {
  }

  async getEmpresas() {
    this.empresas = await this.service.api.getSymbols()
  }

  async getValorActual(e){
    //Recuperar valor actual
    this.service.api.getValue(e.symbol).subscribe((data) => {
      this.precio_unitario = data['c']
      this.importe = this.precio_unitario
      this.simbolo = e.symbol
    })
  }

  updateImporte(){
    this.importe = this.compraForm.get('acciones').value * this.precio_unitario
  }

  onSubmit(){
    this.service.data.insertAccion(sessionStorage.getItem('user'), this.simbolo,
    this.compraForm.get('fecha').value, this.compraForm.get('acciones').value, 
    this.precio_unitario, this.importe)
    .then((result) => {
      if(result){
        window.alert("La compra se ha realizado correctamente.")
      } else {
        window.alert("Error al realizar la compra.")
      }
    })
  }

}
