import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public auth: AuthService
  public data: DataService

  constructor(auth: AuthService, data: DataService) { 
    this.auth = auth
    this.data = data
  }
}
