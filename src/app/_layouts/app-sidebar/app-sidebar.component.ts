import { Component } from '@angular/core';
import { UserDataToken } from 'src/app/_models/user.models';
import { Security } from 'src/app/_utils/security';

@Component({
  selector: '[app-sidebar]',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {
  public userLogged: UserDataToken;
  public isActive = true;
  public isActiveApropriacao = false;

  ngOnInit() {
    this.userLogged = Security.getUser();
  }
}
