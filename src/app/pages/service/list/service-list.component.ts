import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Service, ServiceListResult, ServiceResult } from 'src/app/_models/service.models';
import { ServiceService } from 'src/app/_services/service.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html'
})
export class ServiceListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  services: Service[];

  totalRecords: number;
  serviceResult: Observable<ServiceResult>;
  error: any;

  constructor(
    private service: ServiceService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var serviceFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      serviceFilter = 'name=' + this.formSearch.get("valueSearch").value;

    this.service.getResultServices(serviceFilter).subscribe(
      (result: ServiceListResult) => {
        this.totalRecords = result.data.length;
        this.services = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.services = null;
      }
    );
  }

  update(service: Service) {
    this.router.navigate(["services/form/" + service.id.toString()]);
  }

}
