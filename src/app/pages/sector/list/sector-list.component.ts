import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Sector, SectorListResult, SectorResult } from 'src/app/_models/sector.models';
import { SectorService } from 'src/app/_services/sector.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html'
})
export class SectorListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  sectors: Sector[];

  totalRecords: number;
  sectorResult: Observable<SectorResult>;
  error: any;

  constructor(
    private service: SectorService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var sectorFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      sectorFilter = 'description=' + this.formSearch.get("valueSearch").value;

    this.service.getResultSectors(sectorFilter).subscribe(
      (result: SectorListResult) => {
        this.totalRecords = result.data.length;
        this.sectors = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.sectors = null;
      }
    );
  }

  update(sector: Sector) {
    this.router.navigate(["sectors/form/" + sector.id.toString()]);
  }

}
