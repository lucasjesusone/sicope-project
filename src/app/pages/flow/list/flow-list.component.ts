import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Flow, FlowListResult, FlowResult } from 'src/app/_models/flow.models';
import { FlowService } from 'src/app/_services/flow.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html'
})
export class FlowListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  flows: Flow[];

  totalRecords: number;
  flowResult: Observable<FlowResult>;
  error: any;

  constructor(
    private service: FlowService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var flowFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      flowFilter = 'XXXXX=' + this.formSearch.get("valueSearch").value;

    this.service.getResultFlows(flowFilter).subscribe(
      (result: FlowListResult) => {
        this.totalRecords = result.data.length;
        this.flows = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.flows = null;
      }
    );
  }
}
