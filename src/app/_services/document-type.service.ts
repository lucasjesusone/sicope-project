import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { DocumentType, DocumentTypeListResult, DocumentTypeResult } from '../_models/document-type.models';

@Injectable({ providedIn: 'root' })
export class DocumentTypeService {
  private urlApi = `${environment.apiUrl}/v1/document-types`;

  constructor(private http: HttpClient) { }

  getResultDocumentTypes(documentTypeFilter: string): Observable<DocumentTypeListResult> {
    return this.http.get<DocumentTypeListResult>(`${this.urlApi}?` + documentTypeFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getDocumentTypeById(id: number): Observable<DocumentTypeResult> {
    return this.http.get<DocumentTypeResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getDocumentTypeListToLookup(): Observable<DocumentTypeListResult> {
    return this.http.get<DocumentTypeListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postDocumentType(documentTypeCreate: DocumentType) {
    return this.http.post(this.urlApi, documentTypeCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putDocumentType(documentTypeUpdate: DocumentType) {
    return this.http.put(this.urlApi, documentTypeUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteDocumentType() { }
}
