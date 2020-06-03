import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public re: RegExp

  constructor() { 
    this.re = new RegExp('^DEPI\\d+$')
  }

  /**
   * login
   */
  public login(user: string, password: string): Boolean {
    if(this.re.test(user) && password == '2020') return true
    else return false    
  }
}
