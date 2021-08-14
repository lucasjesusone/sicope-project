import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Expense, ExpenseListResult, ExpenseResult } from 'src/app/_models/expense.models';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html'
})
export class ExpenseListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  expenses: Expense[];

  totalRecords: number;
  expenseResult: Observable<ExpenseResult>;
  error: any;

  constructor(
    private service: ExpenseService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var expenseFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      expenseFilter = 'description=' + this.formSearch.get("valueSearch").value;

    this.service.getResultExpenses(expenseFilter).subscribe(
      (result: ExpenseListResult) => {
        this.totalRecords = result.data.length;
        this.expenses = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.expenses = null;
      }
    );
  }

  update(expense: Expense) {
    this.router.navigate(["expenses/form/" + expense.id.toString()]);
  }

}
