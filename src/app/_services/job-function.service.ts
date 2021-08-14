import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { JobFunction, JobFunctionListResult, JobFunctionResult } from '../_models/job-function.models';

@Injectable({ providedIn: 'root' })
export class JobFunctionService {
  private urlApi = `${environment.apiUrl}/v1/job-functions`;

  constructor(private http: HttpClient) { }

  getResultJobFunctions(jobFilter: string): Observable<JobFunctionListResult> {
    return this.http.get<JobFunctionListResult>(`${this.urlApi}?` + jobFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getJobFunctionById(id: number): Observable<JobFunctionResult> {
    return this.http.get<JobFunctionResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getJobFunctionListToLookup(): Observable<JobFunctionListResult> {
    return this.http.get<JobFunctionListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postJobFunction(jobCreate: JobFunction) {
    return this.http.post(this.urlApi, jobCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putJobFunction(jobUpdate: JobFunction) {
    return this.http.put(this.urlApi, jobUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteJobFunction() { }
}
