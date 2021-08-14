import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Management, ManagementListResult, ManagementResult } from '../_models/management.models';

@Injectable({ providedIn: 'root' })
export class ManagementService {
  private urlApi = `${environment.apiUrl}/v1/managements`;

  constructor(private http: HttpClient) { }

  getResultManagements(filter: string): Observable<ManagementListResult> {
    return this.http.get<ManagementListResult>(`${this.urlApi}?` + filter, { headers: AuthenticationService.composeHeaders() });
  }

  getManagementById(id: number): Observable<ManagementResult> {
    return this.http.get<ManagementResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getResultManagementsLookup(): Observable<ManagementListResult> {
    return this.http.get<ManagementListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postManagement(managementCreate: Management) {
    return this.http.post(this.urlApi, managementCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putManagement(managementUpdate: Management) {
    return this.http.put(this.urlApi, managementUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteManagement() { }
}
