import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Management, ManagementListResult, ManagementResult } from 'src/app/_models/management.models';
import { ManagementService } from 'src/app/_services/management.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-management-list',
  templateUrl: './management-list.component.html'
})
export class ManagementListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  managements: Management[];

  totalRecords: number;
  managementResult: Observable<ManagementResult>;
  error: any;

  constructor(
    private service: ManagementService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {
    var managementFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      managementFilter = 'description=' + this.formSearch.get("valueSearch").value;

    this.service.getResultManagements(managementFilter).subscribe(
      (result: ManagementListResult) => {
        this.totalRecords = result.data.length;
        this.managements = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.managements = null;
      }
    );
  }

  update(management: Management) {
    this.router.navigate(["managements/form/" + management.id.toString()]);
  }

}
