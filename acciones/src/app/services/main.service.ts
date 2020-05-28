import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public auth: AuthService
  public data: DataService
  public api: ApiService

  constructor(auth: AuthService, data: DataService, api: ApiService) { 
    this.auth = auth
    this.data = data
    this.api = api
  }
}
