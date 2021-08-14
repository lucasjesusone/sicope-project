import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Expense, ExpenseListResult, ExpenseResult } from '../_models/expense.models';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private urlApi = `${environment.apiUrl}/v1/expenses`;

  constructor(private http: HttpClient) { }

  getResultExpenses(expenseFilter: string): Observable<ExpenseListResult> {
    return this.http.get<ExpenseListResult>(`${this.urlApi}?` + expenseFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getExpenseById(id: number): Observable<ExpenseResult> {
    return this.http.get<ExpenseResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getExpenseListToLookup(): Observable<ExpenseListResult> {
    return this.http.get<ExpenseListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postExpense(expenseCreate: Expense) {
    return this.http.post(this.urlApi, expenseCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putExpense(expenseUpdate: Expense) {
    return this.http.put(this.urlApi, expenseUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteExpense() { }
}
