import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl("", [Validators.required,]),
    password: new FormControl("", [Validators.required,]),
  });

  constructor(private service: MainService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let success = this.service.auth.login(this.loginForm.get("user").value, this.loginForm.get("password").value)

    if(success){
      sessionStorage.setItem('user', this.loginForm.get("user").value);
      this.router.navigate(["/home"])
    }
    else{
      window.alert("Usuario y contraseña incorrectos.")
    }
  }

}
