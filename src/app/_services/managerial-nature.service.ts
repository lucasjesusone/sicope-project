import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { ManagerialNature, ManagerialNatureListResult, ManagerialNatureResult } from '../_models/managerial-nature.models';

@Injectable({ providedIn: 'root' })
export class ManagerialNatureService {
  private urlApi = `${environment.apiUrl}/v1/management-natures`;

  constructor(private http: HttpClient) { }

  getResultManagerialNatures(managerialNatureFilter: string): Observable<ManagerialNatureListResult> {
    return this.http.get<ManagerialNatureListResult>(`${this.urlApi}?` + managerialNatureFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getManagerialNatureById(id: number): Observable<ManagerialNatureResult> {
    return this.http.get<ManagerialNatureResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getManagerialNatureListToLookup(): Observable<ManagerialNatureListResult> {
    return this.http.get<ManagerialNatureListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postManagerialNature(managerialNatureCreate: ManagerialNature) {
    return this.http.post(this.urlApi, managerialNatureCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putManagerialNature(managerialNatureUpdate: ManagerialNature) {
    return this.http.put(this.urlApi, managerialNatureUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteManagerialNature() { }
}
