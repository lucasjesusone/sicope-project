import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Collaborator, CollaboratorListResult, CollaboratorResult } from '../_models/collaborator.models';

@Injectable({ providedIn: 'root' })
export class CollaboratorService {
  private urlApi = `${environment.apiUrl}/v1/collaborators`;

  constructor(private http: HttpClient) { }

  getResultCollaborators(filter: string): Observable<CollaboratorListResult> {
    return this.http.get<CollaboratorListResult>(`${this.urlApi}?` + filter, { headers: AuthenticationService.composeHeaders() });
  }

  getCollaboratorById(id: number): Observable<CollaboratorResult> {
    return this.http.get<CollaboratorResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getResultCollaboratorsLookup(): Observable<CollaboratorListResult> {
    return this.http.get<CollaboratorListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postCollaborator(collaboratorCreate: Collaborator) {
    return this.http.post(this.urlApi, collaboratorCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putCollaborator(collaboratorUpdate: Collaborator) {
    return this.http.put(this.urlApi, collaboratorUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteCollaborator() { }
}
