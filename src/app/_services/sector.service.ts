import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Sector, SectorListResult, SectorResult } from '../_models/sector.models';

@Injectable({ providedIn: 'root' })
export class SectorService {
  private urlApi = `${environment.apiUrl}/v1/sectors`;

  constructor(private http: HttpClient) { }

  getResultSectors(sectorFilter: string): Observable<SectorListResult> {
    return this.http.get<SectorListResult>(`${this.urlApi}?` + sectorFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getSectorById(id: number): Observable<SectorResult> {
    return this.http.get<SectorResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getSectorListToLookup(): Observable<SectorListResult> {
    return this.http.get<SectorListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postSector(sectorCreate: Sector) {
    return this.http.post(this.urlApi, sectorCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putSector(sectorUpdate: Sector) {
    return this.http.put(this.urlApi, sectorUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deleteSector() { }
}
