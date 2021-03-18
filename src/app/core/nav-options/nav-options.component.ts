import { Component, OnInit } from '@angular/core';
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
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
