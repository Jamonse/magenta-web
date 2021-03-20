import { Component, OnInit } from '@angular/core';
import { AccessPermission } from 'src/app/auth/model/access-permission.model';
import { Privilege } from 'src/app/auth/model/privilege.model';
import { NavOption } from '../model/nav-option.model';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.scss'],
})
export class NavOptionsComponent implements OnInit {
  permission: Privilege = {
    id: 1,
    name: 'account',
    level: 'ADMIN',
  };
  navOptions: NavOption[] = [
    {
      icon: 'home',
      name: 'Home',
      navTo: '',
    },
    {
      icon: 'hours',
      name: 'Hours Management',
      navTo: 'hours',
    },
    {
      icon: 'projects',
      name: 'Projects',
      navTo: 'projects',
    },
    {
      icon: 'accounts',
      name: 'Accounts',
      navTo: 'accounts',
    },
    {
      icon: 'users',
      name: 'Users',
      navTo: 'users',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
