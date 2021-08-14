import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private urlApi = `${environment.apiUrl}/v1/utils`;

  constructor(private http: HttpClient) { }

  getByZipCode(zipCode: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/cep/` + zipCode, {});
  }

  getByDocument(document: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/cnpj/` + document, {});
  }

}
