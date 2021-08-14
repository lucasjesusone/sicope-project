import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Invoice, InvoiceListResult, InvoiceResult } from '../_models/invoice.models';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private urlApi = `${environment.apiUrl}/v1/invoices`;

  constructor(private http: HttpClient) { }

  getResultInvoices(invoiceFilter: string): Observable<InvoiceListResult> {
    return this.http.get<InvoiceListResult>(`${this.urlApi}?` + invoiceFilter, { headers: AuthenticationService.composeHeaders() });
  }

  getInvoiceById(id: number): Observable<InvoiceResult> {
    return this.http.get<InvoiceResult>(`${this.urlApi}/` + id, { headers: AuthenticationService.composeHeaders() });
  }

  getResultInvoicesLookup(): Observable<InvoiceListResult> {
    return this.http.get<InvoiceListResult>(`${this.urlApi}/to-select`, { headers: AuthenticationService.composeHeaders() });
  }

  postInvoice(invoiceCreate: Invoice) {
    return this.http.post(this.urlApi, invoiceCreate, { headers: AuthenticationService.composeHeaders() });
  }

  putInvoice(invoiceUpdate: Invoice) {
    return this.http.put(this.urlApi, invoiceUpdate, { headers: AuthenticationService.composeHeaders() });
  }

  transmitInvoice(invoiceTransmit: Invoice) {
    return this.http.post(`${this.urlApi}/transmit`, invoiceTransmit, { headers: AuthenticationService.composeHeaders() });
  }

  deleteInvoice() { }
}
