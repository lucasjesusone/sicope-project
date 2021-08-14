import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Invoice, InvoiceListResult, InvoiceResult } from 'src/app/_models/invoice.models';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  invoices: Invoice[];

  totalRecords: number;
  invoiceResult: Observable<InvoiceResult>;
  error: any;

  constructor(
    private service: InvoiceService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {
    var filter = '';
    if (this.formSearch.get("valueSearch").value != null)
      filter = 'name_services=' + this.formSearch.get("valueSearch").value;

    this.service.getResultInvoices(filter).subscribe(
      (result: InvoiceListResult) => {
        this.totalRecords = result.data.length;
        this.invoices = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.invoices = null;
      }
    );
  }

  update(invoice: Invoice) {
    this.router.navigate(["invoices/form/" + invoice.id.toString()]);
  }

  transmit(invoice: Invoice) {
    this.service.transmitInvoice(invoice).subscribe(
      (resultServer: any) => {
        if (resultServer.success === true) {
          console.log(resultServer)
        } else {
        }
      },
      error => console.log(error)
    );
  }

}
