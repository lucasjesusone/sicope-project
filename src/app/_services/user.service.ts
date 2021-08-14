import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserListResult, UserResult, User } from '../_models/user.models';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private urlApi = `${environment.apiUrl}/v1/users`;

  constructor(private http: HttpClient) { }

  getResultUsers(userFilter: string): Observable<UserListResult> {
    return this.http.get<UserListResult>(`${this.urlApi}?` + userFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getUserById(id: number): Observable<UserResult> {
    return this.http.get<UserResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getResultUsersLookup(): Observable<UserListResult> {
    return this.http.get<UserListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postUser(userCreate: User) {
    return this.http.post(this.urlApi, userCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putUser(userUpdate: User) {
    return this.http.put(this.urlApi, userUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteUser() { }
}
