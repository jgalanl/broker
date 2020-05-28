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

  constructor(private formBuilder: FormBuilder, private service: MainService) {
    this.compraForm = this.formBuilder.group({
      empresa: [''],
      fecha: new FormControl("", [Validators.required,]),
      acciones: new FormControl("", [Validators.required,]),
      importe: new FormControl("", [Validators.required,]),
    })

    this.getEmpresas()
   }

  ngOnInit() {
  }

  async getEmpresas() {
    await this.service.api.getSymbols().subscribe(data => {
      console.log(data)
      this.empresas = data
    })
  }

  getValorActual(e){
    //Recuperar valor actual
    console.log(e)
  }

}
