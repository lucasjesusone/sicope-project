import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { PayRoll, PayRollListResult, PayRollResult } from '../_models/payroll.models';

@Injectable({ providedIn: 'root' })
export class PayRollService {
  private urlApi = `${environment.apiUrl}/v1/payrolls`;

  constructor(private http: HttpClient) { }

  getResultPayRolls(payrollFilter: string): Observable<PayRollListResult> {
    return this.http.get<PayRollListResult>(`${this.urlApi}?` + payrollFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getPayRollById(id: number): Observable<PayRollResult> {
    return this.http.get<PayRollResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  deletePayRoll() { }
}
