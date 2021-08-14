import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { JobFunction, JobFunctionListResult, JobFunctionResult } from 'src/app/_models/job-function.models';
import { JobFunctionService } from 'src/app/_services/job-function.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-job-function-list',
  templateUrl: './job-function-list.component.html'
})
export class JobFunctionListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  jobFunctions: JobFunction[];

  totalRecords: number;
  jobFunctionResult: Observable<JobFunctionResult>;
  error: any;

  constructor(
    private service: JobFunctionService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var jobFunctionFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      jobFunctionFilter = 'name=' + this.formSearch.get("valueSearch").value;

    this.service.getResultJobFunctions(jobFunctionFilter).subscribe(
      (result: JobFunctionListResult) => {
        this.totalRecords = result.data.length;
        this.jobFunctions = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.jobFunctions = null;
      }
    );
  }

  update(jobFunction: JobFunction) {
    this.router.navigate(["job-functions/form/" + jobFunction.id.toString()]);
  }

}
