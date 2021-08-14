import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { AccountPlan, AccountPlanResult } from "src/app/_models/account-plan.models";
import { AccountPlanService } from "src/app/_services/account-plan.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-accountplan-form",
  templateUrl: "account-plan-form.component.html"
})
export class AccountPlanFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  statusSelected: number = 0;
  accountplan: AccountPlan;
  accountplanId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: AccountPlanService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.accountplanId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      code: [null, Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(10),
        Validators.required])],
      description: [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(150),
        Validators.required])],
    });

    this.Inserting = true;
    if (this.accountplanId > 0) {
      this.Inserting = false;
      this.service.getAccountPlanById(this.accountplanId).subscribe((result: AccountPlanResult) => {
        this.formMain.patchValue({
          id: result.data.id,
          code: result.data.code,
          description: result.data.description,
        });
      });
    }
  }

  onNew() {
    this.formMain.patchValue({
      id: '',
      code: '',
      description: '',
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(["account-plans"]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formMain.invalid) {
      return;
    }
    this.accountplan = new AccountPlan();
    this.accountplan.id = this.formMain.get("id").value;
    this.accountplan.code = this.formMain.get("code").value;
    this.accountplan.description = this.formMain.get("description").value;
    if (this.Inserting) {
      this.accountplan.created_by = 1;
      this.service.postAccountPlan(this.accountplan).subscribe(
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
      this.accountplan.updated_by = 1;
      this.service.putAccountPlan(this.accountplan).subscribe(
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
