import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { MeasurementListResult, MeasurementResult } from '../_models/measurement.models';

@Injectable({ providedIn: 'root' })
export class MeasurementService {
  private urlApi = `${environment.apiUrl}/v1/measurements`;

  constructor(private http: HttpClient) { }

  MetResultmeasurements(measurementFilter: string): Observable<MeasurementListResult> {
    return this.http.get<MeasurementListResult>(`${this.urlApi}?` + measurementFilter, { headers: AuthenticationService.composeHeaders() });
  }

  MetmeasurementById(id: number): Observable<MeasurementResult> {
    return this.http.get<MeasurementResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  Meletemeasurement() { }
}
