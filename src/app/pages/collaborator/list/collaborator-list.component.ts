import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Collaborator, CollaboratorListResult, CollaboratorResult } from 'src/app/_models/collaborator.models';
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html'
})
export class CollaboratorListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  collaborators: Collaborator[];

  totalRecords: number;
  collaboratorResult: Observable<CollaboratorResult>;
  error: any;

  constructor(
    private service: CollaboratorService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {
    var collaboratorFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      collaboratorFilter = 'name=' + this.formSearch.get("valueSearch").value;

    this.service.getResultCollaborators(collaboratorFilter).subscribe(
      (result: CollaboratorListResult) => {
        this.totalRecords = result.data.length;
        this.collaborators = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.collaborators = null;
      }
    );
  }

  update(collaborator: Collaborator) {
    this.router.navigate(["collaborators/form/" + collaborator.id.toString()]);
  }

}
