import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { EducationLevel, EducationLevelListResult, EducationLevelListToLookup, EducationLevelResult } from '../_models/education-level.models';

@Injectable({ providedIn: 'root' })
export class EducationLevelService {
  private urlApi = `${environment.apiUrl}/v1/education-levels`;

  constructor(private http: HttpClient) { }

  getResultEducationLevels(filter: string): Observable<EducationLevelListResult> {
    return this.http.get<EducationLevelListResult>(`${this.urlApi}?` + filter,
      { headers: AuthenticationService.composeHeaders() });
  }

  getEducationLevelById(id: number): Observable<EducationLevelResult> {
    return this.http.get<EducationLevelResult>(`${this.urlApi}/` + id,
      { headers: AuthenticationService.composeHeaders() });
  }

  getResultEducationLevelsLookup(): Observable<EducationLevelListResult> {
    return this.http.get<EducationLevelListResult>(`${this.urlApi}/`,
      { headers: AuthenticationService.composeHeaders() });
  }

  getEducationLevelListToLookup(): Observable<EducationLevelListToLookup> {
    return this.http.get<EducationLevelListToLookup>(`${this.urlApi}/to-select`,
      { headers: AuthenticationService.composeHeaders() });
  }

  postEducationLevel(EducationLevelCreate: EducationLevel) {
    return this.http.post(this.urlApi, EducationLevelCreate,
      { headers: AuthenticationService.composeHeaders() });
  }

  putEducationLevel(EducationLevelUpdate: EducationLevel) {
    return this.http.put(this.urlApi, EducationLevelUpdate,
      { headers: AuthenticationService.composeHeaders() });
  }

  deleteEducationLevel() { }
}
