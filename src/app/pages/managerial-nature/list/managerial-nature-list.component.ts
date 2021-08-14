import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ManagerialNature, ManagerialNatureListResult, ManagerialNatureResult } from 'src/app/_models/managerial-nature.models';
import { ManagerialNatureService } from 'src/app/_services/managerial-nature.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-managerial-nature-list',
  templateUrl: './managerial-nature-list.component.html'
})
export class ManagerialNatureListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  managerialNatures: ManagerialNature[];

  totalRecords: number;
  managerialNatureResult: Observable<ManagerialNatureResult>;
  error: any;

  constructor(
    private service: ManagerialNatureService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var managerialNatureFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      managerialNatureFilter = 'description=' + this.formSearch.get("valueSearch").value;

    this.service.getResultManagerialNatures(managerialNatureFilter).subscribe(
      (result: ManagerialNatureListResult) => {
        this.totalRecords = result.data.length;
        this.managerialNatures = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.managerialNatures = null;
      }
    );
  }

  update(managerialNature: ManagerialNature) {
    this.router.navigate(["managerial-natures/form/" + managerialNature.id.toString()]);
  }

}
