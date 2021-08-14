import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Account, AccountListResult, AccountResult } from 'src/app/_models/account.models';
import { AccountService } from 'src/app/_services/account.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html'
})
export class AccountListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  accounts: Account[];

  totalRecords: number;
  accountResult: Observable<AccountResult>;
  error: any;

  constructor(
    private service: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.onSearch()
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var accountFilter = '';
  

    this.service.getResultAccounts(accountFilter).subscribe(
      (result: AccountListResult) => {
        this.totalRecords = result.data.length;
        this.accounts = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.accounts = null;
      }
    );
    
    if (this.formSearch.get("valueSearch").value != null)
    accountFilter = 'name=' + this.formSearch.get("valueSearch").value;
  }

  update(account: Account) {
    this.router.navigate(["accounts/form/" + account.id.toString()]);
  }

}
