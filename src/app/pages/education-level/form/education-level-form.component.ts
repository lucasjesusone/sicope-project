import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { EducationLevel, EducationLevelResult } from "src/app/_models/education-level.models";
import { EducationLevelService } from "src/app/_services/education-level.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-education-level-form",
  templateUrl: "education-level-form.component.html"
})
export class EducationLevelFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  EducationLevel: EducationLevel;
  EducationLevelId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: EducationLevelService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.EducationLevelId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      description: [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required])],
    });

    this.Inserting = true;
    if (this.EducationLevelId > 0) {
      this.Inserting = false;
      this.service.getEducationLevelById(this.EducationLevelId).subscribe((result: EducationLevelResult) => {
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
    this.router.navigate(["education-levels"]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formMain.invalid) {
      return;
    }
    this.EducationLevel = new EducationLevel();
    this.EducationLevel.id = this.formMain.get("id").value;
    this.EducationLevel.description = this.formMain.get("description").value;
    if (this.Inserting) {
      this.EducationLevel.created_by = 1;
      this.service.postEducationLevel(this.EducationLevel).subscribe(
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
      this.EducationLevel.updated_by = 1;
      this.service.putEducationLevel(this.EducationLevel).subscribe(
        (resultServer: any) => {
          if (resultServer.success === true) {
            this.Inserting = false;
            this.modal.showAlertSuccess(resultServer.message);
          } else {
            this.Inserting = true;
            this.modal.showAlertDanger(resultServer.message);
          }
        },
        error => console.error(error.message)
      );
    }
  }
}
