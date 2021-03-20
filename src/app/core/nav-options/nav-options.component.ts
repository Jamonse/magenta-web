import { Component, OnInit } from '@angular/core';
import { Privilege } from 'src/app/auth/model/privilege.model';
import {
  ACCOUNT_MANAGE,
  NONE,
  PROJECT_MANAGE,
  USER_MANAGE,
} from 'src/app/auth/util/permission.util';
import { NavOption } from '../model/nav-option.model';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.scss'],
})
export class NavOptionsComponent implements OnInit {
  navOptions: NavOption[] = [
    {
      icon: 'home',
      name: 'Home',
      navTo: '',
      requiredPermission: NONE,
    },
    {
      icon: 'hours',
      name: 'Hours Management',
      navTo: 'hours',
      requiredPermission: NONE,
    },
    {
      icon: 'projects',
      name: 'Projects',
      navTo: 'projects',
      requiredPermission: PROJECT_MANAGE,
    },
    {
      icon: 'accounts',
      name: 'Accounts',
      navTo: 'accounts',
      requiredPermission: ACCOUNT_MANAGE,
    },
    {
      icon: 'users',
      name: 'Users',
      navTo: 'users',
      requiredPermission: USER_MANAGE,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
