import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Measurement, MeasurementListResult, MeasurementResult } from 'src/app/_models/measurement.models';
import { MeasurementService } from 'src/app/_services/measurement.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html'
})
export class MeasurementListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  measurements: Measurement[];

  totalRecords: number;
  measurementResult: Observable<MeasurementResult>;
  error: any;

  constructor(
    private service: MeasurementService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var measurementFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      measurementFilter = 'XXXXX=' + this.formSearch.get("valueSearch").value;

    this.service.MetResultmeasurements(measurementFilter).subscribe(
      (result: MeasurementListResult) => {
        this.totalRecords = result.data.length;
        this.measurements = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.measurements = null;
      }
    );
  }
}
