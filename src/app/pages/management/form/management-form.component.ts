import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { Management, ManagementResult } from "src/app/_models/management.models";
import { ManagementService } from "src/app/_services/management.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-management-form",
  templateUrl: "management-form.component.html"
})
export class ManagementFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  management: Management;
  managementId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: ManagementService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.managementId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      description: [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required])],
      initials: [null, Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.required])],
      is_active: [true]
    });

    this.Inserting = true;
    if (this.managementId > 0) {
      this.Inserting = false;
      this.service.getManagementById(this.managementId).subscribe((result: ManagementResult) => {
        this.formMain.patchValue({
          id: result.data.id,
          description: result.data.description,
          initials: result.data.initials,
          is_active: result.data.is_active
        });
      });
    }
  }

  onNew() {
    this.formMain.patchValue({
      id: '',
      description: '',
      initials: '',
      is_active: [true]
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(["managements"]);
  }

  onSubmit() {
    this.submitted = true;
    if (this.formMain.invalid) return;
    this.management = new Management();
    this.management.id = this.formMain.get("id").value;
    this.management.description = this.formMain.get("description").value;
    this.management.initials = this.formMain.get("initials").value;
    this.management.is_active = this.formMain.get("is_active").value;
    if (this.Inserting) {
      this.management.created_by = 1;
      this.service.postManagement(this.management).subscribe(
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
        error => this.modal.showAlertDanger(error)
      );
    } else {
      this.management.updated_by = 1;
      this.service.putManagement(this.management).subscribe(
        (resultServer: any) => {
          if (resultServer.success === true) {
            this.Inserting = false;
            this.modal.showAlertSuccess(resultServer.message);
          } else {
            this.Inserting = true;
            this.modal.showAlertDanger(resultServer.message);
          }
        },
        error => console.error(error)
      );
    }
  }
}
