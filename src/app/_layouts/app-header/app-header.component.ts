import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Security } from 'src/app/_utils/security';

@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
})
export class AppHeader implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    Security.clear();
    this.router.navigate(['/login']);
  }

}
