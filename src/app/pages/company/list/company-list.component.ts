import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Company, CompanyListResult, CompanyResult } from 'src/app/_models/company.models';
import { CompanyService } from 'src/app/_services/company.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  companies: Company[];

  totalRecords: number;
  companyResult: Observable<CompanyResult>;
  error: any;

  constructor(
    private service: CompanyService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var queryString = '';
    if (this.formSearch.get("valueSearch").value != null)
      queryString = 'name=' + this.formSearch.get("valueSearch").value;

    this.service.getResultCompanys(queryString).subscribe(
      (result: CompanyListResult) => {
        this.totalRecords = result.data.length;
        this.companies = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.companies = null;
      }
    );
  }

  update(company: Company) {
    this.router.navigate(["companies/form/" + company.id.toString()]);
  }

}
