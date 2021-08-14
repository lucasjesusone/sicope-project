import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentType, DocumentTypeListResult, DocumentTypeResult } from 'src/app/_models/document-type.models';
import { DocumentTypeService } from 'src/app/_services/document-type.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html'
})
export class DocumentTypeListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  documentTypes: DocumentType[];

  totalRecords: number;
  documentTypeResult: Observable<DocumentTypeResult>;
  error: any;

  constructor(
    private service: DocumentTypeService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {

    var documentTypeFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      documentTypeFilter = 'description=' + this.formSearch.get("valueSearch").value;

    this.service.getResultDocumentTypes(documentTypeFilter).subscribe(
      (result: DocumentTypeListResult) => {
        this.totalRecords = result.data.length;
        this.documentTypes = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.documentTypes = null;
      }
    );
  }

  update(documentType: DocumentType) {
    this.router.navigate(["document-types/form/" + documentType.id.toString()]);
  }

}
