import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { EducationLevel, EducationLevelListResult, EducationLevelResult } from 'src/app/_models/education-level.models';
import { EducationLevelService } from 'src/app/_services/education-level.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-education-level-list',
  templateUrl: './education-level-list.component.html'
})
export class EducationLevelListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  educationLevels: EducationLevel[];

  totalRecords: number;
  educationLevelResult: Observable<EducationLevelResult>;
  error: any;

  constructor(
    private service: EducationLevelService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {
    var educationLevelFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      educationLevelFilter = 'description=' + this.formSearch.get("valueSearch").value;

    this.service.getResultEducationLevels(educationLevelFilter).subscribe(
      (result: EducationLevelListResult) => {
        this.totalRecords = result.data.length;
        this.educationLevels = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.educationLevels = null;
      }
    );
  }

  update(educationLevel: EducationLevel) {
    this.router.navigate(["education-levels/form/" + educationLevel.id.toString()]);
  }

}
