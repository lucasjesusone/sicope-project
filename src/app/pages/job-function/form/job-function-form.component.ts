import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { JobFunction, JobFunctionResult } from "src/app/_models/job-function.models";
import { JobFunctionService } from "src/app/_services/job-function.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-job-function-form",
  templateUrl: "job-function-form.component.html"
})
export class JobFunctionFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  statusSelected: number = 0;
  jobFunction: JobFunction;
  jobFunctionId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: JobFunctionService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.jobFunctionId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      name: [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required])],
    });

    this.Inserting = true;
    if (this.jobFunctionId > 0) {
      this.Inserting = false;
      this.service.getJobFunctionById(this.jobFunctionId).subscribe((result: JobFunctionResult) => {
        this.formMain.patchValue({
          id: result.data.id,
          name: result.data.name,
        });
      });
    }
  }

  onNew() {
    this.formMain.patchValue({
      id: '',
      name: '',
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(["job-functions"]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formMain.invalid) {
      return;
    }
    this.jobFunction = new JobFunction();
    this.jobFunction.id = this.formMain.get("id").value;
    this.jobFunction.name = this.formMain.get("name").value;
    if (this.Inserting) {
      this.jobFunction.created_by = 1;
      this.service.postJobFunction(this.jobFunction).subscribe(
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
      this.jobFunction.updated_by = 1;
      this.service.putJobFunction(this.jobFunction).subscribe(
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
