import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { AccountPlan, AccountPlanListResult, AccountPlanResult } from '../_models/account-plan.models';

@Injectable({ providedIn: 'root' })
export class AccountPlanService {
  private urlApi = `${environment.apiUrl}/v1/account-plans`;

  constructor(private http: HttpClient) { }

  getResultAccountPlans(accountPlanFilter: string): Observable<AccountPlanListResult> {
    return this.http.get<AccountPlanListResult>(`${this.urlApi}?` + accountPlanFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getAccountPlanById(id: number): Observable<AccountPlanResult> {
    return this.http.get<AccountPlanResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getAccountPlanListToLookup(): Observable<AccountPlanListResult> {
    return this.http.get<AccountPlanListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postAccountPlan(accountPlanCreate: AccountPlan) {
    return this.http.post(this.urlApi, accountPlanCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putAccountPlan(accountPlanUpdate: AccountPlan) {
    return this.http.put(this.urlApi, accountPlanUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteAccountPlan() { }
}
