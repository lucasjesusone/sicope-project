import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User, UserListResult, UserResult } from 'src/app/_models/user.models';
import { UserService } from 'src/app/_services/user.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  config = new Config();

  formSearch: FormGroup;
  users: User[];

  totalRecords: number;
  userResult: Observable<UserResult>;
  error: any;

  constructor(
    private service: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      valueSearch: [null]
    });
  }

  onSearch() {
    var userFilter = '';
    if (this.formSearch.get("valueSearch").value != null)
      userFilter = 'name=' + this.formSearch.get("valueSearch").value;
    this.service.getResultUsers(userFilter).subscribe(
      (result: UserListResult) => {
        this.totalRecords = result.data.length;
        this.users = result.data;
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.users = null;
      }
    );
  }

  onNew() {
    this.router.navigate(["users/form"]);
  }

  onUpdate(user: User) {
    this.router.navigate(["users/form/" + user.id.toString()]);
  }

}
