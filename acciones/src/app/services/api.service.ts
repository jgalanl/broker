import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders }    from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';



// https://finnhub.io/api/v1/stock/symbol?exchange=MC&tokenbr8e2nnrh5ral083fv90
// https://finnhub.io/api/v1/stock/symbol?exchange=MC&token=br8e2nnrh5ral083fv90

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: string = "br8e2nnrh5ral083fv90"
  apiUrl: string = "https://finnhub.io/api/v1"
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getSymbols(): Promise<any[]>{
    const url = `${this.apiUrl}/stock/symbol?exchange=MC&token=${this.token}`
    return new Promise<any>((resolve, reject) => {
      try {
        this.http.get<any[]>(url).subscribe((res) => {
          resolve(res)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  public getValue(symbol:string): Observable<any>{
    const url = `${this.apiUrl}/quote?symbol=${symbol}&token=${this.token}`
    return this.http.get<any>(url)
  }

}