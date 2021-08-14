import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Flow, FlowListResult, FlowResult } from '../_models/flow.models';

@Injectable({ providedIn: 'root' })
export class FlowService {
  private urlApi = `${environment.apiUrl}/v1/flows`;

  constructor(private http: HttpClient) { }

  getResultFlows(flowFilter: string): Observable<FlowListResult> {
    return this.http.get<FlowListResult>(`${this.urlApi}?` + flowFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getFlowById(id: number): Observable<FlowResult> {
    return this.http.get<FlowResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  deleteFlow() { }
}
