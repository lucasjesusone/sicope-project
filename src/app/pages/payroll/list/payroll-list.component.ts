import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PayRoll, PayRollListResult, PayRollResult } from 'src/app/_models/payroll.models';
import { PayRollService } from 'src/app/_services/payroll.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html'
})
export class PayRollListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  payrolls: PayRoll[];

  totalRecords: number;
  payrollResult: Observable<PayRollResult>;
  error: any;

  constructor(
    private service: PayRollService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var payrollFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      payrollFilter = 'XXXXX=' + this.formSearch.get("valueSearch").value;

    this.service.getResultPayRolls(payrollFilter).subscribe(
      (result: PayRollListResult) => {
        this.totalRecords = result.data.length;
        this.payrolls = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.payrolls = null;
      }
    );
  }
}
