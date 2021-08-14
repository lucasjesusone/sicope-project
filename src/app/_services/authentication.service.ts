import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogged, UserLogin } from '../_models/user.models';
import { environment } from 'src/environments/environment';
import { Security } from '../_utils/security';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  public static composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    })
    return headers;
  }

  login(userLogin: UserLogin): Observable<UserLogged> {
    return this.http
      .post<UserLogged>(`${environment.apiUrl}/v1/users/authenticate`, userLogin)
      .pipe(map(userLogged => { return userLogged; }));
  }

  refreshToken() {
    return this.http.post(`${environment.apiUrl}/v1/users/refresh-token`,
      null,
      { headers: AuthenticationService.composeHeaders() });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
