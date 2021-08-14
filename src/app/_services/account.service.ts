import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Account, AccountListResult, AccountListToLookup, AccountResult } from '../_models/account.models';

@Injectable({ providedIn: 'root' })
export class AccountService {
	private urlApi = `${environment.apiUrl}/v1/accounts`;

	constructor(private http: HttpClient) { }

	getResultAccounts(accountFilter: string): Observable<AccountListResult> {
		return this.http.get<AccountListResult>(`${this.urlApi}?` + accountFilter, { headers: AuthenticationService.composeHeaders() });
	}

	getAccountById(id: number): Observable<AccountResult> {
		return this.http.get<AccountResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
	}

	getAccountListToLookup(): Observable<AccountListToLookup> {
		return this.http.get<AccountListToLookup>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
	}
	postAccount(accountCreate: Account) {
		return this.http.post(this.urlApi, accountCreate, { headers: AuthenticationService.composeHeaders() });
	}

	putAccount(accountUpdate: Account) {
		return this.http.put(this.urlApi, accountUpdate, { headers: AuthenticationService.composeHeaders() });
	}

	deleteAccount() { }
}