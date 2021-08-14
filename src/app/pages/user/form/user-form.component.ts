import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { UserGroup, UserGroupListResult } from "src/app/_models/user-group.models";
import { User, UserResult } from "src/app/_models/user.models";
import { UserGroupService } from "src/app/_services/user-group.service";
import { UserService } from "src/app/_services/user.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-user-form",
  templateUrl: "user-form.component.html"
})
export class UserFormComponent implements OnInit {
  config = new Config();
  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  statusSelected: number = 0;
  user: User;
  userGroups: UserGroup[];
  userId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private serviceUserGroup: UserGroupService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  private EnabledControls(enabled: boolean) {
    enabled ? this.formMain.get('login').enable() : this.formMain.get('login').disable();
    enabled ? this.formMain.get('password').enable() : this.formMain.get('password').disable();
    enabled ? this.formMain.get('confirm').enable() : this.formMain.get('confirm').disable();
  }

  ngOnInit() {
    this.userId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      user_type: [4],
      user_group_id: [1],
      name: [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required])],
      email: [null],
      login: [null],
      password: [null],
      confirm: [null],
      roles: [null],
      is_active: [0],
    });

    this.serviceUserGroup.getResultUserGroupsLookup().subscribe(
      (result: UserGroupListResult) => {
        this.userGroups = result.data;
      },
      (error: any) => {
        this.userGroups = null;
      }
    );

    this.EnabledControls(true);
    if (this.userId > 0) {
      this.EnabledControls(false);
      this.service.getUserById(this.userId).subscribe((result: UserResult) => {
        this.formMain.patchValue({
          id: result.data.id,
          user_type: result.data.user_type,
          user_group_id: result.data.user_group_id,
          name: result.data.name,
          email: result.data.email,
          login: result.data.login,
          is_active: result.data.is_active,
          roles: result.data.roles
        });
      });
    }
  }

  onNew() {
    this.formMain.reset();
    this.formMain.patchValue({
      id: '',
      user_type: 0,
      user_group_id: '',
      name: '',
      email: '',
      login: '',
      is_active: 0,
      roles: '',
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(["users"]);
  }

  onSubmit() {
    this.submitted = true;
    if (this.formMain.invalid) {
      return;
    }

    this.user = new User();
    this.user.id = this.formMain.get("id").value;
    this.user.user_type = this.formMain.get("user_type").value;
    this.user.user_group_id = this.formMain.get("user_group_id").value;
    this.user.name = this.formMain.get("name").value;
    this.user.email = this.formMain.get("email").value;
    this.user.login = this.formMain.get("login").value;
    this.user.is_active = this.formMain.get("is_active").value;
    this.user.password = this.formMain.get("password").value;
    this.user.roles = this.formMain.get("roles").value === null ? 'users' : this.formMain.get("roles").value;

    if (this.Inserting) {
      this.user.created_by = 1;
      this.service.postUser(this.user).subscribe(
        (resultServer: UserResult) => {
          this.Inserting = false;
          this.modal.showAlertSuccess(resultServer.message);
        },
        error => this.modal.showAlertDanger(error.errors)
      );
    } else {
      this.user.updated_by = 1;
      this.service.putUser(this.user).subscribe(
        (resultServer: UserResult) => {
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
