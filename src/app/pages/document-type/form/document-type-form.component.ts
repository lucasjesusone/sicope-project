import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { DocumentType, DocumentTypeResult } from "src/app/_models/document-type.models";
import { DocumentTypeService } from "src/app/_services/document-type.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-documentType-form",
  templateUrl: "document-type-form.component.html"
})
export class DocumentTypeFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  documentType: DocumentType;
  documentTypeId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: DocumentTypeService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.documentTypeId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      description: [null, Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required])],
    });

    this.Inserting = true;
    if (this.documentTypeId > 0) {
      this.Inserting = false;
      this.service.getDocumentTypeById(this.documentTypeId).subscribe((result: DocumentTypeResult) => {
        this.formMain.patchValue({
          id: result.data.id,
          description: result.data.description,
        });
      });
    }
  }

  onNew() {
    this.formMain.patchValue({
      id: '',
      description: '',
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(["document-types"]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formMain.invalid) {
      return;
    }
    this.documentType = new DocumentType();
    this.documentType.id = this.formMain.get("id").value;
    this.documentType.description = this.formMain.get("description").value;
    if (this.Inserting) {
      this.documentType.created_by = 1;
      this.service.postDocumentType(this.documentType).subscribe(
        (resultServer: any) => {
          if (resultServer.success === true) {
            this.formMain.patchValue({ id: resultServer.data.id });
            this.Inserting = false;
            this.modal.showAlertSuccess(resultServer.message);
          } else {
            this.Inserting = true;
            this.modal.showAlertDanger(resultServer.message);
          }
        },
        error => this.modal.showAlertDanger(error.errors)
      );
    } else {
      this.documentType.updated_by = 1;
      this.service.putDocumentType(this.documentType).subscribe(
        (resultServer: any) => {
          if (resultServer.success === true) {
            this.Inserting = false;
            this.modal.showAlertSuccess(resultServer.message);
          } else {
            this.Inserting = true;
            this.modal.showAlertDanger(resultServer.message);
          }
        },
        error => this.modal.showAlertDanger(error.errors)
      );
    }
  }
}
