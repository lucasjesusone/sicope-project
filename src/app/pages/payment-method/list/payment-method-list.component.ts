import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentMethod, PaymentMethodListResult, PaymentMethodResult } from 'src/app/_models/payment-method.models';
import { PaymentMethodService } from 'src/app/_services/payment-method.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html'
})
export class PaymentMethodListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  paymentMethods: PaymentMethod[];

  totalRecords: number;
  paymentMethodResult: Observable<PaymentMethodResult>;
  error: any;

  constructor(
    private service: PaymentMethodService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {
    var paymentMethodFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      paymentMethodFilter = 'description=' + this.formSearch.get("valueSearch").value;

    this.service.getResultPaymentMethods(paymentMethodFilter).subscribe(
      (result: PaymentMethodListResult) => {
        this.totalRecords = result.data.length;
        this.paymentMethods = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.paymentMethods = null;
      }
    );
  }

  update(paymentMethod: PaymentMethod) {
    this.router.navigate(["payment-methods/form/" + paymentMethod.id.toString()]);
  }

}
