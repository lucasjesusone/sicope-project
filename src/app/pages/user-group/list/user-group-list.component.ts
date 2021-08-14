import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserGroup, UserGroupListResult, UserGroupResult } from 'src/app/_models/user-group.models';
import { UserGroupService } from 'src/app/_services/user-group.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-user-group-list',
  templateUrl: './user-group-list.component.html'
})
export class UserGroupListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  userGroups: UserGroup[];

  totalRecords: number;
  userGroupResult: Observable<UserGroupResult>;
  error: any;

  constructor(
    private service: UserGroupService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {
    var userGroupFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      userGroupFilter = 'name=' + this.formSearch.get("valueSearch").value;

    this.service.getResultUserGroups(userGroupFilter).subscribe(
      (result: UserGroupListResult) => {
        this.totalRecords = result.data.length;
        this.userGroups = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.userGroups = null;
      }
    );
  }

  update(userGroup: UserGroup) {
    this.router.navigate(["user-groups/form/" + userGroup.id.toString()]);
  }

}
