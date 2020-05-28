import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders }    from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: string = "br83sj7rh5recjnupqp0"
  apiUrl: string = "https://finnhub.io/api/v1/"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  public getSymbols(): Observable<any[]>{
    const url = `${this.apiUrl}/stock/symbol?exchange=MC&token${this.token}`;
    return this.http.get<any[]>(url)
    .pipe(
      tap(_ => console.log("funciona")),
      catchError(this.handleError<any[]>('getSymbols', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
