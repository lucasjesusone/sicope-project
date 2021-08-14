import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { PaymentMethod, PaymentMethodListResult, PaymentMethodResult } from '../_models/payment-method.models';

@Injectable({ providedIn: 'root' })
export class PaymentMethodService {
  private urlApi = `${environment.apiUrl}/v1/payment-methods`;

  constructor(private http: HttpClient) { }

  getResultPaymentMethods(filter: string): Observable<PaymentMethodListResult> {
    return this.http.get<PaymentMethodListResult>(`${this.urlApi}?` + filter, { headers: AuthenticationService.composeHeaders() });
  }

  getPaymentMethodById(id: number): Observable<PaymentMethodResult> {
    return this.http.get<PaymentMethodResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getResultPaymentMethodsLookup(): Observable<PaymentMethodListResult> {
    return this.http.get<PaymentMethodListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postPaymentMethod(paymentMethodCreate: PaymentMethod) {
    return this.http.post(this.urlApi, paymentMethodCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putPaymentMethod(paymentMethodUpdate: PaymentMethod) {
    return this.http.put(this.urlApi, paymentMethodUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  deletePaymentMethod() { }
}
