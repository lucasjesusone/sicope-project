import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { UserGroup, UserGroupResult } from "src/app/_models/user-group.models";
import { UserGroupService } from "src/app/_services/user-group.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-user-group-form",
  templateUrl: "user-group-form.component.html"
})
export class UserGroupFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  statusSelected: number = 0;
  userGroup: UserGroup;
  userGroupId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: UserGroupService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userGroupId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      name: [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required])],
    });

    this.Inserting = true;
    if (this.userGroupId > 0) {
      this.Inserting = false;
      this.service.getUserGroupById(this.userGroupId).subscribe((result: UserGroupResult) => {
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
    this.router.navigate(["user-groups"]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formMain.invalid) {
      return;
    }
    this.userGroup = new UserGroup();
    this.userGroup.id = this.formMain.get("id").value;
    this.userGroup.name = this.formMain.get("name").value;
    if (this.Inserting) {
      this.userGroup.created_by = 1;
      this.service.postUserGroup(this.userGroup).subscribe(
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
      this.userGroup.updated_by = 1;
      this.service.putUserGroup(this.userGroup).subscribe(
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
