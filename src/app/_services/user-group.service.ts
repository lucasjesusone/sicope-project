import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { UserGroup, UserGroupListResult, UserGroupResult } from '../_models/user-group.models';

@Injectable({ providedIn: 'root' })
export class UserGroupService {
  private urlApi = `${environment.apiUrl}/v1/user-groups`;

  constructor(private http: HttpClient) { }

  getResultUserGroups(userFilter: string): Observable<UserGroupListResult> {
    return this.http.get<UserGroupListResult>(`${this.urlApi}?` + userFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getUserGroupById(id: number): Observable<UserGroupResult> {
    return this.http.get<UserGroupResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getResultUserGroupsLookup(): Observable<UserGroupListResult> {
    return this.http.get<UserGroupListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postUserGroup(userCreate: UserGroup) {
    return this.http.post(this.urlApi, userCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putUserGroup(userUpdate: UserGroup) {
    return this.http.put(this.urlApi, userUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteUserGroup() { }
}
