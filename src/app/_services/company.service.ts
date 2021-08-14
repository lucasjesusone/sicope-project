import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Company, CompanyListResult, CompanyListToLookup, CompanyResult } from '../_models/company.models';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private urlApi = `${environment.apiUrl}/v1/companies`;

  constructor(private http: HttpClient) { }

  getResultCompanys(companyFilter: string): Observable<CompanyListResult> {
    return this.http.get<CompanyListResult>(`${this.urlApi}?` + companyFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getCompanyById(id: number): Observable<CompanyResult> {
    return this.http.get<CompanyResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getCompanyListToLookup(): Observable<CompanyListToLookup> {
    return this.http.get<CompanyListToLookup>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postCompany(companyCreate: Company) {
    return this.http.post(this.urlApi, companyCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putCompany(companyUpdate: Company) {
    return this.http.put(this.urlApi, companyUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteCompany() { }
}
