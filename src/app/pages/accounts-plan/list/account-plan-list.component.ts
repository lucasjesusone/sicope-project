import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AccountPlan, AccountPlanListResult, AccountPlanResult } from 'src/app/_models/account-plan.models';
import { AccountPlanService } from 'src/app/_services/account-plan.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-account-plan-list',
  templateUrl: './account-plan-list.component.html'
})
export class AccountPlanListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  accountPlans: AccountPlan[];

  totalRecords: number;
  accountPlanResult: Observable<AccountPlanResult>;
  error: any;

  constructor(
    private service: AccountPlanService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var accountPlanFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      accountPlanFilter = 'description=' + this.formSearch.get("valueSearch").value;

    this.service.getResultAccountPlans(accountPlanFilter).subscribe(
      (result: AccountPlanListResult) => {
        this.totalRecords = result.data.length;
        this.accountPlans = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.accountPlans = null;
      }
    );
  }

  update(accountPlan: AccountPlan) {
    this.router.navigate(["account-plans/form/" + accountPlan.id.toString()]);
  }

}
