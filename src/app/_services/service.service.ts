import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Service, ServiceListResult, ServiceResult } from '../_models/service.models';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private urlApi = `${environment.apiUrl}/v1/services`;

  constructor(private http: HttpClient) { }

  getResultServices(serviceFilter: string): Observable<ServiceListResult> {
    return this.http.get<ServiceListResult>(`${this.urlApi}?` + serviceFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getServiceById(id: number): Observable<ServiceResult> {
    return this.http.get<ServiceResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getServiceListToLookup(): Observable<ServiceListResult> {
    return this.http.get<ServiceListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postService(serviceCreate: Service) {
    return this.http.post(this.urlApi, serviceCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putService(serviceUpdate: Service) {
    return this.http.put(this.urlApi, serviceUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteService() { }
}
