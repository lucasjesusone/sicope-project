import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { ManagerialNature, ManagerialNatureResult } from "src/app/_models/managerial-nature.models";
import { ManagerialNatureService } from "src/app/_services/managerial-nature.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-managerialNature-form",
  templateUrl: "managerial-nature-form.component.html"
})
export class ManagerialNatureFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  managerialNature: ManagerialNature;
  managerialNatureId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: ManagerialNatureService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.managerialNatureId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      description: [null, Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required])],
    });

    this.Inserting = true;
    if (this.managerialNatureId > 0) {
      this.Inserting = false;
      this.service.getManagerialNatureById(this.managerialNatureId).subscribe((result: ManagerialNatureResult) => {
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
    this.router.navigate(["managerial-natures"]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formMain.invalid) {
      return;
    }
    this.managerialNature = new ManagerialNature();
    this.managerialNature.id = this.formMain.get("id").value;
    this.managerialNature.description = this.formMain.get("description").value;
    if (this.Inserting) {
      this.managerialNature.created_by = 1;
      this.service.postManagerialNature(this.managerialNature).subscribe(
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
        error => this.modal.showAlertDanger(error.message)
      );
    } else {
      this.managerialNature.updated_by = 1;
      this.service.putManagerialNature(this.managerialNature).subscribe(
        (resultServer: any) => {
          if (resultServer.success === true) {
            this.Inserting = false;
            this.modal.showAlertSuccess(resultServer.message);
          } else {
            this.Inserting = true;
            this.modal.showAlertDanger(resultServer.message);
          }
        },
        error => this.modal.showAlertDanger(error.message)
      );
    }
  }
}
